import { HelpCircle } from 'lucide-react';
import React from 'react';

interface TagsSectionProps {
  tags: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export const TagsSection: React.FC<TagsSectionProps> = ({
  tags,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag
}) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-sm font-medium text-gray-700">Tags</span>
      <HelpCircle size={16} className="text-gray-400" />
    </div>
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onAddTag()}
        placeholder="Enter tag name"
        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onAddTag}
        className="text-blue-600 text-sm hover:underline"
      >
        + Add Tag
      </button>
    </div>
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700 text-white px-2 py-1 text-xs rounded flex items-center space-x-1"
          >
            <span>{tag}</span>
            <button
              onClick={() => onRemoveTag(tag)}
              className="text-white hover:text-gray-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);