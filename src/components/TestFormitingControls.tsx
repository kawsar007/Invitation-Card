import React, { useState } from 'react';

interface TextFormattingControlsProps {
  editor: any | null;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

// Font families and sizes definitions
// Font families and sizes definitions
const fontFamilies = [
  // Sans Serif Fonts
  { value: 'Arial', label: 'Arial' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Roboto Condensed', label: 'Roboto Condensed' },
  { value: 'Futura', label: 'Futura' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'Kanit', label: 'Kanit' },
  { value: 'Arsenal', label: 'Arsenal' },
  { value: 'Comfortaa', label: 'Comfortaa' },
  { value: 'Josefin Sans', label: 'Josefin Sans' },
  { value: 'Bebas Neue', label: 'Bebas Neue' },
  { value: 'Quicksand', label: 'Quicksand' },
  { value: 'Sen', label: 'Sen' },
  { value: 'Recursive', label: 'Recursive' },

  // Serif Fonts
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Marcellus', label: 'Marcellus' },
  { value: 'Poiret', label: 'Poiret' },
  { value: 'HV Clio', label: 'HV Clio' },
  { value: 'Italiana', label: 'Italiana' },
  { value: 'Gotu', label: 'Gotu' },

  // Display & Decorative Fonts
  { value: 'Oswald', label: 'Oswald' },
  { value: 'FRONTAGE', label: 'Frontage' },
  { value: 'Pathway Gothic', label: 'Pathway Gothic' },
  { value: 'Rama Gothic', label: 'Rama Gothic' },
  { value: 'Outfit', label: 'Outfit' },
  { value: 'Function', label: 'Function' },
  { value: 'ANVIL', label: 'Anvil' },
  { value: 'Budmo Jiggler', label: 'Budmo Jiggler' },
  { value: 'Dongle', label: 'Dongle' },
  { value: 'SACKERS', label: 'Sackers' },

  // Script & Handwritten Fonts  
  { value: 'Dancing Script', label: 'Dancing Script' },
  { value: 'Pacifico', label: 'Pacifico' },
  { value: 'Great Vibes', label: 'Great Vibes' },
  { value: 'Satisfy', label: 'Satisfy' },
  { value: 'Belleza', label: 'Belleza' },
  { value: 'Alexa Rose', label: 'Alexa Rose' },
  { value: 'AMORE T', label: 'Amore T' },
  { value: 'Fahkwang', label: 'Fahkwang' },
  { value: 'Dorsa', label: 'Dorsa' },

  // Specialty Fonts
  { value: 'ABORETO', label: 'Aboreto' },
  { value: 'Alumni Pinstripe', label: 'Alumni Pinstripe' },
  { value: 'Archivo Narrow', label: 'Archivo Narrow' },
  { value: 'Foundation Outline', label: 'Foundation Outline' },
  { value: 'SEASIDE RESORT', label: 'Seaside Resort' }
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

// Color palette definitions
const colorPalette = [
  // Basic colors
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#777777', label: 'Gray' },
  { value: '#FF0000', label: 'Red' },
  { value: '#00FF00', label: 'Green' },
  { value: '#0000FF', label: 'Blue' },

  // Additional colors
  { value: '#FFA500', label: 'Orange' },
  { value: '#FFFF00', label: 'Yellow' },
  { value: '#800080', label: 'Purple' },
  { value: '#FFC0CB', label: 'Pink' },
  { value: '#A52A2A', label: 'Brown' },
  { value: '#00FFFF', label: 'Cyan' },
  { value: '#FF00FF', label: 'Magenta' },
  { value: '#006400', label: 'Dark Green' },
  { value: '#000080', label: 'Navy Blue' },
  { value: '#008080', label: 'Teal' },
];

// Create two columns of fonts
const splitArrayInHalf = (array) => {
  const middle = Math.ceil(array.length / 2);
  const column1 = array.slice(0, middle);
  const column2 = array.slice(middle);
  return [column1, column2];
};

const [leftColumnFonts, rightColumnFonts] = splitArrayInHalf(fontFamilies);

// Two Column Font Grid Component
const TwoColumnFontGrid = ({ theme, selectedFont, onSelectFont }) => {
  return (
    <div className="w-full max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-1">
        {/* Left Column */}
        <div className="flex flex-col">
          {leftColumnFonts.map((font) => (
            <button
              key={font.value}
              onClick={() => onSelectFont(font)}
              className={`text-left px-3 py-2 transition-colors ${selectedFont?.value === font.value
                ? theme === 'light'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-green-900 text-green-100'
                : theme === 'light'
                  ? 'hover:bg-gray-50'
                  : 'hover:bg-gray-700'
                }`}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {rightColumnFonts.map((font) => (
            <button
              key={font.value}
              onClick={() => onSelectFont(font)}
              className={`text-left px-3 py-2 transition-colors ${selectedFont?.value === font.value
                ? theme === 'light'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-green-900 text-green-100'
                : theme === 'light'
                  ? 'hover:bg-gray-50'
                  : 'hover:bg-gray-700'
                }`}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Color Palette Component
const ColorPalette = ({ onSelectColor, selectedColor }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {colorPalette.map((color) => (
        <button
          key={color.value}
          onClick={() => onSelectColor(color)}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedColor?.value === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
            }`}
          style={{ backgroundColor: color.value }}
          title={color.label}
        >
          {selectedColor?.value === color.value && (
            <span className={`text-xs ${color.value === '#FFFFFF' || color.value === '#FFFF00' || color.value === '#00FF00' ? 'text-black' : 'text-white'
              }`}>
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
};


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
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!editor) return null;

  const executeCommand = (command: string, ui?: boolean, value?: any) => {
    if (editor) {
      editor.execCommand(command, ui, value);
    }
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    executeCommand('FontName', false, font.value);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    executeCommand('ForeColor', false, color.value);
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

        {/* Text Color Section */}
        <div>
          <div
            className={sectionHeaderClass}
            onClick={() => toggleSection('color')}
          >
            <h3 className="font-medium">Text Color</h3>
            <span>{activeSections.color ? '−' : '+'}</span>
          </div>

          {activeSections.color && (
            <div className="p-3">
              <label className={`block mb-2 text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Select Color
              </label>
              <div className={`border rounded-md ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                <ColorPalette
                  onSelectColor={handleColorSelect}
                  selectedColor={selectedColor}
                />
              </div>
              {selectedColor && (
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    Selected:
                  </span>
                  <div
                    className="w-4 h-4 rounded ml-2"
                    style={{ backgroundColor: selectedColor.value }}
                  ></div>
                  <span className={`ml-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {selectedColor.label}
                  </span>
                </div>
              )}
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
                <label className={`block mb-1 text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
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

              <div>
                <label className={`block mb-1 text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Font Family
                </label>

                <TwoColumnFontGrid
                  theme={theme}
                  selectedFont={selectedFont}
                  onSelectFont={handleFontSelect}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextFormattingControls;