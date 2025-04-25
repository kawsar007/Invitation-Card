/**
 * useCardEditor Hook
 * 
 * This is the primary hook that powers the card editor functionality.
 * It manages the overall card state, including content, template, background,
 * and tracked modifications. This hook serves as the central state manager
 * for the card editor.
 * 
 * Features:
 * - Template state management
 * - Content state management
 * - Background image management
 * - Modified blocks tracking
 * - Content block change tracking
 * 
 * @param initialTemplate - Template to initialize the editor with
 * @returns Object containing card editor state and functions
 */

import { CardTemplate, ModifiedBlock } from "@/types/types";
import { useRef, useState } from 'react';

export const useCardEditor = (initialTemplate: CardTemplate) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(initialTemplate);
  const [backgroundImage, setBackgroundImage] = useState<string>(initialTemplate.backgroundImage);
  const [content, setContent] = useState<string>(initialTemplate.content);
  const [modifiedBlocks, setModifiedBlocks] = useState<ModifiedBlock[]>([]);

  // Store original content for comparing changes
  const originalContentRef = useRef<Record<string, string>>({});

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
      ]);
    }
  };

  return {
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
  };
};