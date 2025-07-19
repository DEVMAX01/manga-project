
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Eye, Heart, Share, Bookmark, Play, LayoutGrid, List, Columns2, Columns3, ArrowUpDown } from "lucide-react";

// Mock data for a series
const seriesData = {
  id: "1",
  title: "Attack on Titan",
  alternativeTitle: "Shingeki no Kyojin",
  description: "Humanity fights for survival against giant humanoid Titans in this epic tale of war, betrayal, and the price of freedom. Set in a world where humanity lives within cities surrounded by enormous walls that protect them from gigantic humanoid Titans, the story follows Eren Yeager, who vows to exterminate all Titans after they bring about the destruction of his hometown and the death of his mother.",
  coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
  bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop",
  rating: 4.8,
  views: "2.5M",
  status: "Completed",
  author: "Hajime Isayama",
  artist: "Hajime Isayama",
  year: "2009",
  genres: ["Action", "Drama", "Fantasy", "Military", "Thriller"],
  chapters: Array.from({ length: 139 }, (_, i) => ({
    id: `ch-${i + 1}`,
    number: i + 1,
    title: i === 0 ? "To You, 2,000 Years From Now" : i === 138 ? "Toward the Tree on That Hill" : `Chapter ${i + 1}`,
    date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 100000) + 10000,
    thumbnail: `/lovable-uploads/beeed207-54fe-4c88-b6d0-5d59c3ae8aa3.png`,
    isPaid: i < 5 // Latest 5 chapters are paid
  })).reverse()
};

const Series = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [chaptersPerRow, setChaptersPerRow] = useState(() => {
    const saved = localStorage.getItem('chaptersPerRow');
    return saved ? parseInt(saved) : 3;
  });
  const [orderAscending, setOrderAscending] = useState(false);

  useEffect(() => {
    localStorage.setItem('chaptersPerRow', chaptersPerRow.toString());
  }, [chaptersPerRow]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Banner Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <img
            src={seriesData.bannerImage}
            alt={seriesData.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={seriesData.coverImage}
                alt={seriesData.title}
                className="w-32 h-48 md:w-48 md:h-72 object-cover rounded-lg shadow-2xl mx-auto md:mx-0"
              />
              
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{seriesData.title}</h1>
                  <p className="text-lg text-muted-foreground">{seriesData.alternativeTitle}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {seriesData.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 text-sm justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{seriesData.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{seriesData.views}</span>
                  </div>
                  <Badge variant="outline">{seriesData.status}</Badge>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button size="lg" asChild>
                    <Link to={`/reader/${seriesData.id}/ch-1`}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Reading
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="chapters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chapters" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Chapters ({seriesData.chapters.length})</h2>
              <div className="flex gap-2">
                <Button 
                  variant={chaptersPerRow === 1 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChaptersPerRow(1)}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chaptersPerRow === 2 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChaptersPerRow(2)}
                >
                  <Columns2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chaptersPerRow === 3 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChaptersPerRow(3)}
                >
                  <Columns3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setOrderAscending(!orderAscending)}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className={`grid gap-2 max-h-[600px] overflow-y-auto ${
              chaptersPerRow === 1 ? 'grid-cols-1' : 
              chaptersPerRow === 2 ? 'grid-cols-2' : 
              'grid-cols-3'
            }`}>
              {(orderAscending ? [...seriesData.chapters].reverse() : seriesData.chapters).map((chapter) => (
                <Card key={chapter.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <Link
                      to={`/reader/${seriesData.id}/${chapter.id}`}
                      className="flex items-center gap-3 group"
                    >
                      {chapter.thumbnail ? (
                        <div className="relative flex-shrink-0">
                          <img
                            src={chapter.thumbnail}
                            alt={`Chapter ${chapter.number}`}
                            className="w-16 h-20 object-cover rounded border"
                          />
                        </div>
                      ) : (
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-20 bg-muted rounded border flex items-center justify-center">
                            <span className="text-muted-foreground text-sm font-bold">{chapter.number}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                          Chapter {chapter.number}: {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{chapter.date}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{chapter.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {chapter.isPaid ? (
                          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded text-xs">
                            <span className="text-primary font-medium">Paid</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded text-xs">
                            <span className="text-green-600 font-medium">Free</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Synopsis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {seriesData.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Author:</span>
                      <span className="text-muted-foreground">{seriesData.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Artist:</span>
                      <span className="text-muted-foreground">{seriesData.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Year:</span>
                      <span className="text-muted-foreground">{seriesData.year}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <Badge variant="outline">{seriesData.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-muted-foreground">{seriesData.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Views:</span>
                      <span className="text-muted-foreground">{seriesData.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">User Reviews</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No reviews yet. Be the first to review this manga!</p>
                  <Button className="mt-4">Write a Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Comments</h3>
                
                {/* Comment Form */}
                <div className="mb-6 p-4 border rounded-lg">
                  <textarea 
                    placeholder="Write your comment..."
                    className="w-full p-3 border rounded-lg resize-none bg-background text-foreground"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button>Post Comment</Button>
                  </div>
                </div>
                
                {/* Sample Comments */}
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">MangaFan123</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm">
                          This is one of the best manga I've ever read! The character development is incredible and the plot twists keep you on edge.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm">👍 12</Button>
                          <Button variant="ghost" size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-bold">
                        A
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">AnimeReader</span>
                          <span className="text-xs text-muted-foreground">5 hours ago</span>
                        </div>
                        <p className="text-sm">
                          The art style is absolutely stunning! Every panel is like a masterpiece. Can't wait for the next chapter.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm">👍 8</Button>
                          <Button variant="ghost" size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-bold">
                        R
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">ReadingNinja</span>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="text-sm">
                          Just started reading this series and I'm already hooked! The world-building is so detailed and immersive.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm">👍 15</Button>
                          <Button variant="ghost" size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline">Load More Comments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Series;
