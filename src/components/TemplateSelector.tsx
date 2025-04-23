// components/TemplateSelector.tsx (continued)
import React from 'react';

interface CardTemplate {
  id: string;
  name: string;
  thumbnail: string;
  backgroundImage: string;
  content: string;
  description: string;
  category: string;
}

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
  // Group templates by category
  const templatesByCategory: Record<string, CardTemplate[]> = {};
  templates.forEach(template => {
    if (!templatesByCategory[template.category]) {
      templatesByCategory[template.category] = [];
    }
    templatesByCategory[template.category].push(template);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl h-5/6 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Select a Template</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 capitalize mb-4">{category}</h3>
              <div className="grid grid-cols-3 gap-4">
                {categoryTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${template.id === currentTemplateId
                      ? 'border-blue-500 ring-2 ring-blue-300'
                      : 'border-gray-200 hover:border-blue-300'
                      }`}
                    onClick={() => onSelect(template.id)}
                  >
                    <div className="h-40 bg-gray-100 overflow-hidden">
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
                    <div className="p-3">
                      <h4 className="font-medium text-gray-800 text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

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
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;