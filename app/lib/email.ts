import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, code: string) {
  try {
    await resend.emails.send({
      from: "no-reply@robovolts.com",
      to,
      subject: "Verify Your Email",
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
