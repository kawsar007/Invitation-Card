// services/emailService.ts

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
  eventDetails?: {
    eventName?: string;
    eventDate?: string;
    eventLocation?: string;
  }
) => {
  const text = `
Hello ${recipientName},

${senderName} has sent you an invitation!

${eventDetails?.eventName ? `Event: ${eventDetails.eventName}` : ''}
${eventDetails?.eventDate ? `Date: ${eventDetails.eventDate}` : ''}
${eventDetails?.eventLocation ? `Location: ${eventDetails.eventLocation}` : ''}

Please check your invitation for more details.

View your invitation at: http://localhost:8080/envelope

Best regards,
${senderName}
  `.trim();

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 0;">
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 20px; display: inline-block;">
          <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            ✨ You're Invited! ✨
          </h1>
        </div>
      </div>
      
      <!-- Main Content -->
      <div style="background: #ffffff; margin: 0; padding: 40px 30px; position: relative;">
        <!-- Decorative Border -->
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2, #667eea);"></div>
        
        <!-- Greeting -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2c3e50; font-size: 26px; margin: 0 0 10px 0; font-weight: 600;">
            Hello ${recipientName}! 👋
          </h2>
          <p style="color: #7f8c8d; font-size: 18px; margin: 0; font-style: italic;">
            <strong style="color: #667eea;">${senderName}</strong> has something special for you
          </p>
        </div>
        
        <!-- Event Details Card -->
        ${eventDetails?.eventName || eventDetails?.eventDate || eventDetails?.eventLocation ? `
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 5px solid #667eea; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h3 style="color: #2c3e50; font-size: 20px; margin: 0 0 15px 0; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">📅</span> Event Details
          </h3>
          ${eventDetails?.eventName ? `
            <div style="margin-bottom: 12px; display: flex; align-items: center;">
              <span style="color: #667eea; font-weight: 600; min-width: 80px; margin-right: 10px;">🎉 Event:</span>
              <span style="color: #2c3e50; font-size: 16px; font-weight: 500;">${eventDetails.eventName}</span>
            </div>
          ` : ''}
          ${eventDetails?.eventDate ? `
            <div style="margin-bottom: 12px; display: flex; align-items: center;">
              <span style="color: #667eea; font-weight: 600; min-width: 80px; margin-right: 10px;">📅 Date:</span>
              <span style="color: #2c3e50; font-size: 16px; font-weight: 500;">${eventDetails.eventDate}</span>
            </div>
          ` : ''}
          ${eventDetails?.eventLocation ? `
            <div style="margin-bottom: 12px; display: flex; align-items: center;">
              <span style="color: #667eea; font-weight: 600; min-width: 80px; margin-right: 10px;">📍 Location:</span>
              <span style="color: #2c3e50; font-size: 16px; font-weight: 500;">${eventDetails.eventLocation}</span>
            </div>
          ` : ''}
        </div>
        ` : ''}
        
        <!-- Invitation Message -->
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #34495e; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
            We're excited to share this special moment with you! Click below to view your personalized invitation.
          </p>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="http://localhost:8080/envelope" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600; border-radius: 50px; text-align: center; transition: transform 0.3s ease; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); border: none; cursor: pointer;">
            🎊 View Invitation 🎊
          </a>
        </div>
        
        <!-- Envelope Image -->
        <div style="text-align: center; margin: 40px 0;">
          <div style="display: inline-block; padding: 10px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            <img src="https://image.made-in-china.com/2f0j00zAbldTsKpNum/Custom-Logo-Kraft-Paper-Business-Card-Packaging-Envelope-Wedding-Invitation-Card-Envelopes.jpg" alt="Invitation Envelope" style="width: 100%; max-width: 400px; height: auto; border-radius: 15px; display: block;">
          </div>
        </div>
        
        <!-- Closing -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #ecf0f1;">
          <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin: 0;">
            With warm regards,<br>
            <strong style="color: #667eea; font-size: 18px;">${senderName}</strong>
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #2c3e50; padding: 25px 30px; text-align: center; color: #bdc3c7;">
        <p style="margin: 0 0 10px 0; font-size: 14px;">
          ✨ This invitation was created with love ✨
        </p>
        <p style="margin: 0; font-size: 12px; opacity: 0.8;">
          &copy; ${new Date().getFullYear()} Event Invitation. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return { text, html };
};