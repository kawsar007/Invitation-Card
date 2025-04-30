import React, { useState } from 'react';

interface TextFormattingControlsProps {
  editor: any | null;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

// Font families and sizes definitions
const fontFamilies = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Dancing Script', label: 'Dancing Script' },
  { value: 'Pacifico', label: 'Pacifico' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Great Vibes', label: 'Great Vibes' },
  { value: 'Satisfy', label: 'Satisfy' },
  // Add more as needed
];

const fontSizes = [
  { value: '1', label: '8pt' },
  { value: '2', label: '10pt' },
  { value: '3', label: '12pt' },
  { value: '4', label: '14pt' },
  { value: '5', label: '18pt' },
  { value: '6', label: '24pt' },
  { value: '7', label: '36pt' },
];

const TextFormattingControls: React.FC<TextFormattingControlsProps> = ({
  editor,
  theme = 'light',
  size = 'md'
}) => {
  const [activeSections, setActiveSections] = useState({
    basic: true,
    alignment: true,
    font: true
  });

  if (!editor) return null;

  const executeCommand = (command: string, ui?: boolean, value?: any) => {
    if (editor) {
      editor.execCommand(command, ui, value);
    }
  };

  // Determine styles based on theme and size
  const cardClass = `w-full max-w-xs rounded-lg overflow-hidden shadow-md ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`;

  const sectionHeaderClass = `flex justify-between items-center px-4 py-2 ${theme === 'light' ? 'bg-gray-50 text-gray-700' : 'bg-gray-700 text-gray-100'}`;

  const buttonSize = size === 'sm' ? 'text-xs p-1' : size === 'lg' ? 'text-base p-2' : 'text-sm p-1.5';

  const buttonClass = `transition-colors rounded-md ${buttonSize} ${theme === 'light'
    ? 'hover:bg-gray-100 text-gray-700'
    : 'hover:bg-gray-600 text-gray-200'}`;

  const selectClass = `w-full p-2 rounded-md mt-2 ${theme === 'light'
    ? 'border border-gray-300 bg-white text-gray-700'
    : 'border border-gray-600 bg-gray-700 text-gray-200'}`;

  const toggleSection = (section) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section]
    });
  };

  return (
    <div className="w-72">
      <div className={cardClass}>
        {/* Basic Formatting Section */}
        <div>
          <div
            className={sectionHeaderClass}
            onClick={() => toggleSection('basic')}
          >
            <h3 className="font-medium">Basic Formatting</h3>
            <span>{activeSections.basic ? '−' : '+'}</span>
          </div>

          {activeSections.basic && (
            <div className="flex p-3 space-x-1">
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('Bold')}
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('Italic')}
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('Underline')}
                title="Underline"
              >
                <u>U</u>
              </button>
            </div>
          )}
        </div>

        {/* Alignment Section */}
        <div>
          <div
            className={sectionHeaderClass}
            onClick={() => toggleSection('alignment')}
          >
            <h3 className="font-medium">Text Alignment</h3>
            <span>{activeSections.alignment ? '−' : '+'}</span>
          </div>

          {activeSections.alignment && (
            <div className="flex p-3 space-x-1">
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('JustifyLeft')}
                title="Align Left"
              >
                Left
              </button>
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('JustifyCenter')}
                title="Align Center"
              >
                Center
              </button>
              <button
                className={`${buttonClass} flex-1`}
                onClick={() => executeCommand('JustifyRight')}
                title="Align Right"
              >
                Right
              </button>
            </div>
          )}
        </div>

        {/* Font Controls Section */}
        <div>
          <div
            className={sectionHeaderClass}
            onClick={() => toggleSection('font')}
          >
            <h3 className="font-medium">Font Controls</h3>
            <span>{activeSections.font ? '−' : '+'}</span>
          </div>

          {activeSections.font && (
            <div className="p-3 space-y-2">
              <div>
                <label className={`block mb-1 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Font Family
                </label>
                <select
                  className={selectClass}
                  onChange={(e) => executeCommand('FontName', false, e.target.value)}
                >
                  <option value="">Choose Font</option>
                  {fontFamilies.map(font => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block mb-1 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Font Size
                </label>
                <select
                  className={selectClass}
                  onChange={(e) => executeCommand('FontSize', false, e.target.value)}
                >
                  <option value="">Choose Size</option>
                  {fontSizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextFormattingControls;