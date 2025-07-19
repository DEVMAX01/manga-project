
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { LatestUpdatesSection } from "@/components/LatestUpdatesSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Eye, Clock, ChevronLeft, ChevronRight, TrendingUp, Flame } from "lucide-react";

// Mock data for featured carousel (20 manga for slider)
const featuredManga = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  title: [
    "Solo Leveling", "Omniscient Reader's Viewpoint", "Attack on Titan", "Death Note",
    "One Piece", "Naruto", "Jujutsu Kaisen", "Chainsaw Man", "Tower of God", "Demon Slayer",
    "My Hero Academia", "The Beginning After The End", "Boruto", "Black Clover", "Dr. Stone",
    "Tokyo Ghoul", "Bleach", "Hunter x Hunter", "Full Metal Alchemist", "Dragon Ball"
  ][i],
  description: "Dive into the most captivating stories and latest releases",
  coverImage: `https://images.unsplash.com/photo-${
    [1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136, 1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136,
     1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136, 1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136][i]
  }?w=400&h=600&fit=crop`,
  rating: (4.3 + Math.random() * 0.7).toFixed(1),
  views: `${(1 + Math.random() * 4).toFixed(1)}M`,
  status: Math.random() > 0.3 ? "Ongoing" : "Completed",
  chapters: `Ch. ${Math.floor(50 + Math.random() * 200)}`
}));

const featuredSeries = [
  {
    id: "1",
    title: "One Piece",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.9,
    views: "5.2M",
    chapters: "Ch. 1095",
    genres: ["Adventure", "Comedy"],
    status: "Ongoing"
  },
  {
    id: "2",
    title: "The Beginning After The End",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    rating: 4.7,
    views: "2.1M", 
    chapters: "Ch. 184",
    genres: ["Fantasy", "Adventure"],
    status: "Ongoing"
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=400&fit=crop",
    rating: 4.8,
    views: "3.8M",
    chapters: "Ch. 243", 
    genres: ["Action", "Supernatural"],
    status: "Ongoing"
  },
  {
    id: "4",
    title: "Chainsaw Man",
    coverImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=400&fit=crop",
    rating: 4.6,
    views: "2.9M",
    chapters: "Ch. 150",
    genres: ["Action", "Horror"],
    status: "Ongoing"
  },
  {
    id: "5",
    title: "Naruto",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=400&fit=crop",
    rating: 4.5,
    views: "4.1M",
    chapters: "Ch. 700",
    genres: ["Action", "Adventure"],
    status: "Completed"
  },
  {
    id: "6", 
    title: "My Hero Academia",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.4,
    views: "3.5M",
    chapters: "Ch. 405",
    genres: ["Action", "School"],
    status: "Ongoing"
  }
];

const latestUpdates = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  title: [
    "Solo Leveling", "Tower of God", "The Beginning After The End", "Omniscient Reader's Viewpoint",
    "Attack on Titan", "Jujutsu Kaisen", "Demon Slayer", "Chainsaw Man", "One Piece", "Naruto",
    "My Hero Academia", "Death Note", "Tokyo Ghoul", "Bleach", "Hunter x Hunter", "Dragon Ball",
    "Full Metal Alchemist", "Boruto", "Black Clover", "Dr. Stone"
  ][i],
  coverImage: `https://images.unsplash.com/photo-${
    [1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136][i % 5]
  }?w=200&h=280&fit=crop`,
  placementImage: `https://images.unsplash.com/photo-${
    [1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136][i % 5]
  }?w=80&h=50&fit=crop`,
  latestChapter: `Ch. ${Math.floor(50 + Math.random() * 200)}`,
  timeAgo: [
    "2 hours ago", "5 hours ago", "1 day ago", "2 days ago", "3 days ago",
    "4 days ago", "5 days ago", "1 week ago", "1 week ago", "2 weeks ago",
    "2 weeks ago", "3 weeks ago", "3 weeks ago", "1 month ago", "1 month ago",
    "2 months ago", "2 months ago", "3 months ago", "3 months ago", "4 months ago"
  ][i],
  rating: (4.3 + Math.random() * 0.7).toFixed(1),
  status: Math.random() > 0.3 ? "Ongoing" : "Completed"
}));

const trendingNowData = {
  today: Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    title: [
      "Solo Leveling", "Omniscient Reader's Viewpoint", "Attack on Titan", "Death Note",
      "One Piece", "Naruto", "Jujutsu Kaisen", "Chainsaw Man", "Tower of God", "Demon Slayer",
      "My Hero Academia", "The Beginning After The End", "Boruto", "Black Clover", "Dr. Stone",
      "Tokyo Ghoul", "Bleach", "Hunter x Hunter", "Full Metal Alchemist", "Dragon Ball"
    ][i],
    rating: (4.3 + Math.random() * 0.7).toFixed(1),
    views: `${(1 + Math.random() * 4).toFixed(1)}M`,
    coverImage: `https://images.unsplash.com/photo-${
      [1578662996442, 1526374965328, 1470813740244, 1500673922987, 1506744038136][i % 5]
    }?w=120&h=160&fit=crop`
  })),
  thisWeek: Array.from({ length: 20 }, (_, i) => ({
    id: (i + 21).toString(),
    title: [
      "Tokyo Ghoul", "Bleach", "Hunter x Hunter", "Full Metal Alchemist", "Dragon Ball",
      "Solo Leveling", "Omniscient Reader's Viewpoint", "Attack on Titan", "Death Note",
      "One Piece", "Naruto", "Jujutsu Kaisen", "Chainsaw Man", "Tower of God", "Demon Slayer",
      "My Hero Academia", "The Beginning After The End", "Boruto", "Black Clover", "Dr. Stone"
    ][i],
    rating: (4.3 + Math.random() * 0.7).toFixed(1),
    views: `${(1 + Math.random() * 4).toFixed(1)}M`,
    coverImage: `https://images.unsplash.com/photo-${
      [1470813740244, 1500673922987, 1506744038136, 1578662996442, 1526374965328][i % 5]
    }?w=120&h=160&fit=crop`
  })),
  allTime: Array.from({ length: 20 }, (_, i) => ({
    id: (i + 41).toString(),
    title: [
      "One Piece", "Naruto", "Dragon Ball", "Bleach", "Attack on Titan",
      "Death Note", "Full Metal Alchemist", "Hunter x Hunter", "Tokyo Ghoul", "Demon Slayer",
      "Solo Leveling", "Jujutsu Kaisen", "My Hero Academia", "Chainsaw Man", "Tower of God",
      "Omniscient Reader's Viewpoint", "The Beginning After The End", "Boruto", "Black Clover", "Dr. Stone"
    ][i],
    rating: (4.3 + Math.random() * 0.7).toFixed(1),
    views: `${(1 + Math.random() * 4).toFixed(1)}M`,
    coverImage: `https://images.unsplash.com/photo-${
      [1506744038136, 1578662996442, 1526374965328, 1470813740244, 1500673922987][i % 5]
    }?w=120&h=160&fit=crop`
  }))
};

const whatsHot = [
  {
    id: "1",
    title: "Top 10 Manga Series Coming This Season",  
    description: "Discover upcoming series everyone's talking about",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
  },
  {
    id: "2",
    title: "Behind The Scenes: Scandalization Process",
    description: "How manga gets adapted for global audiences", 
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=250&fit=crop"
  },
  {
    id: "3",
    title: "Interview with Popular Mangaka",
    description: "Exclusive interview with top industry creators",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop"
  }
];

const Index = () => {
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [trendingTab, setTrendingTab] = useState<'today' | 'thisWeek' | 'allTime'>('today');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-16">

        <div className="flex container mx-auto px-4 py-8 gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-12">

            {/* Latest Updates */}
            <LatestUpdatesSection />

            {/* What's Hot */}
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">What's Hot</h2>
                <p className="text-muted-foreground">Trending topics and featured content</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {whatsHot.map((item) => (
                  <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Trending Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-orange-500" />
                <h3 className="text-xl font-bold">Trending Now</h3>
              </div>
              
              {/* Trending Tabs */}
              <div className="flex gap-0 mb-4 bg-muted/20 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => setTrendingTab('today')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    trendingTab === 'today' 
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTrendingTab('thisWeek')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    trendingTab === 'thisWeek' 
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTrendingTab('allTime')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    trendingTab === 'allTime' 
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  All Time
                </button>
              </div>

              {/* Trending List - 10 items */}
              <div className="space-y-3">
                {trendingNowData[trendingTab].slice(0, 10).map((manga, index) => (
                  <Link key={manga.id} to={`/series/${manga.id}`} className="block group">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={manga.coverImage}
                          alt={manga.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {manga.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{manga.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{manga.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
