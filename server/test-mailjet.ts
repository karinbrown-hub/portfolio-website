import 'dotenv/config';  // This should match how your dev server loads env vars
import { sendEmail } from "./utils/mail";

async function testMailjet() {
  // First verify the API key is loaded the same way as your dev server
  console.log("MAILJET_API_KEY exists:", !!process.env.MAILJET_API_KEY);
  console.log("API Key length:", process.env.MAILJET_API_KEY?.length || 0);
  console.log("Contains underscore:", process.env.MAILJET_API_KEY?.includes('_'));

  try {
    const result = await sendEmail({
      to: "alexanja464@gmail.com",
      subject: "Mailjet Test Email",
      text: "This is a test email sent at " + new Date().toISOString(),
      html: `
        <h2>Test Email</h2>
        <p>This is a test email sent at ${new Date().toISOString()}</p>
      `
    });

    console.log("Email send result:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testMailjet().catch(console.error);