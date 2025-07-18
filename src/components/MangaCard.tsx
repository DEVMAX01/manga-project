
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";

interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  rating?: number;
  views?: string;
  latestChapter?: string;
  genres?: string[];
  timeAgo?: string;
  size?: 'small' | 'medium' | 'large';
}

export const MangaCard = ({ 
  id, 
  title, 
  coverImage, 
  rating, 
  views, 
  latestChapter, 
  genres = [], 
  timeAgo,
  size = 'medium' 
}: MangaCardProps) => {
  const aspectRatio = "aspect-[3/4]";
  const cardClass = size === 'small' ? "group hover:shadow-lg" : "group hover:shadow-xl";
  const contentClass = size === 'small' ? "p-3" : "p-4";
  
  return (
    <Card className={`${cardClass} transition-all duration-300 cursor-pointer overflow-hidden`}>
      <Link to={`/series/${id}`}>
        <div className={`${aspectRatio} overflow-hidden`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardContent className={`${contentClass} space-y-2`}>
          <h3 className={`font-semibold line-clamp-2 group-hover:text-primary transition-colors ${
            size === 'small' ? 'text-sm' : 'text-base'
          }`}>
            {title}
          </h3>
          
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
          
          {(rating || views) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{rating}</span>
                </div>
              )}
              {views && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{views}</span>
                </div>
              )}
            </div>
          )}
          
          {latestChapter && (
            <p className="text-xs text-primary font-medium">{latestChapter}</p>
          )}
          
          {timeAgo && (
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};
