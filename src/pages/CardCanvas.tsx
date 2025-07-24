import PreviewCard from '@/components/generate-preview/PreviewCard';
import { useCraftApi } from '@/context/CraftApiContext';
import { useUser } from '@/context/UserContext';
import useEventDetails from '@/hooks/events/useEventDetails';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart3, Component, SaveIcon, Scan, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardEditor from './CardEditor';
import EventDetailsForm from './EventDetails';
import SendInvitationPage from './sent';
import { TrackInvitationPage } from './track';

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
  const { user, isAuthenticated } = useUser();

  console.log("Mu User:", user);


  // Add this to get query parameters
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'details' | 'preview' | 'send' | 'track'>('editor');
  const editorRef = useRef(null);
  const isMobile = useIsMobile();

  const { event } = useEventDetails(eventId)

  // Use the CraftApi context
  const {
    craftInvitation,
    previewInvitation,
    loading,
    previewLoading,
    error,
    versionNo,
    previewData,
    imageGeneratingWithDelay,
    generateImage,
    imageGenerating,
    craftPreviewAndGenerate
  } = useCraftApi();

  // Handle Next button click
  const handleNext = async () => {
    if (activeTab === 'editor') {
      // Craft the invitation when moving from editor to details
      try {
        const successCraft = await craftInvitation(eventId, content);
        const successGenerateImage = await generateImage(eventId, versionNo);

        if (successCraft && successGenerateImage) {
          setActiveTab('details');
        }
      } catch (error) {
        console.error('Error crafting invitation:', error);
      }
    } else if (activeTab === 'details') {
      // Move to preview tab and trigger preview
      setActiveTab('preview');
      try {
        await previewInvitation(eventId, versionNo);
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    } else if (activeTab === 'preview') {
      // Move to send tab
      setActiveTab('send');
    } else if (activeTab === 'send') {
      // Move to track tab
      setActiveTab('track');
    }
  };

  // Check if Next button should be disabled
  const isNextDisabled = () => {
    if (activeTab === 'track') return true; // Last tab
    if (activeTab === 'editor' && (loading || imageGeneratingWithDelay)) return true;
    if (activeTab === 'details' && (previewLoading || imageGeneratingWithDelay)) return true;
    return false;
  };

  // Get Next button text
  const getNextButtonText = () => {
    if (activeTab === 'editor' && loading) return 'Crafting...';
    if (activeTab === 'editor' && imageGeneratingWithDelay) return 'Generating Image...';
    if (activeTab === 'details' && imageGeneratingWithDelay) return 'Generating Image...';
    if (activeTab === 'details' && previewLoading) return 'Generating Preview...';
    if (activeTab === 'editor') return 'Next';
    if (activeTab === 'details') return 'Generate Preview';
    if (activeTab === 'preview') return 'Send Invitations';
    if (activeTab === 'send') return 'Track Responses';
    return 'Next';
  };

  // Check if we should show the Next button
  const shouldShowNextButton = () => {
    return activeTab !== 'track'; // Hide on the last tab
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
          <div className="p-6 w-full max-w-4xl mx-auto">
            <PreviewCard versionNo={versionNo} setActiveTab={setActiveTab} previewLoading={previewLoading} previewData={previewData} event={event} />
          </div>
        );
      case 'send':
        return (
          <div className="p-6 w-full max-w-7xl mx-auto">
            <SendInvitationPage />
          </div>
        );
      case 'track':
        return (
          <div className="p-6 w-full max-w-7xl mx-auto">
            <TrackInvitationPage eventId={Number(eventId)} userId={user?.id} />;
          </div>
        )
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
              <Scan className="h-4 w-4 mr-2" /> Details
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('preview')}
            >
              <SaveIcon className="h-4 w-4 mr-2" /> Preview
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'send'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('send')}
            >
              <Send className="h-4 w-4 mr-2" /> Send
            </button>
            <button
              className={`flex justify-center items-center py-2 px-1 text-sm font-semibold ${activeTab === 'track'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('track')}
            >
              <BarChart3 className="h-4 w-4 mr-2" /> Track
            </button>
          </div>

          {/* Next Button - Only show if not on the last tab */}
          {shouldShowNextButton() && (
            <button
              className={`flex items-center py-2 px-4 text-sm font-semibold rounded transition-colors ${isNextDisabled()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              {(loading || previewLoading || imageGeneratingWithDelay) && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {getNextButtonText()}
            </button>
          )}
        </div>

        <div className="flex justify-center">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CardCanvas;