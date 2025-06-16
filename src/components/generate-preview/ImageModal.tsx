
// Separate Modal Component
const ImageModal = ({ isOpen, onClose, imageUrl, versionNo }) => {
  if (!isOpen) return null;

  const handleDownload = async (imageUrl, filename = `invitation-v${versionNo}.png`) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative max-w-7xl max-h-full bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Full Size Preview</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDownload(imageUrl)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 max-h-[80vh] overflow-auto">
          <img
            src={imageUrl}
            alt="Full Size Invitation Preview"
            className="w-full h-auto mx-auto rounded-lg"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageModal;