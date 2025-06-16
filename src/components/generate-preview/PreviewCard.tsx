import { useState } from 'react';
import ImageModal from './ImageModal';
import ShareButton from './ShareButton';

const PreviewCard = ({ versionNo, previewData, previewLoading, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invitation Preview</h2>
            <p className="text-gray-600">Review your beautifully crafted invitation before finalizing</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Version {versionNo}
            </div>
            <button
              onClick={() => previewData?.data?.imageUrl && handleDownload(previewData.data.imageUrl)}
              disabled={!previewData?.data?.imageUrl}
              className="bg-white border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              Download
            </button>
            <ShareButton
              imageUrl={previewData?.data?.imageUrl}
              versionNo={versionNo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            />
          </div>
        </div>
      </div>

      {previewLoading ? (
        /* Loading State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Your Preview</h3>
              <p className="text-gray-600">Creating a stunning preview of your invitation...</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      ) : previewData ? (
        /* Preview Content */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview Image */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Invitation</h3>
                <p className="text-sm text-gray-600 mt-1">High-quality preview of your final design</p>
              </div>

              {previewData.data?.imageUrl ? (
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <div className="relative group">
                    <img
                      src={previewData.data.imageUrl}
                      alt="Invitation Preview"
                      className="w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200 transition-transform group-hover:scale-[1.02]"
                      style={{ maxHeight: '600px', objectFit: 'contain' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        View Full Size
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h4>
                  <p className="text-gray-600">The invitation image is being generated...</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel with Details */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Status</h4>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-600">Design</span>
                  <span className="text-sm font-medium text-green-600">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-600">Content</span>
                  <span className="text-sm font-medium text-green-600">✓ Crafted</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-600">Preview</span>
                  <span className="text-sm font-medium text-green-600">✓ Generated</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {previewData.message && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 text-green-600 mt-0.5 mr-3">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-green-800 mb-1">Preview Ready</h5>
                    <p className="text-sm text-green-700">{previewData.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => previewData?.data?.imageUrl && handleDownload(previewData.data.imageUrl)}
                  disabled={!previewData?.data?.imageUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download High-Res
                </button>
                <ShareButton
                  imageUrl={previewData?.data?.imageUrl}
                  versionNo={versionNo}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                />
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Design
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{versionNo}</div>
                  <div className="text-xs text-gray-600">Version</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">HD</div>
                  <div className="text-xs text-gray-600">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Preview</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Complete the design and details steps to generate a beautiful preview of your invitation.
            </p>
            <button
              onClick={() => setActiveTab('editor')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Editor
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={previewData?.data?.imageUrl}
        versionNo={versionNo}
      />
    </div>
  )
}

export default PreviewCard;