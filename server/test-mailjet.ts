import { sendEmail } from "./utils/mail";

async function testMailjet() {
  console.log("Starting Mailjet test...");
  
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
