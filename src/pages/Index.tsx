
import CardCanvas from "@/components/CardCanvas";
import EditorHeader from "@/components/EditorHeader";
import ModifiedBlocksPanel from "@/components/ModifiedBlocks";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast } from "sonner";

const defaultContent = (bgImage: string) => `
<div style="text-align: center; min-height: 100vh; background-image: url('${bgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
  <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px;">
    <h1 id="block-h1-0" style="color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;">You're Invited</h1>
    <p id="block-p-0" style="font-size: 18px; margin-bottom: 30px;">Please join us to celebrate</p>
    <h2 id="block-h2-0" style="font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;">Jerry & Jayson's Wedding</h2>
    <p id="block-p-1" style="font-size: 16px; margin-bottom: 10px;">Saturday, April 19th, 2025 at 8:00 PM</p>
    <p id="block-p-2" style="font-size: 16px; margin-bottom: 30px;">The Grand Hotel, Gulshan Dhaka</p>
    <p id="block-p-3" style="font-style: italic; color: #666;">Dinner and dancing to follow</p>
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

interface ContentBlock {
  id: string;
  type: string;
  content: string;
  html: string; // Complete HTML including styles
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

  // states for block tracking
  const [modifiedBlocks, setModifiedBlocks] = useState<ModifiedBlock[]>([]);
  const [showModifiedBlocks, setShowModifiedBlocks] = useState<boolean>(false);

  // state for content blocks (for drag and drop)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [showBlockEditor, setShowBlockEditor] = useState<boolean>(false);

  const historyRef = useRef<string[]>([defaultContent(backgroundImage)]);
  const historyIndexRef = useRef<number>(0);
  const { toast: showToast } = useToast();

  // Store original content for comparing changes
  const originalContentRef = useRef<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Extract content blocks from HTML
  const extractContentBlocks = (htmlContent: string) => {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const blocks: Record<string, string> = {};
    const extractedBlocks: ContentBlock[] = [];

    // Get the container div
    const container = doc.querySelector('div > div');
    if (!container) return { blocks, extractedBlocks };

    // Extract all direct children (content blocks)
    Array.from(container.children).forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();

      // Create an ID if the element doesn't have one
      const id = element.id || `block-${tagName}-${index}`;
      if (!element.id) {
        element.id = id;
      }

      blocks[id] = element.innerHTML.trim();

      extractedBlocks.push({
        id,
        type: tagName,
        content: element.innerHTML.trim(),
        html: element.outerHTML
      });
    });
    return { blocks, extractedBlocks };
  };

  // Initialize content blocks on mount and when content changes
  useEffect(() => {
    const { blocks, extractedBlocks } = extractContentBlocks(content);
    originalContentRef.current = blocks;
    setContentBlocks(extractedBlocks);
  }, [content]);

  // Handle drag end event
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(contentBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContentBlocks(items);

    // Rebuild HTML content from reordered blocks
    updateHtmlFromBlocks(items);
  }

  // Update HTML content from rearranged blocks
  const updateHtmlFromBlocks = (blocks: ContentBlock[]) => {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Get the container div
    const container = doc.querySelector('div > div');
    if (!container) return;

    // Clear the container
    container.innerHTML = '';

    // Add blocks in new order
    blocks.forEach(block => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = block.html;
      const element = tempDiv.firstChild;
      if (element) {
        container.appendChild(element);
      }
    });

    // Update content state
    const newContent = doc.documentElement.outerHTML;
    handleContentChange(newContent);
  }

  // Handle block content update
  const handleBlockUpdate = (id: string, newHtml: string) => {
    const updatedBlocks = contentBlocks.map(block => {
      if (block.id === id) {
        // Parse the new HTML to extract content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newHtml;
        const element = tempDiv.firstChild as HTMLElement;

        return {
          ...block,
          content: element.innerHTML || block.content,
          html: newHtml
        };
      }
      return block;
    });
    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  }

  // Add a new content block
  const addContentBlock = (type: string) => {
    const id = `block-${type}-${contentBlocks.length}`;
    const defaultContent = type === 'h1' ? 'New Heading' :
      type === 'h2' ? 'New Subheading' : 'New paragraph text';

    const style = type === 'h1' ? "color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;" :
      type === 'h2' ? "font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;" :
        "font-size: 16px; margin-bottom: 10px;";

    const newBlock = {
      id,
      type,
      content: defaultContent,
      html: `<${type} id="${id}" style="${style}">${defaultContent}</${type}>`
    };

    const updatedBlocks = [...contentBlocks, newBlock];
    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  };

  // Remove a content block
  const removeContentBlock = (id: string) => {
    const updatedBlocks = contentBlocks.filter(block => block.id !== id);
    setContentBlocks(updatedBlocks);
    updateHtmlFromBlocks(updatedBlocks);
  };

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
        const { blocks } = extractContentBlocks(newContent);

        // Compare with original blocks to find changes
        Object.entries(blocks).forEach(([id, blockContent]) => {
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
    const { blocks } = extractContentBlocks(defaultContent(defaultBg));
    originalContentRef.current = blocks;
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
    const { blocks } = extractContentBlocks(content);
    originalContentRef.current = blocks;
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
    setShowBlockEditor(false);
  };

  // Toggle block editor
  const handleToggleBlockEditor = () => {
    setShowBlockEditor(!showBlockEditor);
    setShowModifiedBlocks(false);
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
        showBlockEditor={showBlockEditor}
        onToggleBlockEditor={handleToggleBlockEditor}
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

        {/* Block Editor Panel */}
        {showBlockEditor && (
          <div className="w-1/4 bg-white border-l border-gray-200 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Content Blocks</h3>
              <div className="space-x-2">
                <button
                  onClick={() => addContentBlock('h1')}
                  className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
                >
                  Add H1
                </button>
                <button
                  onClick={() => addContentBlock('p')}
                  className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100"
                >
                  Add P
                </button>
              </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="content-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {contentBlocks.map((block, index) => (
                      <Draggable key={block.id} draggableId={block.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="p-3 bg-white rounded-md border border-gray-200 shadow-sm"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move p-1 mr-2 bg-gray-100 rounded"
                                >
                                  ⋮⋮
                                </div>
                                <span className="font-medium text-sm text-gray-700 capitalize bg-gray-100 px-2 py-0.5 rounded">
                                  {block.type}
                                </span>
                              </div>
                              <button
                                onClick={() => removeContentBlock(block.id)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="mt-2">
                              <textarea
                                value={block.content}
                                onChange={(e) => {
                                  const newHtml = block.html.replace(
                                    />.*?</,
                                    `>${e.target.value}<`
                                  );
                                  handleBlockUpdate(block.id, newHtml);
                                }}
                                className="w-full text-sm p-2 border border-gray-200 rounded resize-y"
                                rows={2}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {showModifiedBlocks && !showBlockEditor && <ModifiedBlocksPanel modifiedBlocks={modifiedBlocks} />}
      </div>
    </div>
  );
};

export default Index;