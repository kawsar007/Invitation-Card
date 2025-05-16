import { CardTemplate } from '@/types/types';
import { useEffect, useState } from 'react';

/**
 * Custom hook to group templates by category
 */

export const useTemplateCategories = (templates: CardTemplate[]) => {
  const [templatesByCategory, setTemplatesByCategory] = useState<Record<string, CardTemplate[]>>({});

  useEffect(() => {
    const grouped: Record<string, CardTemplate[]> = {};
    templates.forEach(template => {
      if (!grouped[template.category]) {
        grouped[template.category] = [];
      }
      grouped[template.category].push(template);
    })
    setTemplatesByCategory(grouped);
  }, [templates]);

  return templatesByCategory;
}

export const useTemplatePreview = (templates: CardTemplate[], currentTemplateId: string) => {
  const [previewContent, setPreviewContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(
    templates.find(t => t.id === currentTemplateId) || null
  );

  useEffect(() => {
    if (currentTemplateId) {
      const current = templates.find(t => t.id === currentTemplateId);
      if (current) {
        setPreviewContent(makeResponsive(current.content));
        setShowPreview(true);
        setSelectedTemplate(current);
      }
    }
  }, [templates, currentTemplateId]);

  const handleTemplateSelect = (template: CardTemplate) => {
    setSelectedTemplate(template);
    setPreviewContent(makeResponsive(template.content));
    setShowPreview(true);
    return template.id;
  };

  const handleTemplateHover = (template: CardTemplate) => {
    setPreviewContent(makeResponsive(template.content));
    setShowPreview(true);
  };

  return {
    previewContent,
    showPreview,
    selectedTemplate,
    handleTemplateSelect,
    handleTemplateHover
  };
}

/**
 * Utility function to make template content responsive
 */
export const makeResponsive = (content: string): string => {
  // Replace fixed dimensions with responsive ones
  const responsiveContent = content
    // Make container responsive with min-height
    .replace(/min-height: 100vh;/g, 'min-height: 100%;')
    // Ensure max-width is responsive
    .replace(/max-width: 800px;/g, 'max-width: 100%;')
    // Add viewport meta tag for proper scaling in preview
    .replace(/<div style="/g, '<div style="box-sizing: border-box; ')
    // Make text sizes more responsive
    .replace(/font-size: (\d+)px;/g, (match, size) => {
      const newSize = Math.max(parseInt(size) * 0.8, 12); // Scale down but not below 12px
      return `font-size: clamp(${newSize * 0.7}px, ${newSize * 0.02}vw + ${newSize * 0.5}px, ${newSize}px);`;
    })
    // Make padding responsive
    .replace(/padding: (\d+)px;/g, (match, padding) => {
      return `padding: clamp(15px, ${parseInt(padding) * 0.5}px + 2vw, ${padding}px);`;
    });

  return responsiveContent;
};