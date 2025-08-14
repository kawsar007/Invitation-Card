// services/emailService.ts

import { EventDetails } from "@/components/send-ui/modals/SendModal";

interface SendEmailRequest {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

interface SendEmailResponse {
  statusCode: number;
  message: string;
  data: {
    messageId: string;

  };
  emailHistoryId?: number;
}

export class EmailService {

  static async sendEmail(emailData: SendEmailRequest): Promise<SendEmailResponse> {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          // Add any authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: SendEmailResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

// Utility function to generate email content
export const generateInvitationEmailContent = (
  recipientName: string,
  senderName: string,
  invitationId: string,
  eventDetails?: EventDetails,
  rsvpUniqueIds?: string,
  emailHistoryId?: number
) => {
  console.log("RSVP Unique IDs--->:", rsvpUniqueIds);

  const text = `
Hello ${recipientName},

${senderName} has sent you an invitation!

${eventDetails?.eventName ? `Event: ${eventDetails.eventName}` : ''}
${eventDetails?.eventDate ? `Date: ${eventDetails.eventDate}` : ''}
${eventDetails?.eventLocation ? `Location: ${eventDetails.eventLocation}` : ''}

Please check your invitation for more details.

View your invitation at: ${window.location.origin}/envelope/${rsvpUniqueIds}

Best regards,
${senderName}
  `.trim();

  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; overflow: hidden;">
    
    <!-- Email Header -->
    <div style="background-color: #f3f4f6; border-bottom: 1px solid #e5e7eb; padding: 16px;">
      <div style="font-size: 14px;">
        <div style="display: flex; align-items: center; margin-bottom: 4px;">
          <span style="color: #4b5563; font-weight: 700; margin-right: 8px;">From:</span>
          <span style="color: #111827;">${senderName}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="color: #4b5563; font-weight: 700; margin-right: 8px;">Subject:</span>
          <span style="color: #111827;">${eventDetails?.eventName || 'You\'re Invited!'}</span>
        </div>
      </div>
    </div>

    <!-- Email Body -->
    <div style="background-color: #ffffff;">
      <!-- Main Content -->
      <div style="text-align: center; padding: 32px; background-color: #f9fafb;">
        <div style="margin-bottom: 16px;">
          <p style="color: #374151; font-size: 14px; margin: 0 0 8px 0;">
            ${senderName} sent you an invitation for
          </p>
          <h2 style="color: #111827; font-size: 24px; font-weight: 600; margin: 0;">
            ${eventDetails?.eventName || 'Special Event'}
          </h2>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0;">
            ${eventDetails?.eventDate || 'Wednesday, June 25, 2025'}
          </p>
          <div style="text-align: center; margin-bottom: 16px;">
            <a href="${window.location.origin}/envelope/${rsvpUniqueIds}?emailHistoryId=${emailHistoryId}" style="background-color: #4b5563; color: #ffffff; padding: 8px 24px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 500; display: inline-block;">
              OPEN INVITATION
            </a>
          </div>
        </div>

        <!-- Invitation Image -->
        <div style="margin-bottom: 24px;">
          <img src="https://down-my.img.susercontent.com/file/sg-11134201-23030-hetperf8ufova2" alt="Invitation Preview" style="width: 100%; max-width: 384px; height: auto; border-radius: 8px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
        </div>

        <!-- Email Footer -->
        <div style="text-align: center; margin-top: 32px;">
          <p style="font-size: 12px; color: #6b7280; font-style: italic; margin: 0 0 16px 0;">
            This email is personalized for you. Please do not forward.
          </p>

          <div style="text-align: center; margin-bottom: 16px;">
            <span style="font-size: 14px; color: #2563eb; cursor: pointer;">
              🫱🏻‍🫲🏽 Enable Guest Sharing
            </span>
          </div>

          <div style="text-align: center; font-size: 12px;">
            <span style="color: #0d9488; font-weight: 500;">Invitation</span>
            <span style="color: #d1d5db; margin: 0 12px;">|</span>
            <span style="color: #0d9488; font-weight: 500;">RSVP</span>
            <span style="color: #d1d5db; margin: 0 12px;">|</span>
            <span style="color: #0d9488; font-weight: 500;">Details</span>
            <span style="color: #d1d5db; margin: 0 12px;">|</span>
            <span style="color: #0d9488; font-weight: 500;">Messaging</span>
          </div>
        </div>
      </div>

      <!-- Location Info -->
      <div style="background-color: #ffffff; border-top: 1px solid #e5e7eb; padding: 24px; text-align: center;">
        <div style="font-size: 14px; color: #6b7280; line-height: 1.5;">
          <div style="font-weight: 500; margin-bottom: 8px;">
            ${eventDetails?.eventLocation || 'Sena Kunjo'}
          </div>
          <div style="margin-bottom: 8px;">
            Dhaka (<span style="color: #2563eb; cursor: pointer;">View Map</span>)
          </div>
          <div style="margin-bottom: 8px;">
            ${eventDetails?.eventDate || 'Wednesday, June 25, 2025'}
          </div>
          <div style="font-size: 12px; color: #6b7280;">
            Additional Information for Location
          </div>
        </div>
      </div>
    </div>

    <!-- Powered by footer -->
    <div style="background-color: #4b5563; color: #ffffff; padding: 16px; text-align: center;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <span style="font-size: 14px; margin-right: 1rem">Powered by</span>
        <span style="font-weight: 700;">INVITELOOP</span>
      </div>
    </div>

    <!-- Bottom Info -->
    <div style="margin-top: 16px; text-align: center; font-size: 12px; color: #6b7280; padding: 0 16px;">
      <p style="margin: 0 0 8px 0;">
        No longer want to receive emails from this sender? <span style="color: #2563eb; cursor: pointer;">Click Here</span>
      </p>
      <p style="margin: 0 0 4px 0;">© 2025 Inviteloop, LLC</p>
      <p style="margin: 0 0 4px 0;">2312 2nd Ave, Seattle, Washington 98121</p>
      <p style="margin: 0;">
        <span style="color: #2563eb; cursor: pointer;">support@inviteloop.com</span>
        <span style="margin: 0 4px;">|</span>
        <span style="color: #2563eb; cursor: pointer;">inviteloop.com/contact</span>
      </p>
    </div>
  </div>
`;

  return { text, html };
};