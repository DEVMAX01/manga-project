
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, Plus, Edit, Trash2, Eye, Settings, 
  Book, Users, BarChart, Image, FileText 
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const mangaSeries = [
  {
    id: "1",
    title: "Attack on Titan",
    chapters: 139,
    status: "Completed",
    views: "2.5M",
    rating: 4.8
  },
  {
    id: "2",
    title: "One Piece",
    chapters: 1095,
    status: "Ongoing",
    views: "5.2M",
    rating: 4.9
  }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newSeries, setNewSeries] = useState({
    title: "",
    description: "",
    author: "",
    genres: "",
    status: "Ongoing"
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast.success(`${files.length} ${type} file(s) uploaded successfully!`);
    }
  };

  const handleCreateSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeries.title || !newSeries.description) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Manga series created successfully!");
    setNewSeries({
      title: "",
      description: "",
      author: "",
      genres: "",
      status: "Ongoing"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your manga platform</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Demo Mode
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="manga" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Manga
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Series</CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Chapters</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,921</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4M</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New chapter uploaded: "One Piece Chapter 1095"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New user registered: john_doe123</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Series updated: "Attack on Titan" marked as completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manga" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Manga Series</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Series
              </Button>
            </div>

            <div className="grid gap-4">
              {mangaSeries.map((series) => (
                <Card key={series.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{series.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{series.chapters} chapters</span>
                          <Badge variant="outline">{series.status}</Badge>
                          <span>{series.views} views</span>
                          <span>★ {series.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create New Series */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Series</CardTitle>
                  <CardDescription>Add a new manga series to your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateSeries} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newSeries.title}
                        onChange={(e) => setNewSeries({...newSeries, title: e.target.value})}
                        placeholder="Enter manga title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newSeries.description}
                        onChange={(e) => setNewSeries({...newSeries, description: e.target.value})}
                        placeholder="Enter series description"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newSeries.author}
                        onChange={(e) => setNewSeries({...newSeries, author: e.target.value})}
                        placeholder="Enter author name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="genres">Genres</Label>
                      <Input
                        id="genres"
                        value={newSeries.genres}
                        onChange={(e) => setNewSeries({...newSeries, genres: e.target.value})}
                        placeholder="Enter genres (comma separated)"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Create Series
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Upload Files */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      Upload Cover Image
                    </CardTitle>
                    <CardDescription>Upload cover image for manga series</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="mb-2">Drop your image here or</p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="cover-upload"
                        onChange={(e) => handleFileUpload(e, "cover")}
                      />
                      <Label htmlFor="cover-upload" className="cursor-pointer">
                        <Button variant="outline">Choose File</Button>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Upload Chapter Pages
                    </CardTitle>
                    <CardDescription>Upload images or PDF for chapter pages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="mb-2">Drop your files here or</p>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="hidden"
                        id="chapter-upload"
                        onChange={(e) => handleFileUpload(e, "chapter")}
                      />
                      <Label htmlFor="chapter-upload" className="cursor-pointer">
                        <Button variant="outline">Choose Files</Button>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supports: JPG, PNG, PDF files
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>User management features coming soon!</p>
                  <p className="text-sm">This will include user roles, permissions, and activity monitoring.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Branding</CardTitle>
                  <CardDescription>Customize your site's appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="MangaReader" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-logo">Logo Upload</Label>
                    <Input type="file" id="site-logo" accept="image/*" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <Input type="color" id="primary-color" defaultValue="#0ea5e9" />
                  </div>
                  
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure site-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="items-per-page">Items per Page</Label>
                    <Input type="number" id="items-per-page" defaultValue="20" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                    <Input type="number" id="max-file-size" defaultValue="10" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="allow-registration" defaultChecked />
                    <Label htmlFor="allow-registration">Allow new user registration</Label>
                  </div>
                  
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
