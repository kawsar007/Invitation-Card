import { Color, Font } from '@/types/types';
import { COLOR_PALETTE, FONT_FAMILIES, FONT_SIZES, SIZES, THEMES } from '@/utils/constant';
import React, { useState } from 'react';





interface TextFormattingControlsProps {
  editor: any | null;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

// Main Component
const TextFormattingControls: React.FC<TextFormattingControlsProps> = ({
  editor,
  theme = THEMES.LIGHT,
  size = SIZES.MD
}) => {
  const [activeSections, setActiveSections] = useState({
    basic: true,
    alignment: true,
    font: true,
    color: true
  });
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  if (!editor) return null;

  const executeCommand = (command: string, ui?: boolean, value?: any) => {
    if (editor) {
      editor.execCommand(command, ui, value);
    }
  };

  const handleFontSelect = (font: Font) => {
    setSelectedFont(font);
    executeCommand('FontName', false, font.value);
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    executeCommand('ForeColor', false, color.value);
  };

  // Styling config
  const styleConfig = getStyleConfig(theme, size);

  const toggleSection = (section: string) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section]
    });
  };

  return (
    <div className="w-72">
      <div className={styleConfig.cardClass}>
        <FormattingSection
          title="Basic Formatting"
          isActive={activeSections.basic}
          onToggle={() => toggleSection('basic')}
          styleConfig={styleConfig}
        >
          <div className="flex p-3 space-x-1">
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('Bold')}
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('Italic')}
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('Underline')}
              title="Underline"
            >
              <u>U</u>
            </button>
          </div>
        </FormattingSection>

        <FormattingSection
          title="Text Alignment"
          isActive={activeSections.alignment}
          onToggle={() => toggleSection('alignment')}
          styleConfig={styleConfig}
        >
          <div className="flex p-3 space-x-1">
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('JustifyLeft')}
              title="Align Left"
            >
              Left
            </button>
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('JustifyCenter')}
              title="Align Center"
            >
              Center
            </button>
            <button
              className={`${styleConfig.buttonClass} flex-1`}
              onClick={() => executeCommand('JustifyRight')}
              title="Align Right"
            >
              Right
            </button>
          </div>
        </FormattingSection>

        <FormattingSection
          title="Text Color"
          isActive={activeSections.color}
          onToggle={() => toggleSection('color')}
          styleConfig={styleConfig}
        >
          <div className="p-3">
            <label className={styleConfig.labelClass}>
              Select Color
            </label>
            <div className={`border rounded-md ${theme === THEMES.LIGHT ? 'border-gray-200' : 'border-gray-700'}`}>
              <ColorPalette
                onSelectColor={handleColorSelect}
                selectedColor={selectedColor}
              />
            </div>
            {selectedColor && (
              <div className="flex items-center mt-2">
                <span className={styleConfig.textClass}>
                  Selected:
                </span>
                <div
                  className="w-4 h-4 rounded ml-2"
                  style={{ backgroundColor: selectedColor.value }}
                ></div>
                <span className={`ml-2 ${styleConfig.textClass}`}>
                  {selectedColor.label}
                </span>
              </div>
            )}
          </div>
        </FormattingSection>

        <FormattingSection
          title="Font Controls"
          isActive={activeSections.font}
          onToggle={() => toggleSection('font')}
          styleConfig={styleConfig}
        >
          <div className="p-3 space-y-2">
            <div>
              <label className={`block mb-1 text-sm font-semibold ${styleConfig.labelClass}`}>
                Font Size
              </label>
              <select
                className={styleConfig.selectClass}
                onChange={(e) => executeCommand('FontSize', false, e.target.value)}
              >
                <option value="">Choose Size</option>
                {FONT_SIZES.map(size => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block mb-1 text-sm font-semibold ${styleConfig.labelClass}`}>
                Font Family
              </label>

              <TwoColumnFontGrid
                theme={theme}
                selectedFont={selectedFont}
                onSelectFont={handleFontSelect}
              />
            </div>
          </div>
        </FormattingSection>
      </div>
    </div>
  );
};

// Component for each formatting section
interface FormattingSectionProps {
  title: string;
  isActive: boolean;
  onToggle: () => void;
  styleConfig: any;
  children: React.ReactNode;
}

const FormattingSection: React.FC<FormattingSectionProps> = ({
  title,
  isActive,
  onToggle,
  styleConfig,
  children
}) => {
  return (
    <div>
      <div
        className={styleConfig.sectionHeaderClass}
        onClick={onToggle}
      >
        <h3 className="font-medium">{title}</h3>
        <span>{isActive ? '−' : '+'}</span>
      </div>

      {isActive && children}
    </div>
  );
};

// Font grid component
interface TwoColumnFontGridProps {
  theme: string;
  selectedFont: Font | null;
  onSelectFont: (font: Font) => void;
}

const TwoColumnFontGrid: React.FC<TwoColumnFontGridProps> = ({
  theme,
  selectedFont,
  onSelectFont
}) => {
  const [leftColumnFonts, rightColumnFonts] = splitArrayInHalf(FONT_FAMILIES);

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
                ? theme === THEMES.LIGHT
                  ? 'bg-green-100 text-green-800'
                  : 'bg-green-900 text-green-100'
                : theme === THEMES.LIGHT
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
                ? theme === THEMES.LIGHT
                  ? 'bg-green-100 text-green-800'
                  : 'bg-green-900 text-green-100'
                : theme === THEMES.LIGHT
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

// Color palette component
interface ColorPaletteProps {
  onSelectColor: (color: Color) => void;
  selectedColor: Color | null;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onSelectColor, selectedColor }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {COLOR_PALETTE.map((color) => (
        <button
          key={color.value}
          onClick={() => onSelectColor(color)}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedColor?.value === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
            }`}
          style={{ backgroundColor: color.value }}
          title={color.label}
        >
          {selectedColor?.value === color.value && (
            <span className={`text-xs ${color.value === '#FFFFFF' || color.value === '#FFFF00' || color.value === '#00FF00'
              ? 'text-black'
              : 'text-white'
              }`}>
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Helper Functions
const splitArrayInHalf = <T extends unknown>(array: T[]): [T[], T[]] => {
  const middle = Math.ceil(array.length / 2);
  const column1 = array.slice(0, middle);
  const column2 = array.slice(middle);
  return [column1, column2];
};

const getStyleConfig = (theme: string, size: string) => {
  const buttonSize = size === SIZES.SM ? 'text-xs p-1' : size === SIZES.LG ? 'text-base p-2' : 'text-sm p-1.5';

  return {
    cardClass: `w-full max-w-xs rounded-lg overflow-hidden shadow-md ${theme === THEMES.LIGHT ? 'bg-white' : 'bg-gray-800'
      }`,

    sectionHeaderClass: `flex justify-between items-center px-4 py-2 ${theme === THEMES.LIGHT ? 'bg-gray-50 text-gray-700' : 'bg-gray-700 text-gray-100'
      }`,

    buttonClass: `transition-colors rounded-md ${buttonSize} ${theme === THEMES.LIGHT ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-600 text-gray-200'
      }`,

    selectClass: `w-full p-2 rounded-md mt-2 ${theme === THEMES.LIGHT ? 'border border-gray-300 bg-white text-gray-700' : 'border border-gray-600 bg-gray-700 text-gray-200'
      }`,

    labelClass: `block mb-2 text-sm font-medium ${theme === THEMES.LIGHT ? 'text-gray-700' : 'text-gray-300'
      }`,

    textClass: `text-sm ${theme === THEMES.LIGHT ? 'text-gray-600' : 'text-gray-300'
      }`
  };
};



export default TextFormattingControls;