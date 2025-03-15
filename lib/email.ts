import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`;

    await resend.emails.send({
      from: "no-reply@robovolts.com",
      to,
      subject: "Verify Your Email - RoboVolts",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
}
