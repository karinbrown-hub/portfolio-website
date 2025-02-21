import Mailjet from 'node-mailjet';

console.log("MAILJET_API_KEY:", process.env.MAILJET_API_KEY);

if (!process.env.MAILJET_API_KEY) {
  throw new Error("MAILJET_API_KEY environment variable must be set");
}

const MAILJET_API_KEY = process.env.MAILJET_API_KEY.trim();


console.log("Raw API key length:", MAILJET_API_KEY.length);
console.log("Contains underscore:", MAILJET_API_KEY.includes('_'));
console.log("First few chars:", MAILJET_API_KEY.substring(0, 5));

// Validate key format
if (!MAILJET_API_KEY.includes('_')) {
  throw new Error("MAILJET_API_KEY must be in format: API_KEY_API_SECRET (contains underscore)");
}

// Split API key into key and secret parts
const [apiKey, apiSecret] = MAILJET_API_KEY.split('_');

if (!apiKey || !apiSecret) {
  throw new Error(`Invalid MAILJET_API_KEY format. Expected format: API_KEY_API_SECRET, got key length: ${apiKey?.length || 0}, secret length: ${apiSecret?.length || 0}`);
}

console.log(`API Key length: ${apiKey.length}, Secret length: ${apiSecret.length}`);

const mailjet = new Mailjet({
  apiKey,
  apiSecret
});

console.log("Mailjet client initialized successfully");

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    console.log("Attempting to send email to:", params.to);

    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "alexanja464@gmail.com",
            Name: "Portfolio Contact Form"
          },
          To: [
            {
              Email: "karinlawrencebrown@gmail.com",
            }
          ],
          Subject: params.subject,
          TextPart: params.text,
          HTMLPart: params.html || params.text
        }
      ]
    });

    console.log("Email sent successfully, status:", result.response.status);
    return result.response.status === 200;
  } catch (error) {
    console.error('Mailjet email error:', error);
    return false;
  }
}  /// 