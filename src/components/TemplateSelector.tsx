import { CardTemplate } from '@/types/types';
import React, { useEffect, useState } from 'react';

interface TemplateSelectorProps {
  templates: CardTemplate[];
  onSelect: (templateId: string) => void;
  onClose: () => void;
  currentTemplateId: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  onSelect,
  onClose,
  currentTemplateId
}) => {
  // Store templates grouped by category
  const [templatesByCategory, setTemplatesByCategory] = useState<Record<string, CardTemplate[]>>({});
  const [previewContent, setPreviewContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(
    templates.find(t => t.id === currentTemplateId) || null
  );

  // Group templates by category on component mount
  useEffect(() => {
    const grouped: Record<string, CardTemplate[]> = {};
    templates.forEach(template => {
      if (!grouped[template.category]) {
        grouped[template.category] = [];
      }
      grouped[template.category].push(template);
    });
    setTemplatesByCategory(grouped);

    // Set initial preview if there's a current template
    if (currentTemplateId) {
      const current = templates.find(t => t.id === currentTemplateId);
      if (current) {
        setPreviewContent(makeResponsive(current.content));
        setShowPreview(true);
      }
    }
  }, [templates, currentTemplateId]);

  // Function to make template content responsive
  const makeResponsive = (content: string): string => {
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

  const handleTemplateSelect = (template: CardTemplate) => {
    onSelect(template.id);
    setSelectedTemplate(template);
    setPreviewContent(makeResponsive(template.content));
    setShowPreview(true);
  };

  const handleTemplateHover = (template: CardTemplate) => {
    setPreviewContent(makeResponsive(template.content));
    setShowPreview(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl h-5/6 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Select a Template</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="Close"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left side: Template categories and cards - scrollable */}
          <div className="w-full md:w-2/3 overflow-y-auto p-4 md:p-6 md:border-r border-gray-200">
            {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 capitalize mb-4">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTemplates.map(template => (
                    <div
                      key={template.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 h-full flex flex-col ${template.id === currentTemplateId
                        ? 'border-blue-500 ring-2 ring-blue-300'
                        : 'border-gray-200 hover:border-blue-300'
                        }`}
                      onClick={() => handleTemplateSelect(template)}
                      onMouseEnter={() => handleTemplateHover(template)}
                    >
                      <div className="h-32 sm:h-40 bg-gray-100 overflow-hidden">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).src = '/placeholder-template.jpg';
                          }}
                        />
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <h4 className="font-medium text-gray-800 text-sm">{template.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Preview section - Fixed height, no scroll */}
          <div className="w-full md:w-1/3 p-4 md:p-6 flex flex-col min-h-64 md:min-h-0">
            <h3 className="text-lg font-medium text-gray-700 mb-2 md:mb-4">Preview</h3>
            <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 shadow-inner flex flex-col relative overflow-hidden">
              {showPreview ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-full max-h-full relative">
                    <div
                      className="w-full h-full transform scale-20 origin-center bg-white shadow-md"
                      style={{
                        transform: 'scale(0.9)',
                        transformOrigin: 'center center',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        overflow: 'hidden'
                      }}
                      dangerouslySetInnerHTML={{ __html: previewContent }}
                    />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-12 h-12 md:w-16 md:h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <p className="text-center px-4 text-sm md:text-base">Select or hover over a template to see preview</p>
                </div>
              )}
            </div>

            {/* {selectedTemplate && showPreview && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-800">{selectedTemplate.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
              </div>
            )} */}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;