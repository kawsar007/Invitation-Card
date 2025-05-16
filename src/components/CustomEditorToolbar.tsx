import { FileType, ImageIcon, Link, Redo, Undo } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

interface CustomToolbarProps {
  editor: any | null;
  // You can add more props for customization
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  handleAddText: () => void;
}

const CustomEditorToolbar: React.FC<CustomToolbarProps> = ({
  editor,
  theme = 'light',
  size = 'md',
  handleAddText
}) => {
  // Add state
  if (!editor) return null;

  const executeCommand = (command: string, ui?: boolean, value?: any) => {
    if (editor) {
      editor.execCommand(command, ui, value);
    }
  };

  // Determine styles based on theme and size
  const baseButtonClass = "px-2 py-1 mx-1 rounded transition-colors";
  const buttonClass = `${baseButtonClass} ${theme === 'light'
    ? 'hover:bg-gray-100 text-gray-800'
    : 'hover:bg-gray-700 text-gray-200'
    } ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg px-4 py-2' : 'text-base'
    }`;

  const containerClass = `w-full border-b py-2 flex justify-between flex-wrap items-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
    }`;

  const sectionClass = `flex items-center mr-4 border-r pr-4 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'
    }`;

  // Function to handle creating a link
  const handleCreateLink = () => {
    // Most editors use the built-in link dialog
    executeCommand('mceLink');

    // Alternatively, if you want to implement a custom link dialog:
    /*
    const url = prompt('Enter URL:', 'https://');
    if (url) {
      executeCommand('mceInsertLink', false, url);
    }
    */
  };

  return (
    <div className={containerClass}>
      {/* History controls */}
      <div className={sectionClass}>
        <Button
          variant="outline"
          className='h-24 flex flex-col items-center justify-center mr-2'
          onClick={handleAddText}
          title="Add Text"
        >
          <FileType size={24} className="mb-2" />
          <span> Add Text </span>
        </Button>

        <Button
          variant='outline'
          className='h-24 flex flex-col items-center justify-center mr-2'
          onClick={handleCreateLink}
          title="Insert Link"
        >
          <Link size={24} className="mb-2" />
          <span>Insert Link</span>
        </Button>

        <Button
          variant="outline"
          className='h-24 flex flex-col items-center justify-center'
          onClick={() => executeCommand('mceImage')}
          title="Insert Image"
          asChild
        >
          <label>
            <ImageIcon size={24} className="mb-2" />
            <span>Image</span>
          </label>

        </Button>
        {/* <button
          className={buttonClass}
          onClick={() => executeCommand('mceMedia')}
          title="Insert Media"
        >
          Media
        </button> */}


      </div>



      {/* Media */}
      <div className="flex items-center">
        <Button
          variant="outline"
          className='h-24 flex flex-col items-center justify-center mr-2'
          onClick={() => executeCommand('Undo')}
          title="Undo"
        // asChild
        >
          <Undo size={24} className="mb-2" />
          <span> Undo </span>
        </Button>
        <Button
          variant='outline'
          className='h-24 flex flex-col items-center justify-center'
          onClick={() => executeCommand('Redo')}
          title="Redo"
        >
          <Redo size={24} className="mb-2" />
          Redo
        </Button>
      </div>
    </div>
  );
};

export default CustomEditorToolbar;