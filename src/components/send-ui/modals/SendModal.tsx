import { Contact } from '@/types/sendContact';
import { X } from 'lucide-react';
import React from 'react';

// types/User.ts

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'host' | 'guest' | string; // adjust based on your system roles
  profile_photo: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}


interface SendInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSend: () => void;
  recipientCount: number;
  // senderName: string;
  subject: string;
  invitationPreview?: string;
  sendFromInfo: User;
  sendToInfo: Contact
}

export const SendInvitationModal: React.FC<SendInvitationModalProps> = ({
  isOpen,
  onClose,
  onConfirmSend,
  recipientCount,
  sendFromInfo,
  subject,
  invitationPreview,
  sendToInfo
}) => {
  if (!isOpen) return null;
  const firstName = sendFromInfo?.first_name;
  const lastName = sendFromInfo?.last_name;
  const fullName = firstName + lastName;

  console.log("sendFromInfo", sendFromInfo);
  console.log("sendToInfo", sendToInfo);
  console.log("invitationPreview", invitationPreview);
  console.log("subject", subject);
  console.log("recipientCount", recipientCount);


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Ready to send your invitation?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <p className="text-sm text-gray-600 mb-4">
            A friendly reminder that when you hit send, your invitation will be sent to{' '}
            <span className="font-medium text-gray-800">{recipientCount} people</span> and cannot be undone.{' '}
            <span className="font-medium text-gray-800">
              Be sure you've proofed and are ready to send!
            </span>
          </p>

          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium text-gray-800">From:</span> {fullName}
            </div>
            <div className="text-sm text-gray-700 mb-3">
              <span className="font-medium text-gray-800">Subject:</span> {subject}
            </div>
          </div>

          {/* Invitation Preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
            <div className="text-center">
              {invitationPreview ? (
                <div className="flex justify-center">
                  <img
                    src={invitationPreview}
                    alt="Invitation Preview"
                    className="object-contain max-h-[50vh] w-full max-w-[320px]"
                    style={{
                      transform: 'rotate(90deg)',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
              ) : (
                <div className="text-sm text-gray-400 py-10">
                  Invitation preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="sticky bottom-0 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 md:p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmSend}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send to {recipientCount} {recipientCount === 1 ? 'person' : 'people'}
          </button>
        </div>
      </div>
    </div>
  );
};