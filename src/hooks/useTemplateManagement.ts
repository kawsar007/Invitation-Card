/**
 * useTemplateManagement Hook
 * 
 * This hook manages template selection and loading in the card editor.
 * It handles the template selector modal visibility, template switching,
 * and resetting the editor state when a new template is selected.
 * 
 * Features:
 * - Template selector modal visibility control
 * - Template selection and loading
 * - Content reset when switching templates
 * - History reset when switching templates
 * - Notification feedback on template changes
 * 
 * @param selectedTemplate - Currently selected template
 * @param setSelectedTemplate - Function to update selected template
 * @param setContent - Function to update content
 * @param setBackgroundImage - Function to update background image
 * @param setModifiedBlocks - Function to update modified blocks
 * @param originalContentRef - Reference to original content blocks
 * @returns Object containing template selector state and functions
 */


import { CardTemplate, ModifiedBlock } from "@/types/types";
import { extractContentBlocks } from "@/utils/contentParser";
import { cardTemplates } from "@/utils/templates";
import { MutableRefObject, useRef, useState } from 'react';
import { toast } from "sonner";

interface TemplateManagementProps {
  selectedTemplate: CardTemplate;
  setSelectedTemplate: (template: CardTemplate) => void;
  setContent: (content: string) => void;
  setBackgroundImage: (url: string) => void;
  setModifiedBlocks: (blocks: ModifiedBlock[]) => void;
  originalContentRef: MutableRefObject<Record<string, string>>;
}

interface TemplateManagementReturn {
  showTemplateSelector: boolean;
  setShowTemplateSelector: (show: boolean) => void;
  handleTemplateSelect: (templateId: string) => void;
  handleToggleTemplateSelector: () => void;
}

export const useTemplateManagement = ({
  selectedTemplate,
  setSelectedTemplate,
  setContent,
  setBackgroundImage,
  setModifiedBlocks,
  originalContentRef
}: TemplateManagementProps): TemplateManagementReturn => {
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);

  // We need to use refs here that will be accessible inside handleTemplateSelect
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(0);

  const handleTemplateSelect = (templateId: string): void => {
    const template = cardTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setBackgroundImage(template.backgroundImage);
      setContent(template.content);

      // Reset history with the new template
      historyRef.current = [template.content];
      historyIndexRef.current = 0;

      // Reset modified blocks
      setModifiedBlocks([]);

      // Extract blocks from new template
      const { blocks } = extractContentBlocks(template.content);
      originalContentRef.current = blocks;

      // Close template selector
      setShowTemplateSelector(false);

      toast.success(`Template "${template.name}" loaded successfully!`);
    }
  };

  const handleToggleTemplateSelector = (): void => {
    setShowTemplateSelector(prev => !prev);
  };

  return {
    showTemplateSelector,
    setShowTemplateSelector,
    handleTemplateSelect,
    handleToggleTemplateSelector
  };
};