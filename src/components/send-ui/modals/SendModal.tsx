import { EmailHistoryService } from '@/services/emailHistoryService';
import { EmailService, generateInvitationEmailContent } from '@/services/emailService';
import { Contact } from '@/types/sendContact';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// types/User.ts
export interface EventDetails {
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
}

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
  // Add recipients array for email sending
  recipients?: Contact[];
  // Optional event details for email content
  eventDetails?: EventDetails;
  rsvpUniqueIds: string;
  eventId?: number;
}

export const SendInvitationModal: React.FC<SendInvitationModalProps> = ({
  isOpen,
  onClose,
  onConfirmSend,
  recipientCount,
  sendFromInfo,
  subject,
  invitationPreview,
  sendToInfo,
  recipients = [],
  eventDetails,
  rsvpUniqueIds,
  eventId
}) => {
  console.log("rsvpUniqueIds--->", rsvpUniqueIds);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openedCount, setOpenedCount] = useState<number | null>(null);


  const firstName = sendFromInfo?.first_name;
  const lastName = sendFromInfo?.last_name;
  const senderName = firstName + lastName;

  // Fetch opened email count after successful send
  useEffect(() => {
    if (success && eventId && sendFromInfo.id) {
      const fetchOpenedCount = async () => {
        try {
          const count = await EmailHistoryService.getOpenedEmailCount(sendFromInfo.id, eventId);
          setOpenedCount(count);
        } catch (err) {
          console.error('Error fetching opened email count:', err);
        }
      };
      // Fetch immediately and then every 30 seconds
      fetchOpenedCount();
      const interval = setInterval(fetchOpenedCount, 30000);
      return () => clearInterval(interval);
    }
  }, [success, eventId, sendFromInfo.id]);

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    setIsLoading(true)
    setError(null);
    setSuccess(null);
    setOpenedCount(null);

    try {
      const recipientEmails = recipients.length > 0 ? recipients.map(recipient => recipient.email).filter(Boolean)
        : [sendToInfo.email].filter(Boolean);

      if (recipientEmails.length === 0) {
        throw new Error('No valid email addresses found');
      }

      // Send emails one by one to capture individual emailHistoryId
      const emailHistoryIds: number[] = [];

      for (const email of recipientEmails) {
        // First, send email to get the emailHistoryId
        const emailData = {
          from: sendFromInfo.email,
          to: [email], // Send to one recipient at a time
          subject: subject,
          text: '', // We'll update this after getting the emailHistoryId
          html: '', // We'll update this after getting the emailHistoryId
          userId: sendFromInfo.id,
          eventId: eventId,
          contactId: recipients.length === 1 ? sendToInfo.id : undefined
        };

        const result = await EmailService.sendEmail(emailData);

        if (result.statusCode === 200 && result.emailHistoryId) {
          // Now generate the email content with the emailHistoryId
          const { text, html } = generateInvitationEmailContent(
            recipients.length > 0 ? 'there' : (sendToInfo.first_name || 'there'),
            senderName,
            "PassInviteID",
            eventDetails,
            rsvpUniqueIds,
            result.emailHistoryId // Now you have the emailHistoryId!
          );

          // Send the email again with the proper content
          const finalEmailData = {
            from: sendFromInfo.email,
            to: [email],
            subject: subject,
            text: text,
            html: html,
            userId: sendFromInfo.id,
            eventId: eventId,
            contactId: recipients.length === 1 ? sendToInfo.id : undefined
          };

          const finalResult = await EmailService.sendEmail(finalEmailData);

          if (finalResult.statusCode === 200 && finalResult.emailHistoryId) {
            emailHistoryIds.push(finalResult.emailHistoryId);
          } else {
            throw new Error('Failed to send final email');
          }
        } else {
          throw new Error('Failed to get emailHistoryId');
        }
      }

      setSuccess(`Email sent successfully to ${recipientEmails.length} recipient${recipientEmails.length > 1 ? 's' : ''}!`);

      // Call the original onConfirmSend after successful email send
      setTimeout(() => {
        onConfirmSend();
      }, 1500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while sending the email';
      setError(errorMessage);
      console.error('Error sending email:', err);
    } finally {
      setIsLoading(false);
    }
  }


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
              <span className="font-medium text-gray-800">From:</span> {senderName}
            </div>
            <div className="text-sm text-gray-700 mb-3">
              <span className="font-medium text-gray-800">Subject:</span> {eventDetails?.eventName}
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

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
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isLoading}
            className={`w-full sm:w-auto px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              `Send to ${recipientCount} ${recipientCount === 1 ? 'person' : 'people'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};