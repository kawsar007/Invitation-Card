
import React, { useState } from 'react';
import { useEditor } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify 
} from 'lucide-react';

const TextEditor: React.FC = () => {
  const { state, updateElement } = useEditor();
  const [textContent, setTextContent] = useState('');

  const selectedElement = state.selectedElement 
    ? state.history.present.find(el => el.id === state.selectedElement) 
    : null;

  // Only show the text editor if a text element is selected
  if (!selectedElement || selectedElement.type !== 'text') {
    return null;
  }

  // Initialize the text content when a text element is selected
  if (textContent === '' && selectedElement.content) {
    setTextContent(selectedElement.content);
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setTextContent(newContent);
    updateElement(selectedElement.id, { 
      content: newContent 
    });
  };

  const handleFormat = (format: string) => {
    let formattedText = textContent;
    
    // Apply formatting based on the selected format
    switch(format) {
      case 'bold':
        formattedText = `<strong>${textContent}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${textContent}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${textContent}</u>`;
        break;
      default:
        break;
    }
    
    setTextContent(formattedText);
    updateElement(selectedElement.id, { content: formattedText });
  };

  const handleAlign = (alignment: string) => {
    const style = { ...selectedElement.style, textAlign: alignment };
    updateElement(selectedElement.id, { style });
  };

  return (
    <div className="p-4 border-t border-border">
      <h3 className="text-lg font-medium mb-4">Text Editor</h3>
      
      <div className="mb-4">
        <Label htmlFor="text-content">Content</Label>
        <Textarea
          id="text-content"
          value={textContent}
          onChange={handleTextChange}
          className="mt-1"
        />
      </div>
      
      <div className="mb-4">
        <Label className="mb-2 block">Formatting</Label>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFormat('bold')}
          >
            <Bold size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFormat('italic')}
          >
            <Italic size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFormat('underline')}
          >
            <Underline size={16} />
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <Label className="mb-2 block">Alignment</Label>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAlign('left')}
          >
            <AlignLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAlign('center')}
          >
            <AlignCenter size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAlign('right')}
          >
            <AlignRight size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAlign('justify')}
          >
            <AlignJustify size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
