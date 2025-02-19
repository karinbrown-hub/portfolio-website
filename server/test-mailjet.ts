import { sendEmail } from "./utils/mail";

async function testMailjet() {
  console.log("Starting Mailjet test...");

  // Test environment variable
  const apiKey = process.env.MAILJET_API_KEY;
  console.log("API Key exists:", !!apiKey);
  if (apiKey) {
    console.log("API Key format check:");
    console.log("- Length:", apiKey.length);
    console.log("- Contains underscore:", apiKey.includes('_'));
    console.log("- First part length:", apiKey.split('_')[0]?.length);
    console.log("- Second part length:", apiKey.split('_')[1]?.length);
  }

  try {
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Mailjet Test Email",
      text: "This is a test email from Mailjet integration",
      html: "<h1>Test Email</h1><p>This is a test email from Mailjet integration</p>"
    });

    if (result) {
      console.log("Test email sent successfully!");
    } else {
      console.log("Failed to send test email.");
    }
  } catch (error) {
    console.error("Error during Mailjet test:", error);
  }
}

testMailjet().catch(console.error);