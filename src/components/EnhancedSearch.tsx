import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Clock, TrendingUp, BookOpen, Star } from "lucide-react";

// Mock manga database with main and alternative titles
const mangaDatabase = [
  {
    id: "1",
    title: "Solo Leveling",
    altTitles: ["Only I Level Up", "Na Honjaman Level Up", "俺だけレベルアップな件"],
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=160&fit=crop",
    rating: "4.9",
    status: "Ongoing",
    genres: ["Action", "Fantasy", "Adventure"],
    chapters: "Ch. 195",
    views: "12.5M"
  },
  {
    id: "2",
    title: "Omniscient Reader's Viewpoint", 
    altTitles: ["Omniscient Reader", "ORV", "전지적 독자 시점"],
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=160&fit=crop",
    rating: "4.8",
    status: "Ongoing",
    genres: ["Fantasy", "Drama", "Supernatural"],
    chapters: "Ch. 168",
    views: "8.9M"
  },
  {
    id: "3",
    title: "The Beginning After The End",
    altTitles: ["TBATE", "끝이 아닌 시작", "The Beginning After the End"],
    coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=120&h=160&fit=crop",
    rating: "4.7", 
    status: "Ongoing",
    genres: ["Fantasy", "Adventure", "Magic"],
    chapters: "Ch. 184",
    views: "6.2M"
  },
  {
    id: "4",
    title: "Tower of God",
    altTitles: ["Kami no Tou", "신의 탑", "God of High School"],
    coverImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=120&h=160&fit=crop",
    rating: "4.6",
    status: "Ongoing", 
    genres: ["Adventure", "Fantasy", "Mystery"],
    chapters: "Ch. 612",
    views: "15.3M"
  },
  {
    id: "5",
    title: "Attack on Titan",
    altTitles: ["Shingeki no Kyojin", "進撃の巨人", "AoT"],
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120&h=160&fit=crop",
    rating: "4.9",
    status: "Completed",
    genres: ["Action", "Drama", "Horror"],
    chapters: "Ch. 139", 
    views: "25.1M"
  },
  {
    id: "6",
    title: "Jujutsu Kaisen",
    altTitles: ["呪術廻戦", "JJK", "Sorcery Fight"],
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=160&fit=crop",
    rating: "4.8",
    status: "Ongoing",
    genres: ["Action", "Supernatural", "School"],
    chapters: "Ch. 243",
    views: "18.7M"
  }
];

const recentSearches = ["Solo Leveling", "Tower of God", "Attack on Titan"];
const trendingSearches = ["Omniscient Reader", "TBATE", "Jujutsu Kaisen"];

interface EnhancedSearchProps {
  isExpanded: boolean;
  onExpand: (expanded: boolean) => void;
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export const EnhancedSearch = ({ 
  isExpanded, 
  onExpand, 
  onSearch, 
  value, 
  onChange 
}: EnhancedSearchProps) => {
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState(mangaDatabase);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        if (!value) {
          onExpand(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, onExpand]);

  useEffect(() => {
    if (value.length > 0) {
      const query = value.toLowerCase();
      const filtered = mangaDatabase.filter(manga => {
        const titleMatch = manga.title.toLowerCase().includes(query);
        const altTitleMatch = manga.altTitles.some(alt => alt.toLowerCase().includes(query));
        const genreMatch = manga.genres.some(genre => genre.toLowerCase().includes(query));
        return titleMatch || altTitleMatch || genreMatch;
      });
      setFilteredResults(filtered);
      setShowResults(true);
    } else {
      setFilteredResults(mangaDatabase);
      setShowResults(false);
    }
  }, [value]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setShowResults(false);
    }
  };

  const handleResultClick = (manga: typeof mangaDatabase[0]) => {
    onChange(manga.title);
    setShowResults(false);
    onExpand(false);
  };

  const handleQuickSearch = (query: string) => {
    onChange(query);
    onSearch(query);
    setShowResults(false);
  };

  const clearSearch = () => {
    onChange("");
    setShowResults(false);
    onExpand(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className={`transition-all duration-300 ${isExpanded ? 'w-64 sm:w-80' : 'w-10'}`}>
        {isExpanded ? (
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search manga, genres, or alternative titles..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10 pr-10 w-full"
              autoFocus
              onFocus={() => setShowResults(true)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onExpand(true)}
            className="w-10 h-10"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && isExpanded && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-hidden shadow-2xl border-2">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {value.length === 0 ? (
                // Show recent and trending when no search query
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickSearch(search)}
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Trending Searches
                    </h4>
                    <div className="space-y-1">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickSearch(search)}
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                // Show search results
                <div className="py-2">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-muted-foreground">
                      Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {filteredResults.slice(0, 8).map((manga) => (
                    <Link
                      key={manga.id}
                      to={`/series/${manga.id}`}
                      onClick={() => handleResultClick(manga)}
                      className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={manga.coverImage}
                          alt={manga.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {manga.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{manga.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{manga.chapters}</span>
                          <span>•</span>
                          <Badge variant="outline" className={`text-xs ${
                            manga.status === 'Ongoing' ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500'
                          }`}>
                            {manga.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {manga.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {filteredResults.length > 8 && (
                    <div className="p-3 border-t bg-muted/50">
                      <Button 
                        variant="ghost" 
                        className="w-full text-sm"
                        onClick={() => {
                          onSearch(value);
                          setShowResults(false);
                        }}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        View all {filteredResults.length} results
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                // No results found
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h4 className="text-sm font-medium mb-2">No results found</h4>
                  <p className="text-sm text-muted-foreground">
                    Try searching for a different title or alternative name
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};