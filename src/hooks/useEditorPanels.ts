/**
 * useEditorPanels Hook
 * 
 * This hook manages the visibility state of various UI panels in the card editor.
 * It provides toggle functions for each panel and ensures that certain panels
 * are mutually exclusive (e.g., modified blocks panel and block editor can't be
 * shown simultaneously).
 * 
 * Features:
 * - Grid overlay toggle for design assistance
 * - Modified blocks panel visibility control
 * - Block editor panel visibility control
 * - Panel state management with mutual exclusivity
 * 
 * @returns Object containing panel visibility states and toggle functions
 */

import { useState } from "react";

interface PanelState {
  showGrid: boolean;
  showModifiedBlocks: boolean;
  showBlockEditor: boolean;
}

interface EditorPanelReturn extends PanelState {
  handleToggleGrid: () => void;
  handleToggleModifiedBlocks: () => void;
  handleToggleBlockEditor: () => void;
}

export const useEditorPanels = (): EditorPanelReturn => {
  const [panelState, setPanelState] = useState<PanelState>({
    showGrid: false,
    showModifiedBlocks: false,
    showBlockEditor: false
  });

  const handleToggleGrid = (): void => {
    setPanelState(prev => ({
      ...prev,
      showGrid: !prev.showGrid
    }));
  };

  const handleToggleModifiedBlocks = (): void => {
    setPanelState(prev => ({
      ...prev,
      showModifiedBlocks: !prev.showModifiedBlocks,
      showBlockEditor: false
    }));
  };

  const handleToggleBlockEditor = (): void => {
    setPanelState(prev => ({
      ...prev,
      showBlockEditor: !prev.showBlockEditor,
      showModifiedBlocks: false
    }))
  }

  return {
    ...panelState,
    handleToggleGrid,
    handleToggleModifiedBlocks,
    handleToggleBlockEditor
  };

}