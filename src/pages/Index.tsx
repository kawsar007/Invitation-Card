import BlockEditor from "@/components/BlockEditor";
import ModifiedBlocksPanel from "@/components/ModifiedBlocks";
import TemplateSelector from "@/components/TemplateSelector";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { useCardEditor } from "@/hooks/useCardEditor";
import CardCanvas from "@/pages/CardCanvas";
import EditorHeader from "@/pages/EditorHeader";
import { CardVersion } from "@/types/types";
import { extractContentBlocks } from "@/utils/contentParser";
import { cardTemplates } from "@/utils/templates";
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

const Index = () => {
  // Initialize editor with the first template
  const {
    selectedTemplate,
    setSelectedTemplate,
    content,
    setContent,
    backgroundImage,
    setBackgroundImage,
    modifiedBlocks,
    setModifiedBlocks,
    trackContentBlockChange,
    originalContentRef
  } = useCardEditor(cardTemplates[0]);



  // Add template selection state
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);

  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [versions, setVersions] = useState<CardVersion[]>([{
    id: 1,
    content: selectedTemplate.content,
    timestamp: new Date(),
    modifiedBlocks: []
  }]);

  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showModifiedBlocks, setShowModifiedBlocks] = useState<boolean>(false);
  const [showBlockEditor, setShowBlockEditor] = useState<boolean>(false);

  const historyRef = useRef<string[]>([selectedTemplate.content]);
  const historyIndexRef = useRef<number>(0);
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = cardTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setBackgroundImage(template.backgroundImage);
      setContent(template.content);

      // Reset history with the new template
      historyRef.current = [template.content];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);

      // Reset modified blocks
      setModifiedBlocks([]);

      // Extract blocks from new template
      const { blocks, extractedBlocks } = extractContentBlocks(template.content);
      originalContentRef.current = blocks;
      setContentBlocks(extractedBlocks);

      // Reset versions
      setVersions([{
        id: 1,
        content: template.content,
        timestamp: new Date(),
        modifiedBlocks: []
      }]);
      setCurrentVersionIndex(0);
      setHasUnsavedChanges(false);

      // Close template selector
      setShowTemplateSelector(false);

      toast.success(`Template "${template.name}" loaded successfully!`);
    }
  };

  // Toggle template selector
  const handleToggleTemplateSelector = () => {
    setShowTemplateSelector(!showTemplateSelector);
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

  // Update the reset handler to use the current template
  const handleReset = () => {
    setBackgroundImage(selectedTemplate.backgroundImage);
    setContent(selectedTemplate.content);
    historyRef.current = [selectedTemplate.content];
    historyIndexRef.current = 0;
    setCanUndo(false);
    setCanRedo(false);
    setModifiedBlocks([]); // Reset Modified Blocks
    const { blocks } = extractContentBlocks(selectedTemplate.content);
    originalContentRef.current = blocks;
    toast.info("Card has been reset to the selected template");
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

  // Block editor functionality
  const {
    contentBlocks,
    setContentBlocks,
    handleDragEnd,
    handleBlockUpdate,
    addContentBlock,
    removeContentBlock
  } = useBlockEditor(content, handleContentChange);

  // Initialize content blocks on mount and when content changes
  useEffect(() => {
    const { blocks, extractedBlocks } = extractContentBlocks(content);
    originalContentRef.current = blocks;
    setContentBlocks(extractedBlocks);
  }, [content, originalContentRef, setContentBlocks]);

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
        onToggleTemplateSelector={handleToggleTemplateSelector} // New prop
        currentTemplate={selectedTemplate.name} // New prop
      />

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          templates={cardTemplates}
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateSelector(false)}
          currentTemplateId={selectedTemplate.id}
        />
      )}

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
          <BlockEditor
            contentBlocks={contentBlocks}
            onDragEnd={handleDragEnd}
            onBlockUpdate={handleBlockUpdate}
            onAddBlock={addContentBlock}
            onRemoveBlock={removeContentBlock}
          />
        )}

        {showModifiedBlocks && !showBlockEditor && <ModifiedBlocksPanel modifiedBlocks={modifiedBlocks} />}
      </div>
    </div>
  );
};

export default Index;