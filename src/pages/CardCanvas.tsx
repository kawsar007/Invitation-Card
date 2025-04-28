import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { PanelLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import CardEditor from './CardEditor';
import Toolbar from './Toolbar';

interface CardCanvasProps {
  content: string;
  onChange: (content: string) => void;
  showGrid: boolean;
  onBackgroundChange: (imageUrl: string) => void;
}

const CardCanvas: React.FC<CardCanvasProps> = ({
  content,
  onChange,
  showGrid,
  onBackgroundChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const editorRef = useRef<any>(null);
  const isMobile = useIsMobile();

  // Default to closed sidebar on mobile
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Standard invitation card size ratio (5x7 inches)
  const cardSize = { width: 700, height: 900 };

  const handleAddText = () => {
    if (editorRef.current) {
      editorRef.current.insertContent('<p>Edit this text</p>');
    }
  };

  const handleAddImage = (imageUrl: string) => {
    if (editorRef.current && imageUrl) {
      editorRef.current.insertContent(`<img src="${imageUrl}" alt="Added image" style="max-width: 100%" />`);
    }
  };

  const handleAddVideo = (videoUrl: string) => {
    if (editorRef.current && videoUrl) {
      let embedCode = '';

      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // Extract YouTube video ID
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(youtubeRegex);
        if (match && match[1]) {
          embedCode = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
      } else if (videoUrl.includes('vimeo.com')) {
        // Extract Vimeo video ID
        const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:[?].*)?$/;
        const match = videoUrl.match(vimeoRegex);
        if (match && match[1]) {
          embedCode = `<iframe src="https://player.vimeo.com/video/${match[1]}" width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
      }

      if (embedCode) {
        editorRef.current.insertContent(`<div class="video-container">${embedCode}</div>`);
      }
    }
  };

  const handleAddLink = (linkData: { url: string; text: string }) => {
    if (editorRef.current && linkData.url && linkData.text) {
      editorRef.current.insertContent(`<a href="${linkData.url}" target="_blank">${linkData.text}</a>`);
    }
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Toolbar */}
      <Toolbar
        onAddText={handleAddText}
        onAddImage={handleAddImage}
        onAddVideo={handleAddVideo}
        onAddLink={handleAddLink}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onBackgroundChange={onBackgroundChange}
      />

      {/* Main canvas area */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="mr-2"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}
          <h2 className="text-lg font-semibold text-gray-700">Card Canvas</h2>
        </div>

        <div className="flex justify-center">
          <CardEditor
            content={content}
            onChange={onChange}
            showGrid={showGrid}
            editorRef={editorRef}
            cardSize={cardSize}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCanvas;
