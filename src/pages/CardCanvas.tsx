import { useIsMobile } from '@/hooks/use-mobile';
import React, { useEffect, useRef, useState } from 'react';
import CardEditor from './CardEditor';

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

  return (
    <div className="flex flex-1 h-full overflow-hidden">

      {/* Main canvas area */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="flex items-center justify-start gap-8 mb-4">

          <h2 className="text-lg font-semibold text-gray-700">Editor</h2>
          <h2 className="text-lg font-semibold text-gray-700">Edit Card</h2>
          <h2 className="text-lg font-semibold text-gray-700">Edit Envelope</h2>
        </div>

        <div className="flex justify-center">
          <CardEditor
            content={content}
            onChange={onChange}
            showGrid={showGrid}
            editorRef={editorRef}
            cardSize={cardSize}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onBackgroundChange={onBackgroundChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCanvas;
