
import CardCanvas from "@/components/CardCanvas";
import EditorHeader from "@/components/EditorHeader";
import ModifiedBlocksPanel from "@/components/ModifiedBlocks";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

const defaultContent = (bgImage: string) => `
<div style="text-align: center; min-height: 100vh; background-image: url('${bgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
  <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px;">
    <h1 style="color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;">You're Invited</h1>
    <p style="font-size: 18px; margin-bottom: 30px;">Please join us to celebrate</p>
    <h2 style="font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;">Jerry & Jayson's Wedding</h2>
    <p style="font-size: 16px; margin-bottom: 10px;">Saturday, April 19th, 2025 at 8:00 PM</p>
    <p style="font-size: 16px; margin-bottom: 30px;">The Grand Hotel, Gulshan Dhaka</p>
    <p style="font-style: italic; color: #666;">Dinner and dancing to follow</p>
  </div>
</div>
`;

// Define interfaces for tracking content blocks
interface ModifiedBlock {
  id: string;
  type: string;
  originalContent: string;
  newContent: string;
  timestamp: Date;
}
interface CardVersion {
  id: number;
  content: string;
  timestamp: Date;
  modifiedBlocks: ModifiedBlock[];
}

const Index = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('/default-bg.jpg');
  const [content, setContent] = useState<string>(defaultContent(backgroundImage));
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [versions, setVersions] = useState<CardVersion[]>([{
    id: 1,
    content: defaultContent(backgroundImage),
    timestamp: new Date(),
    modifiedBlocks: []
  }]);

  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // New states for block tracking
  const [modifiedBlocks, setModifiedBlocks] = useState<ModifiedBlock[]>([]);
  const [showModifiedBlocks, setShowModifiedBlocks] = useState<boolean>(false);

  console.log("Modified Blocks --->", modifiedBlocks);


  const historyRef = useRef<string[]>([defaultContent(backgroundImage)]);
  const historyIndexRef = useRef<number>(0);
  const { toast: showToast } = useToast();

  // Store original content for comparing changes
  const originalContentRef = useRef<Record<string, string>>({});

  // Extract content blocks from HTML
  const extractContentBlocks = (htmlContent: string) => {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const blocks: Record<string, string> = {};

    // Extract all headings, paragraphs, and other content elements
    const contentElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    contentElements.forEach((element, index) => {
      // Create an ID if the element doesn't have one
      const id = element.id || `block-${element.tagName.toLowerCase()}-${index}`;
      if (!element.id) {
        element.id = id;
      }
      blocks[id] = element.innerHTML.trim();
    });
    return blocks;
  };

  // Initialize original content blocks on mount
  useEffect(() => {
    originalContentRef.current = extractContentBlocks(content);
  }, [content]);

  console.log("History Ref ---> ", historyRef);


  // Add this function to handle background changes
  const handleBackgroundChange = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    const newContent = content.replace(
      /background-image: url\([^)]+\)/,
      `background-image: url('${imageUrl}')`
    );
    // Track background change as a content block modification
    trackContentBlockChange('background', 'image', backgroundImage, imageUrl);
    handleContentChange(newContent);
  };

  // Track content block changes
  const trackContentBlockChange = (id: string, type: string, originalContent: string, newContent: string) => {
    // Don't track if content is the same
    if (originalContent === newContent) return;
    const existingBlockIndex = modifiedBlocks.findIndex(block => block.id === id);

    if (existingBlockIndex >= 0) {
      // Update existing block
      const updatedBlocks = [...modifiedBlocks];
      updatedBlocks[existingBlockIndex] = {
        ...updatedBlocks[existingBlockIndex],
        newContent,
        timestamp: new Date()
      };
      setModifiedBlocks(updatedBlocks);
    } else {
      // Add new block to tracking
      setModifiedBlocks([
        ...modifiedBlocks,
        {
          id,
          type,
          originalContent,
          newContent,
          timestamp: new Date()
        }
      ])
    }
  }

  // Handle content change and update history
  const handleContentChange = (newContent: string) => {
    // Save current content to history if it's different
    if (newContent !== content) {
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      newHistory.push(newContent);
      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;

      // Update undo/redo buttons state
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      setHasUnsavedChanges(true);

      // Track content block changes
      try {
        const newBlocks = extractContentBlocks(newContent);

        // Compare with original blocks to find changes
        Object.entries(newBlocks).forEach(([id, blockContent]) => {
          if (originalContentRef.current[id] && originalContentRef.current[id] !== blockContent) {
            trackContentBlockChange(
              id,
              id.split('_')[1] || 'text', // Extract type from id or default to 'text'
              originalContentRef.current[id],
              blockContent
            );
          }
        })
      } catch (error) {
        console.error("Error tracking content blocks:", error);
      }
    }
    setContent(newContent);
  };

  // Undo action
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setContent(historyRef.current[historyIndexRef.current]);
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(true);
    }
  };

  // Redo action
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setContent(historyRef.current[historyIndexRef.current]);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      setCanUndo(true);
    }
  };

  // Update the reset handler
  const handleReset = () => {
    const defaultBg = '/default-bg.jpg';
    setBackgroundImage(defaultBg);
    setContent(defaultContent(defaultBg));
    historyRef.current = [defaultContent(defaultBg)];
    historyIndexRef.current = 0;
    setCanUndo(false);
    setCanRedo(false);
    setModifiedBlocks([]); // Reset Modified Blocks
    originalContentRef.current = extractContentBlocks(defaultContent(defaultBg)); // Reset original content
    toast.info("Card has been reset to default");
  };

  // Save card version
  const handleSave = () => {
    if (!hasUnsavedChanges) return; // Don't save if no changes
    // Add new version
    const newId = versions.length + 1;
    const newVersion = {
      id: newId,
      content,
      timestamp: new Date(),
      modifiedBlocks: [...modifiedBlocks]
    };

    setVersions([...versions, newVersion]);
    setCurrentVersionIndex(versions.length);
    setHasUnsavedChanges(false); // Reset after saving

    // Update original content reference with current version
    originalContentRef.current = extractContentBlocks(content);

    // Clear modified blocks after saving
    setModifiedBlocks([]);

    toast.success("Card saved successfully!");
  };

  // Toggle grid
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };

  // Toggle modified blocks panel
  const handleToggleModifiedBlocks = () => {
    setShowModifiedBlocks(!showModifiedBlocks);
  };

  // Load a specific version
  const handleVersionChange = (version: string) => {
    const versionIndex = parseInt(version) - 1;
    if (versions[versionIndex]) {
      setContent(versions[versionIndex].content);
      setCurrentVersionIndex(versionIndex);

      // Update history
      historyRef.current = [...historyRef.current, versions[versionIndex].content];
      historyIndexRef.current = historyRef.current.length - 1;
      setCanUndo(true);
      setCanRedo(false);
      setHasUnsavedChanges(false); // Reset unsaved changes

      // Load modified blocks from this version
      setModifiedBlocks(versions[versionIndex].modifiedBlocks);

      toast.info(`Loaded version ${version}`);
    }
  };



  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <EditorHeader
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onSave={handleSave}
        hasUnsavedChanges={hasUnsavedChanges}
        showGrid={showGrid}
        onToggleGrid={handleToggleGrid}
        currentVersion={currentVersionIndex + 1}
        versions={versions.length}
        onVersionChange={handleVersionChange}
        onBackgroundChange={handleBackgroundChange}
        showModifiedBlocks={showModifiedBlocks}
        onToggleModifiedBlocks={handleToggleModifiedBlocks}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 ${showModifiedBlocks ? 'w-3/4' : 'w-full'}`}>
          <CardCanvas
            content={content}
            onChange={handleContentChange}
            showGrid={showGrid}
            onBackgroundChange={handleBackgroundChange}
          />
        </div>
        {showModifiedBlocks && <ModifiedBlocksPanel modifiedBlocks={modifiedBlocks} />}
      </div>
    </div>
  );
};

export default Index;