import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit3, Save, X, Eye, Upload, Settings, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FrontendAdminToggleProps {
  isAdmin: boolean;
}

export const FrontendAdminToggle = ({ isAdmin }: FrontendAdminToggleProps) => {
  const [adminMode, setAdminMode] = useState(false);
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, string>>({});

  if (!isAdmin) return null;

  const handleEdit = (elementId: string, currentValue: string) => {
    setEditingElement(elementId);
    setTempValues({ ...tempValues, [elementId]: currentValue });
  };

  const handleSave = (elementId: string) => {
    // Simulate saving
    toast({
      title: "Content Updated",
      description: "Changes saved successfully",
    });
    setEditingElement(null);
  };

  const handleCancel = () => {
    setEditingElement(null);
    setTempValues({});
  };

  const EditWrapper = ({ 
    children, 
    elementId, 
    currentValue, 
    type = "text" 
  }: { 
    children: React.ReactNode;
    elementId: string;
    currentValue: string;
    type?: "text" | "textarea";
  }) => {
    if (!adminMode) return <>{children}</>;

    const isEditing = editingElement === elementId;

    return (
      <div className="relative group">
        {isEditing ? (
          <div className="border-2 border-primary rounded-lg p-2 bg-background">
            {type === "textarea" ? (
              <Textarea
                value={tempValues[elementId] || currentValue}
                onChange={(e) => setTempValues({ ...tempValues, [elementId]: e.target.value })}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                value={tempValues[elementId] || currentValue}
                onChange={(e) => setTempValues({ ...tempValues, [elementId]: e.target.value })}
              />
            )}
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => handleSave(elementId)}>
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            {children}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="h-6 w-6 p-0"
                onClick={() => handleEdit(elementId, currentValue)}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
            <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-primary/50 rounded transition-all pointer-events-none" />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Admin Mode</span>
              </div>
              <Button
                size="sm"
                variant={adminMode ? "default" : "outline"}
                onClick={() => setAdminMode(!adminMode)}
                className="relative"
              >
                {adminMode ? (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Editing
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </>
                ) : (
                  <>
                    <Edit3 className="h-3 w-3 mr-1" />
                    Enable
                  </>
                )}
              </Button>
            </div>
            
            {adminMode && (
              <div className="mt-3 pt-3 border-t space-y-2">
                <p className="text-xs text-muted-foreground">
                  Click on highlighted elements to edit content directly
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Upload className="h-3 w-3 mr-1" />
                    Quick Upload
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Demo Editable Elements for Homepage */}
      {adminMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="w-80 shadow-lg border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Edit Mode Active</span>
              </div>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Click elements to edit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Auto-save enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Real-time preview</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin mode indicator */}
      {adminMode && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .admin-editable {
              position: relative;
            }
            .admin-editable:hover {
              outline: 2px dashed hsl(var(--primary));
              outline-offset: 2px;
            }
          `
        }} />
      )}
    </>
  );
};