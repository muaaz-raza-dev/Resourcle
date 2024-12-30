export function GenerateHTMLTemplate(
  receiver: { username: string; email: string },
  OTP: string,
  authToken?: string,
) {
  return `
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <p style="color: #555555;">Dear <strong>${receiver.username || ""}</strong>,</p>
        <p style="color: #555555;">We hope this message finds you well.</p>
        <p style="color: #555555;">To enhance the security of your account, we have generated a One-Time Password (OTP) for you. Please use the following OTP to complete your authentication process:</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">${OTP}</span>
        </div>

        <p style="color: #555555;">Alternatively, you can skip entering the OTP and click the link below to log in automatically:</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.APP_URL}/auth/verify-token?token=${authToken}" style="display: inline-block; font-size: 16px; color: #ffffff; background-color: #28A745; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Login Instantly</a>
        </div>

        <p style="color: #555555;">This link is valid for <strong>60 minutes</strong> and can only be used once. For your security, please do not share this link with anyone. If you did not request this, please ignore this email.</p>
        
        <p style="color: #555555;"><strong>Need Help?</strong></p>
        <p style="color: #555555;">If you encounter any issues or have any questions, feel free to reach out to us at <a href="mailto:${process.env.NodeMailer_ID}" style="color: #007BFF; text-decoration: none;">${process.env.NodeMailer_ID}</a>.</p>

        <p style="color: #555555;">Best regards,</p>
        <p style="color: #555555;"><strong>${process.env.APP_NAME} Bot</strong><br>
        <strong>${process.env.APP_NAME}l</strong><br>
        
        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 30px;">Note: Please do not reply directly to this email, as this inbox is not monitored. For assistance, use the contact details provided above.</p>
    </div>
</body>
`;
}
