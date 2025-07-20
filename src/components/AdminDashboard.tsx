import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, Users, BookOpen, Coins, Settings, Upload, 
  Eye, TrendingUp, Download, RefreshCw, Palette, Type,
  HelpCircle, Monitor, Shield, Zap, Database, Globe
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockStats = {
  totalUsers: 15420,
  totalViews: 2543890,
  totalSeries: 1247,
  totalCoins: 89650,
  dailyActive: 3245,
  monthlyRevenue: 12580
};

const mockFonts = [
  "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Source Sans Pro", 
  "Raleway", "Nunito", "Ubuntu", "Playfair Display", "Merriweather", "Crimson Text"
];

export const AdminDashboard = () => {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [coinRate, setCoinRate] = useState("0.06");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClearCache = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Cache Cleared",
        description: "Application cache has been cleared successfully"
      });
    }, 2000);
  };

  const handleExportData = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} export will be ready for download shortly`
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your manga platform with powerful tools</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="coins">Coins</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Series</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalSeries.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coins Purchased</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalCoins.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleClearCache} disabled={isRefreshing} className="w-full justify-start">
                  {isRefreshing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Clear Cache
                </Button>
                <Button onClick={() => handleExportData("Analytics")} variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Analytics
                </Button>
                <Button onClick={() => handleExportData("User Data")} variant="outline" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Export User Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>New user registration</span>
                    <span className="text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Chapter uploaded: Solo Leveling Ch. 195</span>
                    <span className="text-muted-foreground">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Coin purchase: $24.99</span>
                    <span className="text-muted-foreground">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage manga series, chapters, and uploads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Upload Chapter
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Add New Series
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  Manage Series
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-4">Upload Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Auto-sort chapters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Image compression</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Generate thumbnails</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Max file size (MB)</Label>
                      <Input type="number" defaultValue="10" className="mt-1" />
                    </div>
                    <div>
                      <Label>Allowed formats</Label>
                      <Input defaultValue="jpg, png, webp" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Monitor and manage platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">User Registration</p>
                    <p className="text-sm text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Guest Reading</p>
                    <p className="text-sm text-muted-foreground">Allow non-registered users to read content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coins Tab */}
        <TabsContent value="coins" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Coin Settings
                </CardTitle>
                <CardDescription>Configure coin pricing and payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TooltipProvider>
                  <div className="space-y-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            Coin Rate (USD per coin)
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Label>
                          <Input
                            type="number"
                            step="0.001"
                            value={coinRate}
                            onChange={(e) => setCoinRate(e.target.value)}
                            placeholder="0.06"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How much each coin costs in USD</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>PayPal Integration</Label>
                        <p className="text-sm text-muted-foreground">Enable PayPal payments</p>
                      </div>
                      <Switch checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
                    </div>

                    <div className="space-y-2">
                      <Label>PayPal Email</Label>
                      <Input type="email" placeholder="payments@readscans.com" />
                    </div>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>View detailed coin purchase analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">${mockStats.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">{mockStats.totalCoins.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Coins Sold</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button onClick={() => handleExportData("Coin Analytics")} variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Analytics (CSV)
                  </Button>
                  <Button onClick={() => handleExportData("Purchase History")} variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Export Purchase History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Visual Customization
              </CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TooltipProvider>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            Primary Font
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Label>
                          <Select value={selectedFont} onValueChange={setSelectedFont}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {mockFonts.map((font) => (
                                <SelectItem key={font} value={font}>
                                  <span style={{ fontFamily: font }}>{font}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Primary font used throughout the platform</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="space-y-2">
                      <Label>Reading Font</Label>
                      <Select defaultValue="Merriweather">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockFonts.map((font) => (
                            <SelectItem key={font} value={font}>
                              <span style={{ fontFamily: font }}>{font}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>UI Text Font</Label>
                      <Select defaultValue="Inter">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockFonts.map((font) => (
                            <SelectItem key={font} value={font}>
                              <span style={{ fontFamily: font }}>{font}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Custom CSS</Label>
                      <Textarea 
                        placeholder="/* Add custom CSS here */"
                        className="min-h-[120px] font-mono text-sm"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Monitor className="mr-2 h-4 w-4" />
                      Preview Changes
                    </Button>
                  </div>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Performance
                </CardTitle>
                <CardDescription>Configure security and performance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Smart Caching</Label>
                    <p className="text-sm text-muted-foreground">Automatically cache frequently accessed content</p>
                  </div>
                  <Switch checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Image Optimization</Label>
                    <p className="text-sm text-muted-foreground">Compress and optimize uploaded images</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Bot Protection</Label>
                    <p className="text-sm text-muted-foreground">Enable invisible CAPTCHA protection</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button onClick={handleClearCache} disabled={isRefreshing} className="w-full">
                  {isRefreshing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Clear All Cache
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Storage & Backup
                </CardTitle>
                <CardDescription>Manage storage and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span>2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Auto Backup</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Create Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};