import { useState } from 'react';

const EmailTemplateGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventTitle: "You're Invited to Our Special Event",
    eventDate: "July 15, 2025",
    eventTime: "6:00 PM - 10:00 PM",
    eventLocation: "The Grand Ballroom, Downtown Center",
    eventAddress: "123 Main Street, City, State 12345",
    rsvpDeadline: "July 10, 2025",
    eventDescription: "Join us for an evening of networking, celebration, and memorable experiences. We're excited to have you be part of this special occasion.",
    additionalInfo: "Dress code: Business casual. Parking is available on-site."
  });

  // Sample data from your modal
  const sendFromInfo = {
    id: 4,
    first_name: "Tuhin ",
    last_name: "Khan",
    email: "tuhin.khan@tetonelectronics.com",
    role: "host"
  };

  const sendToInfo = {
    id: 20,
    first_name: "Md Atiqul",
    last_name: "Islam",
    email: "atiqul.islam@gmail.com",
    phone: "01624354657",
    tags: ["Brother"]
  };

  // Generate RSVP link (you would replace this with your actual RSVP system URL)
  const rsvpLink = `https://your-app.com/rsvp?token=${btoa(JSON.stringify({
    eventId: 'evt_123',
    contactId: sendToInfo.id,
    hostId: sendFromInfo.id,
    email: sendToInfo.email
  }))}`;

  const fullNameSender = `${sendFromInfo.first_name}${sendFromInfo.last_name}`.trim();
  const fullNameRecipient = `${sendToInfo.first_name} ${sendToInfo.last_name}`.trim();



  const htmlEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${eventDetails.eventTitle}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .email-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 30px; }
        .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
        .event-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .event-details h3 { color: #667eea; margin-top: 0; font-size: 20px; }
        .detail-item { display: flex; align-items: center; margin: 10px 0; }
        .detail-icon { width: 20px; height: 20px; margin-right: 10px; color: #667eea; }
        .description { background: #fff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; font-style: italic; }
        .rsvp-section { background: #e8f5e8; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
        .rsvp-button { display: inline-block; background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 16px; margin: 10px 0; }
        .rsvp-button:hover { background: #218838; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
        @media (max-width: 600px) { .email-container { margin: 0; border-radius: 0; } .content { padding: 20px; } }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>${eventDetails.eventTitle}</h1>
        </div>
        <div class="content">
            <div class="greeting">
                Dear ${sendToInfo.first_name},
            </div>
            <p>I hope this email finds you well. I'm delighted to invite you to our upcoming event, and I would be honored to have you join us for this special occasion.</p>
            
            <div class="event-details">
                <h3>Event Details</h3>
                <div class="detail-item">
                    <span class="detail-icon">📅</span>
                    <strong>Date:</strong> ${eventDetails.eventDate}
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🕕</span>
                    <strong>Time:</strong> ${eventDetails.eventTime}
                </div>
                <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <strong>Location:</strong> ${eventDetails.eventLocation}
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🏢</span>
                    <strong>Address:</strong> ${eventDetails.eventAddress}
                </div>
            </div>

            <div class="description">
                ${eventDetails.eventDescription}
            </div>

            <p><strong>Additional Information:</strong> ${eventDetails.additionalInfo}</p>

            <div class="rsvp-section">
                <h3 style="color: #28a745; margin-top: 0;">RSVP Required</h3>
                <p>Please confirm your attendance by <strong>${eventDetails.rsvpDeadline}</strong></p>
                <a href="${rsvpLink}" class="rsvp-button">RSVP Now</a>
                <p style="font-size: 12px; margin-top: 15px; color: #666;">
                    Or copy this link: <br>
                    <code style="background: #f1f1f1; padding: 2px 4px; border-radius: 3px; font-size: 11px;">${rsvpLink}</code>
                </p>
            </div>

            <div class="signature">
                <p>If you have any questions or need additional information, please don't hesitate to reach out to me directly.</p>
                <p>I'm looking forward to seeing you there!</p>
                <p><strong>Best regards,</strong><br>
                ${fullNameSender}<br>
                <a href="mailto:${sendFromInfo.email}">${sendFromInfo.email}</a></p>
            </div>
        </div>
        <div class="footer">
            <p>This invitation was sent to ${sendToInfo.email}</p>
            <p>If you cannot attend, please let us know as soon as possible.</p>
        </div>
    </div>
</body>
</html>`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">

      {/* Preview */}
      {previewMode && (
        <div className="p-4 mb-6">
          {/* <h3 className="text-lg font-semibold mb-4">HTML Email Preview</h3> */}
          <div
            className="border border-gray-200 rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: htmlEmailTemplate }}
          />
        </div>
      )}
    </div>
  );
};

export default EmailTemplateGenerator;