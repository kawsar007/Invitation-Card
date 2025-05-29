export const getThemeStyles = (theme: string) => ({
  container: `py-20 ${theme === 'light' ? 'bg-green-50' : 'bg-gray-900'} transition-colors duration-300`,
  heading: `heading-primary mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`,
  subtitle: `font-opensans text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`,
  templateCard: `rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`,
  templatePreview: `relative w-full aspect-[3/4] ${theme === 'light' ? 'bg-lime-50' : 'bg-gray-700'} overflow-hidden`,
  customizeButton: `${theme === 'light' ? 'text-lime-600 hover:text-lime-700' : 'text-lime-400 hover:text-lime-300'}`,
  viewAllButton: `px-8 py-4 rounded-lg inline-flex items-center font-medium transition-all duration-300 ${theme === 'light' ? 'bg-teal-500 text-gray-800 hover:bg-teal-400' : 'bg-teal-700 text-white hover:bg-teal-600'}`,
});