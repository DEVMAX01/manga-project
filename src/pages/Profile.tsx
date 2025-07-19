import { useState } from "react";
import { Header } from "@/components/Header";
import { MangaCard } from "@/components/MangaCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  Bookmark, 
  ShoppingCart,
  Calendar,
  Star,
  Eye,
  Coins
} from "lucide-react";

// Mock user data
const userData = {
  name: "Alex Reader",
  email: "alex@example.com", 
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  joinDate: "January 2023",
  totalCoins: 2500,
  totalSpent: 850,
  totalRead: 45,
  favoriteGenres: ["Action", "Fantasy", "Romance"]
};

// Mock purchased manga
const purchasedManga = [
  {
    id: "1",
    title: "Attack on Titan",
    cover: "/src/assets/covers/attack-on-titan.jpg",
    status: "Completed",
    genres: ["Action", "Drama"],
    rating: 4.8,
    chapters: 139,
    purchaseDate: "2024-01-15",
    amount: 25
  },
  {
    id: "2",
    title: "Solo Leveling", 
    cover: "/src/assets/covers/solo-leveling.jpg",
    status: "Ongoing",
    genres: ["Action", "Fantasy"],
    rating: 4.9,
    chapters: 179,
    purchaseDate: "2024-01-10",
    amount: 30
  }
];

// Mock liked manga
const likedManga = [
  {
    id: "3",
    title: "Jujutsu Kaisen",
    cover: "/src/assets/covers/jujutsu-kaisen.jpg", 
    status: "Ongoing",
    genres: ["Action", "Supernatural"],
    rating: 4.7,
    chapters: 245,
    likedDate: "2024-01-12"
  },
  {
    id: "4",
    title: "Tower of God",
    cover: "/src/assets/covers/tower-of-god.jpg",
    status: "Ongoing", 
    genres: ["Action", "Adventure"],
    rating: 4.6,
    chapters: 588,
    likedDate: "2024-01-08"
  },
  {
    id: "5",
    title: "The Beginning After The End",
    cover: "/src/assets/covers/beginning-after-end.jpg",
    status: "Ongoing",
    genres: ["Action", "Adventure"], 
    rating: 4.8,
    chapters: 168,
    likedDate: "2024-01-05"
  }
];

// Mock bookmarked manga
const bookmarkedManga = [
  {
    id: "6",
    title: "Omniscient Reader's Viewpoint",
    cover: "/src/assets/covers/omniscient-reader.jpg",
    status: "Ongoing",
    genres: ["Action", "Fantasy"],
    rating: 4.9,
    chapters: 145,
    bookmarkDate: "2024-01-14"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">{userData.email}</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {userData.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{userData.totalCoins} Coins</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">{userData.totalRead} Read</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">${userData.totalSpent} Spent</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Favorite Genres:</p>
                    <div className="flex gap-2">
                      {userData.favoriteGenres.map(genre => (
                        <Badge key={genre} variant="secondary">{genre}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="purchased">Purchased</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Purchased</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{purchasedManga.length}</div>
                    <p className="text-xs text-muted-foreground">
                      ${userData.totalSpent} total spent
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Liked Series</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{likedManga.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Series you love
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bookmarkedManga.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Reading later
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Coins</CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.totalCoins}</div>
                    <p className="text-xs text-muted-foreground">
                      Ready to spend
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Purchased "Solo Leveling" - $30</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Liked "Jujutsu Kaisen"</span>
                    <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Bookmarked "Omniscient Reader's Viewpoint"</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 days ago</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="purchased" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Purchased Manga ({purchasedManga.length})</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {purchasedManga.map((manga) => (
                  <div key={manga.id} className="space-y-2">
                    <MangaCard 
                      id={manga.id}
                      title={manga.title}
                      coverImage={manga.cover}
                      rating={manga.rating}
                      genres={manga.genres}
                      latestChapter={`Chapter ${manga.chapters}`}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      Purchased: {manga.purchaseDate}
                    </div>
                    <div className="text-xs font-medium text-center">
                      ${manga.amount}
                    </div>
                  </div>
                ))}
              </div>
              
              {purchasedManga.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No purchased manga yet.</p>
                  <Button className="mt-4">Browse Store</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="liked" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Liked Manga ({likedManga.length})</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {likedManga.map((manga) => (
                  <div key={manga.id} className="space-y-2">
                    <MangaCard 
                      id={manga.id}
                      title={manga.title}
                      coverImage={manga.cover}
                      rating={manga.rating}
                      genres={manga.genres}
                      latestChapter={`Chapter ${manga.chapters}`}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      Liked: {manga.likedDate}
                    </div>
                  </div>
                ))}
              </div>
              
              {likedManga.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No liked manga yet.</p>
                  <Button className="mt-4">Discover Manga</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bookmarked" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bookmarked Manga ({bookmarkedManga.length})</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {bookmarkedManga.map((manga) => (
                  <div key={manga.id} className="space-y-2">
                    <MangaCard 
                      id={manga.id}
                      title={manga.title}
                      coverImage={manga.cover}
                      rating={manga.rating}
                      genres={manga.genres}
                      latestChapter={`Chapter ${manga.chapters}`}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      Bookmarked: {manga.bookmarkDate}
                    </div>
                  </div>
                ))}
              </div>
              
              {bookmarkedManga.length === 0 && (
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookmarked manga yet.</p>
                  <Button className="mt-4">Start Bookmarking</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;