import { useCraftApi } from '@/context/CraftApiContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Component, SaveIcon, Scan } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardEditor from './CardEditor';
import EventDetailsForm from './EventDetails';

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
  onBackgroundChange,
}) => {
  // Add this to get query parameters
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'details' | 'preview'>('editor');
  const editorRef = useRef<any>(null);
  const isMobile = useIsMobile();

  // Use the CraftApi context
  const {
    craftInvitation,
    previewInvitation,
    loading,
    previewLoading,
    error,
    lastCraftedInvitation,
    previewData,
    generateImage,
    imageGenerating,
    craftPreviewAndGenerate
  } = useCraftApi();

  // Get the latest invitation to get the version number
  const version = lastCraftedInvitation?.version || 0;

  // Handle Next button click
  const handleNext = async () => {
    if (activeTab === 'editor') {
      // Craft the invitation when moving from editor to details
      try {
        const successCraft = await craftInvitation(eventId, content);
        const successGenerateImage = await generateImage(eventId, version);
        // const successPreview = await previewInvitation(eventId, version);

        if (successCraft && successGenerateImage) {
          setActiveTab('details');
        }
        // If craftInvitation fails, stay on editor tab and let the toast show the error
      } catch (error) {
        console.error('Error crafting invitation:', error);
        // Error handling is already done in the context
      }
    } else if (activeTab === 'details') {
      // Move to preview tab and trigger preview
      setActiveTab('preview');

      // Get the latest invitation to get the version number
      // You might need to fetch invitations first or use lastCraftedInvitation
      // For now, let's assume we can get the version from the latest invitation
      try {
        // You might need to adjust this based on how you want to get the version
        // Option 1: If you have the version from the craft response
        // Option 2: Get it from the latest invitation
        // For this example, let's assume you'll pass the version or get it from context

        // This is a simplified approach - you might need to adjust based on your data flow
        await previewInvitation(eventId, version);
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    }
  };

  // Check if Next button should be disabled
  const isNextDisabled = () => {
    if (activeTab === 'preview') return true;
    if (activeTab === 'editor' && loading) return true;
    if (activeTab === 'details' && previewLoading) return true;
    return false;
  };

  // Get Next button text
  const getNextButtonText = () => {
    if (activeTab === 'editor' && loading) return 'Crafting...';
    if (activeTab === 'details' && previewLoading) return 'Generating Preview...';
    if (activeTab === 'editor') return 'Next';
    if (activeTab === 'details') return 'Generate Preview';
    return 'Next';
  };


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
      case 'details':
        return (
          <div className="p-6 w-full max-w-4xl mx-auto">
            <EventDetailsForm eventId={eventId} />
          </div>
        );

      case 'preview':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Preview Your Invitation</h3>
            {previewLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3">Generating preview...</span>
              </div>
            ) : previewData ? (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">{previewData.message}</p>

                <h2>Render Preview Image</h2>
                {/* {previewData.image_url && (
                  <div className="border rounded-lg p-4">
                    <img
                      src={previewData.image_url}
                      alt="Invitation Preview"
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                )} */}
                {/* Add more preview content based on your PreviewData structure */}
              </div>
            ) : (
              <div className="p-4 bg-gray-100 rounded">
                <p className="italic text-gray-600">Preview will be generated when you navigate to this tab.</p>
              </div>
            )}
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
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('details')}
            >
              <Scan className="h-4 w-4 mr-2" />  Details
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('preview')}
            >
              <SaveIcon className="h-4 w-4 mr-2" />  Preview
            </button>
          </div>
          {/* Next Button - Aligned to the right */}
          <button
            className={`flex items-center py-2 px-4 text-sm font-semibold rounded transition-colors ${isNextDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            onClick={handleNext}
            disabled={isNextDisabled()}
          >
            {(loading || previewLoading) && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            )}
            {getNextButtonText()}
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
