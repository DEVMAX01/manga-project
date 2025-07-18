import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

// Import mock covers
import soloLevelingCover from "@/assets/covers/solo-leveling.jpg";
import towerOfGodCover from "@/assets/covers/tower-of-god.jpg";
import beginningAfterEndCover from "@/assets/covers/beginning-after-end.jpg";
import omniscientReaderCover from "@/assets/covers/omniscient-reader.jpg";
import attackOnTitanCover from "@/assets/covers/attack-on-titan.jpg";
import jujutsuKaisenCover from "@/assets/covers/jujutsu-kaisen.jpg";

// Updated mock data with new covers and chapter lock status
const latestSeriesUpdates = [
  {
    id: "1",
    title: "Solo Leveling",
    coverImage: soloLevelingCover,
    chapters: [
      { number: 145, title: "The Final Battle Begins", isLocked: false, timeAgo: "2 hours ago" },
      { number: 144, title: "Shadows of the Past", isLocked: false, timeAgo: "1 day ago" }
    ]
  },
  {
    id: "2", 
    title: "Tower of God",
    coverImage: towerOfGodCover,
    chapters: [
      { number: 623, title: "The Princess's Decision", isLocked: true, timeAgo: "5 hours ago" },
      { number: 622, title: "Baam's New Power", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "3",
    title: "The Beginning After The End", 
    coverImage: beginningAfterEndCover,
    chapters: [
      { number: 184, title: "Ancient Magic Unveiled", isLocked: true, timeAgo: "1 day ago" },
      { number: 183, title: "Return to Dicathen", isLocked: false, timeAgo: "2 weeks ago" }
    ]
  },
  {
    id: "4",
    title: "Omniscient Reader's Viewpoint",
    coverImage: omniscientReaderCover,
    chapters: [
      { number: 215, title: "The Final Scenario", isLocked: false, timeAgo: "3 days ago" },
      { number: 214, title: "Kim Dokja's Choice", isLocked: false, timeAgo: "1 week ago" }
    ]
  },
  {
    id: "5",
    title: "Attack on Titan",
    coverImage: attackOnTitanCover,
    chapters: [
      { number: 139, title: "Toward the Tree on That Hill", isLocked: false, timeAgo: "2 months ago" },
      { number: 138, title: "A Long Dream", isLocked: false, timeAgo: "3 months ago" }
    ]
  },
  {
    id: "6",
    title: "Jujutsu Kaisen",
    coverImage: jujutsuKaisenCover,
    chapters: [
      { number: 243, title: "Inhuman Makyo Shinjuku Showdown", isLocked: true, timeAgo: "6 hours ago" },
      { number: 242, title: "The Decisive Battle", isLocked: false, timeAgo: "1 week ago" }
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
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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