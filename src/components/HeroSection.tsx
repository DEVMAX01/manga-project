
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Zap, Star, Eye } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Total Manga", value: "50K+" },
  { icon: Users, label: "Active Readers", value: "1M+" },
  { icon: Zap, label: "Daily Updates", value: "500+" }
];

const featuredManga = {
  id: "1",
  title: "Attack on Titan",
  description: "Humanity fights for survival against giant humanoid Titans in this epic tale of war, betrayal, and the price of freedom.",
  coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
  rating: 4.8,
  views: "2.5M",
  status: "Completed",
  genres: ["Action", "Drama", "Fantasy"]
};

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Read Manga
                <span className="block text-primary">Online Free</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover thousands of manga titles from the latest releases to timeless classics. 
                Read anywhere, anytime with our premium reading experience.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/browse">Start Reading</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Browse Popular
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Manga Card */}
          <div className="relative">
            <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-2">
              <div className="relative">
                <img
                  src={featuredManga.coverImage}
                  alt={featuredManga.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{featuredManga.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredManga.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {featuredManga.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{featuredManga.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{featuredManga.views}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{featuredManga.status}</Badge>
                </div>
                
                <Button className="w-full" asChild>
                  <Link to={`/series/${featuredManga.id}`}>Read Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
