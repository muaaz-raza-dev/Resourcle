import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NodeMailer_ID,
    pass: process.env.NodeMailer_pass,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function SendMail(
  receiver: { username: string; email: string },
  htmlTemplate: string,
  title?: string,
) {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"Muaaz Raza" <yourssharky@gmail.com>', // sender address
      to: receiver.email, // list of receivers
      subject: title || " Your One-Time Password (OTP) for Secure Access", // Subject line
      html: htmlTemplate, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
