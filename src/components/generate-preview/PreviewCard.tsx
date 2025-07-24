import { useUser } from '@/context/UserContext';
import { PreviewData } from '@/types/craftApi';
import { Event } from '@/types/event';
import { formatToReadableDate } from '@/utils/date';
import { Eye, SquarePen, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface PreviewCardProps {
  versionNo: number;
  previewData: PreviewData;
  previewLoading: boolean;
  setActiveTab: (string) => void;
  event: Event,
}

const PreviewCard: React.FC<PreviewCardProps> = ({ versionNo, previewData, previewLoading, setActiveTab, event }) => {

  const { user, isAuthenticated } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'from' | 'subject'>('from');
  const [fromName, setFromName] = useState(`${user?.first_name || ''} ${user?.last_name || ''}`);
  const [subject, setSubject] = useState(event.name);
  const [tempValue, setTempValue] = useState('');

  const handleEditClick = (type: 'from' | 'subject') => {
    setEditType(type);
    setTempValue(type === 'from' ? fromName : subject);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editType === 'from') {
      setFromName(tempValue);
    } else {
      setSubject(tempValue);
    }
    setIsEditModalOpen(false);
    setTempValue('');
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setTempValue('');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="">

          {/* Email Layout Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-100 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-600 font-bold">From:</span>
                    <span className="text-gray-900">{fromName}</span>
                    <button
                      onClick={() => handleEditClick('from')}
                      className="text-gray-500 hover:text-blue-700"
                    >
                      <SquarePen className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-bold">Subject:</span>
                    <span className="text-gray-900">{subject}</span>
                    <button
                      onClick={() => handleEditClick('subject')}
                      className="text-gray-500 hover:text-blue-700"
                    >
                      <SquarePen className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="bg-white">
              {previewLoading ? (
                /* Loading State */
                <div className="p-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Creating Magic ✨</h3>
                      <p className="text-gray-600">Crafting your invitation preview...</p>
                    </div>
                  </div>
                </div>
              ) : previewData ? (
                /* Email Content */
                <div className="text-center p-8 bg-gray-50">
                  <div className="mb-4">
                    <p className="text-gray-800 text-sm mb-2">
                      {fromName} sent you an invitation for
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <h2 className="text-2xl font-semibold text-gray-900">{subject}</h2>
                      <button
                        onClick={() => handleEditClick('subject')}
                        className="text-gray-500 hover:text-blue-700"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-4">{formatToReadableDate(event.date)}</p>
                    <div className="flex justify-center space-x-4">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded text-sm font-medium">
                        OPEN INVITATION
                      </button>
                      <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded text-sm font-medium">
                        Color
                      </button>
                    </div>
                  </div>

                  {/* Invitation Image */}
                  {previewData.data?.imageUrl ? (
                    <div className="mb-6 relative group">
                      <img
                        src={previewData.data.imageUrl}
                        alt="Invitation Preview"
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
                        style={{ maxHeight: '600px', objectFit: 'contain' }}
                        onClick={() => setIsModalOpen(true)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Preview In Progress</h4>
                        <p className="text-gray-600">Your invitation image is being generated...</p>
                      </div>
                    </div>
                  )}

                  {/* Email Footer */}
                  <div className="text-center space-y-4">
                    <p className="text-xs text-gray-500 italic">
                      This email is personalized for you. Please do not forward.
                    </p>

                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                        Enable Guest Sharing
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-6 text-xs">
                      <span className="text-teal-600 font-medium">Invitation</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-teal-600 font-medium">RSVP</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-teal-600 font-medium">Details</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-teal-600 font-medium">Messaging</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="p-16 text-center bg-gray-50">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Create Something Amazing?</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Complete the design and details steps to generate a beautiful preview of your invitation.
                  </p>
                  <button
                    onClick={() => setActiveTab('editor')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <SquarePen className="w-4 h-4" />
                    <span>Go to Editor</span>
                  </button>
                </div>
              )}

              {/* Location Info */}
              {event?.location_type === "inPerson" && <div className="bg-white border-t border-gray-200 p-6 text-center">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="font-medium">{event?.venue_name}</div>
                  <div>
                    {event?.venue_address} (<span className="text-blue-600 hover:text-blue-700 cursor-pointer">View Map</span>)
                  </div>
                  <div>{formatToReadableDate(event?.date)}</div>
                  <div className="text-xs text-gray-500">{event?.location_additional_information}</div>
                </div>
              </div>}

            </div>

            {/* Powered by footer */}
            <div className="bg-gray-600 text-white p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">Powered by</span>
                <span className="font-bold">INVITELOOP</span>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p className="mb-2">
              No longer want to receive emails from this sender? <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Click Here</span>
            </p>
            <p className="mb-1">© 2025 Inviteloop, LLC</p>
            <p className="mb-1">2312 2nd Ave, Seattle, Washington 98121</p>
            <p>
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">support@inviteloop.com</span>
              <span className="mx-1">|</span>
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">inviteloop.com/contact</span>
            </p>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit {editType === 'from' ? 'From Name' : 'Subject'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {editType === 'from' ? 'From Name' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder={editType === 'from' ? 'Enter your name' : 'Enter subject'}
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  DONE
                </button>
              </div>
            </div>
          </div>
        )}

        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={previewData?.data?.imageUrl}
          versionNo={versionNo}
          previewData={previewData}
          fromName={fromName}
          setActiveTab={setActiveTab}
        />

      </div>
    </>
  );
};

export default PreviewCard;