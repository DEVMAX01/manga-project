import { useState } from "react";
import { Header } from "@/components/Header";
import { MangaCard } from "@/components/MangaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, LayoutGrid, List } from "lucide-react";

// Mock data for all manga
const allMangaSeries = [
  {
    id: "1",
    title: "Attack on Titan",
    cover: "/src/assets/covers/attack-on-titan.jpg",
    status: "Completed",
    genres: ["Action", "Drama", "Fantasy"],
    rating: 4.8,
    chapters: 139,
    views: "2.5M",
    updated: "2023-04-09"
  },
  {
    id: "2", 
    title: "Solo Leveling",
    cover: "/src/assets/covers/solo-leveling.jpg",
    status: "Ongoing",
    genres: ["Action", "Fantasy", "Supernatural"],
    rating: 4.9,
    chapters: 179,
    views: "5.2M",
    updated: "2024-01-15"
  },
  {
    id: "3",
    title: "Jujutsu Kaisen", 
    cover: "/src/assets/covers/jujutsu-kaisen.jpg",
    status: "Ongoing",
    genres: ["Action", "Supernatural", "School"],
    rating: 4.7,
    chapters: 245,
    views: "3.8M",
    updated: "2024-01-12"
  },
  {
    id: "4",
    title: "Tower of God",
    cover: "/src/assets/covers/tower-of-god.jpg", 
    status: "Ongoing",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 4.6,
    chapters: 588,
    views: "4.1M",
    updated: "2024-01-10"
  },
  {
    id: "5",
    title: "The Beginning After The End",
    cover: "/src/assets/covers/beginning-after-end.jpg",
    status: "Ongoing", 
    genres: ["Action", "Adventure", "Reincarnation"],
    rating: 4.8,
    chapters: 168,
    views: "2.9M",
    updated: "2024-01-08"
  },
  {
    id: "6",
    title: "Omniscient Reader's Viewpoint",
    cover: "/src/assets/covers/omniscient-reader.jpg",
    status: "Ongoing",
    genres: ["Action", "Fantasy", "Webtoon"], 
    rating: 4.9,
    chapters: 145,
    views: "3.3M",
    updated: "2024-01-05"
  }
];

const AllManga = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique genres
  const allGenres = Array.from(
    new Set(allMangaSeries.flatMap(series => series.genres))
  ).sort();

  // Filter and sort manga
  const filteredManga = allMangaSeries
    .filter(series => {
      const matchesSearch = series.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "all" || series.genres.includes(selectedGenre);
      const matchesStatus = selectedStatus === "all" || series.status.toLowerCase() === selectedStatus;
      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        case "views":
          return parseFloat(b.views) - parseFloat(a.views);
        case "chapters":
          return b.chapters - a.chapters;
        default: // updated
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">All Manga</h1>
              <p className="text-muted-foreground">
                Browse our complete collection of {allMangaSeries.length} manga series
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm" 
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="hiatus">Hiatus</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Latest Updated</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="views">Most Popular</SelectItem>
                <SelectItem value="chapters">Chapter Count</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredManga.length} of {allMangaSeries.length} results
            </p>
          </div>

          {/* Manga Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredManga.map((series) => (
                <MangaCard 
                  key={series.id}
                  id={series.id}
                  title={series.title}
                  coverImage={series.cover}
                  rating={series.rating}
                  views={series.views}
                  genres={series.genres}
                  latestChapter={`Chapter ${series.chapters}`}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredManga.map((series) => (
                <div key={series.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                  <img
                    src={series.cover}
                    alt={series.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{series.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{series.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {series.chapters} chapters
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {series.views} views
                      </span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {series.genres.slice(0, 3).map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{series.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {series.updated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredManga.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No manga found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("all");
                  setSelectedStatus("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllManga;