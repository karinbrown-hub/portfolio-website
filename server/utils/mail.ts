import Mailjet from 'node-mailjet';

if (!process.env.MAILJET_API_KEY) {
  throw new Error("MAILJET_API_KEY environment variable must be set");
}

// Split API key into key and secret (Mailjet API key format: KEY_SECRET)
const [apiKey, apiSecret] = process.env.MAILJET_API_KEY.split('_');

const mailjet = new Mailjet({
  apiKey: apiKey,
  apiSecret: apiSecret || '' // Fallback to empty string if no secret
});

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "contact@example.com", // Replace with your verified sender
            Name: "Portfolio Contact Form"
          },
          To: [
            {
              Email: params.to,
            }
          ],
          Subject: params.subject,
          TextPart: params.text,
          HTMLPart: params.html || params.text
        }
      ]
    });

    return result.response.status === 200;
  } catch (error) {
    console.error('Mailjet email error:', error);
    return false;
  }
}