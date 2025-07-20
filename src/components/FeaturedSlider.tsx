import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Play, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const featuredManga = [
  {
    id: "1",
    title: "Solo Leveling",
    description: "An ordinary hunter becomes the most powerful being through a mysterious system",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: "4.9",
    views: "12.5M",
    status: "Ongoing",
    chapters: "Ch. 195",
    genres: ["Action", "Fantasy", "Adventure"],
    latestUpdate: "2 hours ago"
  },
  {
    id: "2", 
    title: "Omniscient Reader's Viewpoint",
    description: "A web novel reader finds himself living in the story he's been following for years",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    rating: "4.8",
    views: "8.9M",
    status: "Ongoing", 
    chapters: "Ch. 168",
    genres: ["Fantasy", "Drama", "Supernatural"],
    latestUpdate: "5 hours ago"
  },
  {
    id: "3",
    title: "The Beginning After The End",
    description: "A king reincarnated in a world of magic must navigate new challenges and destiny",
    coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop",
    rating: "4.7",
    views: "6.2M",
    status: "Ongoing",
    chapters: "Ch. 184",
    genres: ["Fantasy", "Adventure", "Magic"],
    latestUpdate: "1 day ago"
  },
  {
    id: "4",
    title: "Tower of God",
    description: "Climb the mysterious tower and discover what lies at the top in this epic journey",
    coverImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
    rating: "4.6",
    views: "15.3M",
    status: "Ongoing",
    chapters: "Ch. 612",
    genres: ["Adventure", "Fantasy", "Mystery"],
    latestUpdate: "3 days ago"
  },
  {
    id: "5",
    title: "Attack on Titan",
    description: "Humanity's last stand against giant titans in this intense survival story",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    rating: "4.9",
    views: "25.1M",
    status: "Completed",
    chapters: "Ch. 139",
    genres: ["Action", "Drama", "Horror"],
    latestUpdate: "1 week ago"
  }
];

export const FeaturedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredManga.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredManga.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredManga.length) % featuredManga.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative w-full h-96 overflow-hidden rounded-2xl bg-gradient-to-r from-background to-muted/50 mb-8"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Main Slider */}
      <div className="relative h-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={featuredManga[currentSlide].coverImage}
            alt={featuredManga[currentSlide].title}
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-7xl mx-auto px-8">
          {/* Left Side - Main Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  Featured
                </Badge>
                <Badge variant="outline" className={`${featuredManga[currentSlide].status === 'Ongoing' ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500'}`}>
                  {featuredManga[currentSlide].status}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {featuredManga[currentSlide].title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {featuredManga[currentSlide].description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{featuredManga[currentSlide].rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span>{featuredManga[currentSlide].views}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{featuredManga[currentSlide].latestUpdate}</span>
              </div>
              <span className="font-medium">{featuredManga[currentSlide].chapters}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {featuredManga[currentSlide].genres.map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                <Link to={`/reader/${featuredManga[currentSlide].id}/1`}>
                  <Play className="mr-2 h-5 w-5" />
                  Read Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2">
                <Link to={`/series/${featuredManga[currentSlide].id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Cover Image */}
          <div className="hidden lg:block w-80 ml-8">
            <div className="relative h-full flex items-center justify-center">
              <div className="w-56 h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={featuredManga[currentSlide].coverImage}
                  alt={featuredManga[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {featuredManga.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-background/50 hover:bg-background/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center gap-2">
        {featuredManga.map((manga, index) => (
          <button
            key={manga.id}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setHoveredSlide(index)}
            onMouseLeave={() => setHoveredSlide(null)}
            className={`relative w-12 h-16 rounded overflow-hidden transition-all duration-300 ${
              index === currentSlide ? 'ring-2 ring-primary scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="w-full h-full object-cover"
            />
            {hoveredSlide === index && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs font-medium text-center px-1">
                  {manga.title}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};