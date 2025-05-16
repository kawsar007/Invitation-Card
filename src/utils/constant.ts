import { Color, Font, FontSize } from "@/types/types";

// Constants and Types
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

// Constants
export const FONT_FAMILIES: Font[] = [
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

export const FONT_SIZES: FontSize[] = [
  { value: '1', label: '8pt' },
  { value: '2', label: '10pt' },
  { value: '3', label: '12pt' },
  { value: '4', label: '14pt' },
  { value: '5', label: '18pt' },
  { value: '6', label: '24pt' },
  { value: '7', label: '36pt' },
];

export const COLOR_PALETTE: Color[] = [
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