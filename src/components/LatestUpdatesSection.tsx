import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Star } from "lucide-react";

// Import mock covers
import soloLevelingCover from "@/assets/covers/solo-leveling.jpg";
import towerOfGodCover from "@/assets/covers/tower-of-god.jpg";
import beginningAfterEndCover from "@/assets/covers/beginning-after-end.jpg";
import omniscientReaderCover from "@/assets/covers/omniscient-reader.jpg";
import attackOnTitanCover from "@/assets/covers/attack-on-titan.jpg";
import jujutsuKaisenCover from "@/assets/covers/jujutsu-kaisen.jpg";

// Updated mock data with new covers, chapter lock status, and ratings
const latestSeriesUpdates = [
  {
    id: "1",
    title: "Solo Leveling",
    coverImage: soloLevelingCover,
    rating: 9.8,
    chapters: [
      { number: 145, title: "The Final Battle Begins", isLocked: false, timeAgo: "2 hours ago" },
      { number: 144, title: "Shadows of the Past", isLocked: false, timeAgo: "1 day ago" }
    ]
  },
  {
    id: "2", 
    title: "Tower of God",
    coverImage: towerOfGodCover,
    rating: 9.5,
    chapters: [
      { number: 623, title: "The Princess's Decision", isLocked: true, timeAgo: "5 hours ago" },
      { number: 622, title: "Baam's New Power", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "3",
    title: "The Beginning After The End", 
    coverImage: beginningAfterEndCover,
    rating: 9.3,
    chapters: [
      { number: 184, title: "Ancient Magic Unveiled", isLocked: true, timeAgo: "1 day ago" },
      { number: 183, title: "Return to Dicathen", isLocked: false, timeAgo: "2 weeks ago" }
    ]
  },
  {
    id: "4",
    title: "Omniscient Reader's Viewpoint",
    coverImage: omniscientReaderCover,
    rating: 9.7,
    chapters: [
      { number: 215, title: "The Final Scenario", isLocked: false, timeAgo: "3 days ago" },
      { number: 214, title: "Kim Dokja's Choice", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "5",
    title: "Attack on Titan",
    coverImage: attackOnTitanCover,
    rating: 9.0,
    chapters: [
      { number: 139, title: "Toward the Tree on That Hill", isLocked: false, timeAgo: "2 months ago" },
      { number: 138, title: "A Long Dream", isLocked: false, timeAgo: "3 months ago" }
    ]
  },
  {
    id: "6",
    title: "Jujutsu Kaisen",
    coverImage: jujutsuKaisenCover,
    rating: 8.9,
    chapters: [
      { number: 243, title: "Inhuman Makyo Shinjuku Showdown", isLocked: true, timeAgo: "6 hours ago" },
      { number: 242, title: "The Decisive Battle", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "7",
    title: "Demon Slayer",
    coverImage: soloLevelingCover,
    rating: 8.8,
    chapters: [
      { number: 205, title: "Final Form", isLocked: false, timeAgo: "4 hours ago" },
      { number: 204, title: "Tanjiro's Resolve", isLocked: false, timeAgo: "2 days ago" }
    ]
  },
  {
    id: "8",
    title: "One Piece",
    coverImage: towerOfGodCover,
    rating: 9.6,
    chapters: [
      { number: 1100, title: "Gear 5 Unleashed", isLocked: true, timeAgo: "1 hour ago" },
      { number: 1099, title: "Luffy's Awakening", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "9",
    title: "Chainsaw Man",
    coverImage: beginningAfterEndCover,
    rating: 8.7,
    chapters: [
      { number: 150, title: "Devil's Dance", isLocked: true, timeAgo: "3 hours ago" },
      { number: 149, title: "Denji's Choice", isLocked: false, timeAgo: "5 days ago" }
    ]
  },
  {
    id: "10",
    title: "My Hero Academia",
    coverImage: omniscientReaderCover,
    rating: 8.5,
    chapters: [
      { number: 410, title: "Final War", isLocked: false, timeAgo: "2 days ago" },
      { number: 409, title: "All For One", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "11",
    title: "Hunter x Hunter",
    coverImage: attackOnTitanCover,
    rating: 9.4,
    chapters: [
      { number: 400, title: "Gon's Return", isLocked: true, timeAgo: "6 months ago" },
      { number: 399, title: "Chimera Queen", isLocked: false, timeAgo: "8 months ago" }
    ]
  },
  {
    id: "12",
    title: "Bleach",
    coverImage: jujutsuKaisenCover,
    rating: 8.6,
    chapters: [
      { number: 686, title: "Soul King's Power", isLocked: false, timeAgo: "1 week ago" },
      { number: 685, title: "Ichigo's Bankai", isLocked: false, timeAgo: "2 weeks ago" }
    ]
  },
  {
    id: "13",
    title: "Naruto: Next Generation",
    coverImage: soloLevelingCover,
    rating: 7.8,
    chapters: [
      { number: 85, title: "Boruto's Karma", isLocked: true, timeAgo: "3 days ago" },
      { number: 84, title: "New Threat", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "14",
    title: "Black Clover",
    coverImage: towerOfGodCover,
    rating: 8.3,
    chapters: [
      { number: 375, title: "Asta's Devil Union", isLocked: false, timeAgo: "5 days ago" },
      { number: 374, title: "Magic Emperor", isLocked: false, timeAgo: "2 weeks ago" }
    ]
  },
  {
    id: "15",
    title: "Dragon Ball Super",
    coverImage: beginningAfterEndCover,
    rating: 8.4,
    chapters: [
      { number: 95, title: "Ultra Instinct Mastered", isLocked: true, timeAgo: "1 day ago" },
      { number: 94, title: "Granolah's Wish", isLocked: false, timeAgo: "1 month ago" }
    ]
  },
  {
    id: "16",
    title: "Tokyo Revengers",
    coverImage: omniscientReaderCover,
    rating: 8.1,
    chapters: [
      { number: 280, title: "Final Timeline", isLocked: false, timeAgo: "2 weeks ago" },
      { number: 279, title: "Takemichi's Resolve", isLocked: false, timeAgo: "3 weeks ago" }
    ]
  },
  {
    id: "17",
    title: "Wind Breaker",
    coverImage: attackOnTitanCover,
    rating: 7.9,
    chapters: [
      { number: 150, title: "Top of Furin", isLocked: true, timeAgo: "4 days ago" },
      { number: 149, title: "Sakura's Growth", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "18",
    title: "Kaiju No. 8",
    coverImage: jujutsuKaisenCover,
    rating: 8.2,
    chapters: [
      { number: 115, title: "Kafka's Transformation", isLocked: false, timeAgo: "6 days ago" },
      { number: 114, title: "Defense Force", isLocked: false, timeAgo: "2 weeks ago" }
    ]
  },
  {
    id: "19",
    title: "Hell's Paradise",
    coverImage: soloLevelingCover,
    rating: 8.0,
    chapters: [
      { number: 127, title: "Final Escape", isLocked: true, timeAgo: "1 week ago" },
      { number: 126, title: "Gabimaru's Power", isLocked: false, timeAgo: "3 weeks ago" }
    ]
  },
  {
    id: "20",
    title: "Spy x Family",
    coverImage: towerOfGodCover,
    rating: 8.7,
    chapters: [
      { number: 95, title: "Operation Strix", isLocked: false, timeAgo: "3 days ago" },
      { number: 94, title: "Anya's Secret", isLocked: false, timeAgo: "1 week ago" }
    ]
  }
];

export const LatestUpdatesSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Latest Updates</h2>
          <p className="text-muted-foreground">Fresh chapters and new releases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="ghost" size="sm">
            Manga
          </Button>
          <Button variant="ghost" size="sm">
            Manhwa
          </Button>
          <Button variant="ghost" size="sm">
            Manhua
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {latestSeriesUpdates.map((series) => (
          <Card key={series.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
            <Link to={`/series/${series.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={series.coverImage}
                  alt={series.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-medium">{series.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {series.title}
                </h3>
                
                {/* Latest 2 Chapters */}
                <div className="space-y-1">
                  {series.chapters.map((chapter, index) => (
                    <div key={chapter.number} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 flex-1 min-w-0">
                        {chapter.isLocked ? (
                          <Lock className="h-3 w-3 text-orange-500 flex-shrink-0" />
                        ) : (
                          <Unlock className="h-3 w-3 text-green-500 flex-shrink-0" />
                        )}
                        <span className="truncate">
                          Ch. {chapter.number}
                          {index === 0 && <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">NEW</Badge>}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs ml-1">
                        {chapter.timeAgo}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" asChild>
          <Link to="/latest">View All Updates</Link>
        </Button>
      </div>
    </section>
  );
};