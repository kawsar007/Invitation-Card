/**
 * Card Editor
 * 
 * This is the main component for the card editor application. It integrates
 * multiple custom hooks to provide a complete card editing experience with
 * features like template selection, version history, block editing, and
 * background customization.
 * 
 * The component is structured to separate concerns:
 * - Card state management via useCardEditor
 * - Template handling via useTemplateManagement
 * - Version control via useVersionHistory
 * - UI panel visibility via useEditorPanels
 * 
 * The editor layout consists of a header with controls, an optional template
 * selector, and the main workspace area which can display the card canvas
 * along with optional panels for block editing or modified block viewing.
 */


import BlockEditor from "@/components/BlockEditor";
import ModifiedBlocksPanel from "@/components/ModifiedBlocks";
import TemplateSelector from "@/components/TemplateSelector";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { useCardEditor } from "@/hooks/useCardEditor";
import { useEditorPanels } from "@/hooks/useEditorPanels";
import { useTemplateManagement } from "@/hooks/useTemplateManagement";
import { useVersionHistory } from "@/hooks/useVersionHistory";
import CardCanvas from "@/pages/CardCanvas";
import EditorHeader from "@/pages/EditorHeader";
import { extractContentBlocks } from "@/utils/contentParser";
import { cardTemplates } from "@/utils/templates";
import { useEffect } from 'react';

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

  console.log("Content:", JSON.stringify(content));


  // Template management 
  const {
    showTemplateSelector,
    setShowTemplateSelector,
    handleTemplateSelect,
    handleToggleTemplateSelector
  } = useTemplateManagement({
    selectedTemplate,
    setSelectedTemplate,
    setContent,
    setBackgroundImage,
    setModifiedBlocks,
    originalContentRef
  });

  // Version control
  const {
    versions,
    currentVersionIndex,
    canUndo,
    canRedo,
    hasUnsavedChanges,
    handleContentChange,
    handleUndo,
    handleRedo,
    handleSave,
    handleReset,
    handleVersionChange
  } = useVersionHistory({
    content,
    setContent,
    selectedTemplate,
    setBackgroundImage,
    modifiedBlocks,
    setModifiedBlocks,
    originalContentRef,
    trackContentBlockChange
  });

  // UI panel states
  const {
    showGrid,
    showModifiedBlocks,
    showBlockEditor,
    handleToggleGrid,
    handleToggleModifiedBlocks,
    handleToggleBlockEditor
  } = useEditorPanels();

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