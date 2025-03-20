const { TITAN_EMAIL, TITAN_PASSWORD, RECIPIENT_EMAIL } = process.env;
import nodemailer from 'nodemailer';

export const sendEmail = async ({ subject, html, attachments }) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      auth: {
        user: TITAN_EMAIL,
        pass: TITAN_PASSWORD
      }
    });

    const mailOptions = {
      from: `Ivy Ready <${TITAN_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject,
      html,
      attachments
    };

    const result = await transport.sendMail(mailOptions);
    return { success: true, message: `Message sent.` }
  } catch (e) {
    // console.error(e);
    return { success: false, error: e.message }
  }
}