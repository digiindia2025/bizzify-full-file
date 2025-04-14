import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ya aapka SMTP service (SendGrid, Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
