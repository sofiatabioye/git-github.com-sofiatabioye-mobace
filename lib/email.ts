import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(to: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`;

  const message = {
    to,
    from: "no-reply@yourapp.com",
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  await sendgrid.send(message);
}
