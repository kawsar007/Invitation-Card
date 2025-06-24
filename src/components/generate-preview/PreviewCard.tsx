import { useUser } from '@/context/UserContext';
import { PreviewData } from '@/types/craftApi';
import { Crown, Edit2, Eye, Send, Sparkles, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface PreviewCardProps {
  versionNo: number;
  previewData: PreviewData;
  previewLoading: boolean;
  setActiveTab: (string) => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ versionNo, previewData, previewLoading, setActiveTab }) => {

  const { user, isAuthenticated } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'from' | 'subject'>('from');
  const [fromName, setFromName] = useState(`${user?.first_name || ''} ${user?.last_name || ''}`);
  const [subject, setSubject] = useState('Birthday Party');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Invitation Preview
                  </h1>
                  <p className="text-gray-600">Create stunning invitations that wow your guests</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Version {versionNo}
                </div>
              </div>
            </div>

            {/* Enhanced From/Subject Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">From</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    {fromName}
                  </span>
                  <button
                    onClick={() => handleEditClick('from')}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Subject</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{subject}</span>
                  <button
                    onClick={() => handleEditClick('subject')}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Invitation Preview Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 mb-4">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <p className="text-gray-300">
                    {fromName} sent you an invitation for
                  </p>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <h2 className="text-3xl font-bold">{subject}</h2>
                  <button
                    onClick={() => handleEditClick('subject')}
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  <Send className="w-5 h-5" />
                  <span>OPEN INVITATION</span>
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-medium hover:bg-white/20 transition-colors">
                  Color
                </button>
              </div>
            </div>

            {/* Preview Content Area */}
            <div className="p-8">
              {previewLoading ? (
                /* Enhanced Loading State */
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-16 border border-blue-200">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Creating Magic ✨</h3>
                      <p className="text-gray-600 text-lg">Crafting your stunning invitation preview...</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              ) : previewData ? (
                /* Enhanced Preview Content */
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                    {/* Preview Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold flex items-center space-x-2">
                            <Eye className="w-5 h-5" />
                            <span>Your Invitation</span>
                          </h3>
                          <p className="text-indigo-100 mt-1">High-quality preview of your final design</p>
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <span className="text-sm font-medium">Preview Ready</span>
                        </div>
                      </div>
                    </div>

                    {previewData.data?.imageUrl ? (
                      <div className="py-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <img
                              src={previewData.data.imageUrl}
                              alt="Invitation Preview"
                              className="w-full h-auto mx-auto rounded-xl shadow-2xl border border-gray-200 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl"
                              style={{ maxHeight: '900px', objectFit: 'contain' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center">
                              <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl shadow-xl font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                              >
                                <Eye className="w-5 h-5" />
                                <span>View Full Size</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-16 text-center bg-gradient-to-br from-gray-50 to-blue-50">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Preview In Progress</h4>
                        <p className="text-gray-600">Your invitation image is being generated...</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Enhanced Empty State */
                <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl border-2 border-dashed border-indigo-200 p-16">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Something Amazing?</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                      Complete the design and details steps to generate a beautiful preview of your invitation.
                    </p>
                    <button
                      onClick={() => setActiveTab('editor')}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
                    >
                      <Edit2 className="w-5 h-5" />
                      <span>Go to Editor</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600 italic font-medium">
                    This email is personalized for you. Please do not forward.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl py-3 px-6 border border-white/50">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                    Enable Guest Sharing
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">Invitation</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">RSVP</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-green-600">Messaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 px-8 rounded-2xl inline-block shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm text-gray-300">Powered by </span>
                  <span className="font-bold tracking-wider text-white">INVITELOOP</span>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 inline-block border border-white/50">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium">Trial Mode Active</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-gray-600">Limited to 10 recipients</span>
                <div className="w-px h-4 bg-gray-300"></div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit {editType === 'from' ? 'From Name' : 'Subject'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {editType === 'from' ? 'From Name' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder={editType === 'from' ? 'Enter your name' : 'Enter subject'}
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
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
        />

      </div>
      {/* <ProfessionalInvitationCard /> */}
    </>
  );
};

export default PreviewCard;