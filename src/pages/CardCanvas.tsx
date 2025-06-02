import { useIsMobile } from '@/hooks/use-mobile';
import { Component, Edit, Mail } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'editor' | 'card' | 'envelope'>('editor');
  const editorRef = useRef<any>(null);
  const isMobile = useIsMobile();

  console.log("Content from CardCanvas:", content);


  // Default to closed sidebar on mobile
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Standard invitation card size ratio (5x7 inches)
  const cardSize = { width: 700, height: 900 };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'editor':
        return (
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
        );
      case 'card':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Card Content</h3>
            <p className="mb-4">Here you can customize the appearance and content of your card.</p>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Card Options</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Choose card size and orientation</li>
                <li>Select paper type and quality</li>
                <li>Add custom borders and patterns</li>
                <li>Set font styles and typography</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-100 rounded">
              <p className="italic text-gray-600">This is dummy text for the Edit Card tab. In a real implementation, this would contain actual card editing tools and options.</p>
            </div>
          </div>
        );

      case 'envelope':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Envelope Design</h3>
            <p className="mb-4">Customize your envelope to match your card design.</p>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Envelope Options</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Choose envelope size and style</li>
                <li>Add custom liners and patterns</li>
                <li>Include return address printing</li>
                <li>Select envelope color and material</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-100 rounded">
              <p className="italic text-gray-600">This is dummy text for the Edit Envelope tab. In a real implementation, this would contain actual envelope customization tools.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden">

      {/* Main canvas area */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="flex items-center justify-between gap-8 mb-4 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'editor'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('editor')}
            >
              <Component className="h-4 w-4 mr-2" /> Editor
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'card'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('card')}
            >
              <Edit className="h-4 w-4 mr-2" />  Edit Card
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'envelope'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('envelope')}
            >
              <Mail className="h-4 w-4 mr-2" />  Edit Envelope
            </button>
          </div>
          {/* Next Button - Aligned to the right */}
          <button
            className="flex items-center py-2 px-4 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => {
              if (activeTab === 'editor') setActiveTab('card');
              else if (activeTab === 'card') setActiveTab('envelope');
            }}
            disabled={activeTab === 'envelope'}
          >
            Next
          </button>
        </div>

        <div className="flex justify-center">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CardCanvas;
