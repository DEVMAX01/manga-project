
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, X, ChevronLeft, ChevronRight, Home, List, 
  Settings, Maximize, Minimize, Eye, EyeOff, ZoomIn, ZoomOut,
  LayoutPanelTop, AlignJustify, Rows3 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock chapter data
const chapterData = {
  id: "ch-1",
  number: 1,
  title: "To You, 2,000 Years From Now",
  seriesTitle: "Attack on Titan",
  seriesId: "1",
  pages: Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    url: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop&page=${i + 1}`
  })),
  nextChapter: "ch-2",
  prevChapter: null
};

const allChapters = Array.from({ length: 139 }, (_, i) => ({
  id: `ch-${i + 1}`,
  number: i + 1,
  title: i === 0 ? "To You, 2,000 Years From Now" : i === 138 ? "Toward the Tree on That Hill" : `Chapter ${i + 1}`,
}));

const Reader = () => {
  const { seriesId, chapterId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [readingMode, setReadingMode] = useState<'pages' | 'vertical-gaps' | 'vertical-no-gaps'>('pages');
  const [imageScale, setImageScale] = useState(100);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'A':
        case 'a':
          if (currentPage > 1) setCurrentPage(currentPage - 1);
          break;
        case 'ArrowRight':
        case 'D':
        case 'd':
        case ' ':
          if (currentPage < chapterData.pages.length) setCurrentPage(currentPage + 1);
          break;
        case 'f':
        case 'F':
          setIsFullscreen(!isFullscreen);
          break;
        case 'h':
        case 'H':
          setShowUI(!showUI);
          break;
        case 'Escape':
          if (!showUI) setShowUI(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFullscreen, showUI]);

  // Click to show UI when hidden
  useEffect(() => {
    const handleClick = () => {
      if (!showUI) {
        setShowUI(true);
      }
    };

    if (!showUI) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showUI]);

  const nextPage = () => {
    if (currentPage < chapterData.pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const zoomIn = () => {
    setImageScale(prev => Math.min(prev + 10, 200));
  };

  const zoomOut = () => {
    setImageScale(prev => Math.max(prev - 10, 50));
  };

  const renderPages = () => {
    if (readingMode === 'pages') {
      return (
        <div className="relative max-w-4xl mx-auto">
          <img
            src={chapterData.pages[currentPage - 1]?.url}
            alt={`Page ${currentPage}`}
            className="max-w-full max-h-[80vh] object-contain mx-auto"
            style={{ transform: `scale(${imageScale / 100})` }}
          />
          
          {/* Navigation Overlays */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="absolute left-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/20 transition-colors disabled:cursor-not-allowed"
            aria-label="Previous page"
          />
          <button
            onClick={nextPage}
            disabled={currentPage === chapterData.pages.length}
            className="absolute right-0 top-0 w-1/3 h-full bg-transparent hover:bg-black/20 transition-colors disabled:cursor-not-allowed"
            aria-label="Next page"
          />
        </div>
      );
    }

    // Vertical reading modes
    return (
      <div className="max-w-4xl mx-auto space-y-2">
        {chapterData.pages.map((page, index) => (
          <div 
            key={page.id} 
            className={readingMode === 'vertical-gaps' ? 'mb-4' : 'mb-0'}
          >
            <img
              src={page.url}
              alt={`Page ${index + 1}`}
              className="w-full object-contain mx-auto"
              style={{ transform: `scale(${imageScale / 100})` }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-black text-white relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      {showUI && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/series/${seriesId}`}>
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
              
              <div>
                <h1 className="font-bold">{chapterData.seriesTitle}</h1>
                <p className="text-sm text-gray-300">
                  Chapter {chapterData.number}: {chapterData.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Reading Mode Controls */}
              <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1">
                <Button
                  variant={readingMode === 'pages' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setReadingMode('pages')}
                >
                  <LayoutPanelTop className="h-4 w-4" />
                </Button>
                <Button
                  variant={readingMode === 'vertical-gaps' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setReadingMode('vertical-gaps')}
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
                <Button
                  variant={readingMode === 'vertical-no-gaps' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setReadingMode('vertical-no-gaps')}
                >
                  <Rows3 className="h-4 w-4" />
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={zoomOut}
                  disabled={imageScale <= 50}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs px-2">{imageScale}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={zoomIn}
                  disabled={imageScale >= 200}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUI(!showUI)}
              >
                {showUI ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <List className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background text-foreground">
                  <SheetHeader>
                    <SheetTitle>Chapters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                    {allChapters.map((chapter) => (
                      <Card
                        key={chapter.id}
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                          chapter.id === chapterId ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <CardContent className="p-3">
                          <Link
                            to={`/reader/${seriesId}/${chapter.id}`}
                            className="block"
                          >
                            <div className="font-medium">Chapter {chapter.number}</div>
                            <div className="text-sm text-muted-foreground">{chapter.title}</div>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex flex-col items-center min-h-screen ${readingMode === 'pages' ? 'justify-center py-20' : 'pt-20 pb-32'}`}>
        {renderPages()}
      </div>

      {/* Bottom Controls */}
      {showUI && readingMode === 'pages' && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm">
                {currentPage} / {chapterData.pages.length}
              </span>
              
              <div className="flex items-center gap-2">
                {chapterData.prevChapter && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/reader/${seriesId}/${chapterData.prevChapter}`}>
                      Prev Chapter
                    </Link>
                  </Button>
                )}
                {chapterData.nextChapter && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/reader/${seriesId}/${chapterData.nextChapter}`}>
                      Next Chapter
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={nextPage}
              disabled={currentPage === chapterData.pages.length}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Page Thumbnails */}
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin">
            {chapterData.pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => goToPage(index + 1)}
                className={`flex-shrink-0 w-12 h-16 rounded overflow-hidden border-2 transition-colors ${
                  currentPage === index + 1
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-500'
                }`}
              >
                <img
                  src={page.url}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Controls for Vertical Mode */}
      {showUI && readingMode !== 'pages' && (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
          <div className="bg-black/80 rounded-lg p-2 flex flex-col gap-2">
            {chapterData.prevChapter && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/reader/${seriesId}/${chapterData.prevChapter}`}>
                  Prev Chapter
                </Link>
              </Button>
            )}
            {chapterData.nextChapter && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/reader/${seriesId}/${chapterData.nextChapter}`}>
                  Next Chapter
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Info */}
      {showUI && (
        <div className="absolute top-20 right-4 bg-black/60 rounded-lg p-3 text-xs space-y-1">
          <div>← / A: Previous page</div>
          <div>→ / D / Space: Next page</div>
          <div>F: Fullscreen</div>
          <div>H: Hide/Show UI</div>
          <div>ESC: Show UI (when hidden)</div>
          <div>Click anywhere: Show UI (when hidden)</div>
        </div>
      )}
    </div>
  );
};

export default Reader;
