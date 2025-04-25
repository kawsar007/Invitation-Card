/**
 * useVersionHistory Hook
 * 
 * This hook manages version history for card content, enabling undo/redo functionality
 * and version management. It tracks content changes, maintains a history stack,
 * and provides functions to save versions, navigate between them, and reset content.
 * 
 * Features:
 * - Undo/redo functionality with state tracking
 * - Version saving and restoration
 * - Content history management
 * - Change detection for unsaved work
 * - Content block change tracking
 * 
 * @param content - Current card content
 * @param setContent - Function to update content
 * @param selectedTemplate - Currently selected template
 * @param setBackgroundImage - Function to update background image
 * @param modifiedBlocks - Array of blocks that have been modified
 * @param setModifiedBlocks - Function to update modified blocks
 * @param originalContentRef - Reference to original content blocks
 * @param trackContentBlockChange - Function to track changes to content blocks
 */

import { CardTemplate, CardVersion, ModifiedBlock } from "@/types/types";
import { extractContentBlocks } from "@/utils/contentParser";
import { MutableRefObject, useRef, useState } from 'react';
import { toast } from "sonner";

interface VersionHistoryProps {
  content: string;
  setContent: (content: string) => void;
  selectedTemplate: CardTemplate;
  setBackgroundImage: (url: string) => void;
  modifiedBlocks: ModifiedBlock[];
  setModifiedBlocks: (blocks: ModifiedBlock[]) => void;
  originalContentRef: MutableRefObject<Record<string, string>>;
  trackContentBlockChange: (id: string, type: string, oldContent: string, newContent: string) => void;
}

interface VersionHistoryReturn {
  versions: CardVersion[];
  currentVersionIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  hasUnsavedChanges: boolean;
  handleContentChange: (newContent: string) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleSave: () => void;
  handleReset: () => void;
  handleVersionChange: (version: string) => void;
}

export const useVersionHistory = (
  {
    content,
    setContent,
    selectedTemplate,
    setBackgroundImage,
    modifiedBlocks,
    setModifiedBlocks,
    originalContentRef,
    trackContentBlockChange
  }: VersionHistoryProps

): VersionHistoryReturn => {
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

  const historyRef = useRef<string[]>([selectedTemplate.content]);
  const historyIndexRef = useRef<number>(0);

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

  return {
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
  }
};