export function GenerateVerificationEmailTemplate(
    receiver: { username: string; email: string },
    verificationLink: string
  ) {
    return `
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <p style="color: #555555;">Dear <strong>${receiver.username || ""}</strong>,</p>
          <p style="color: #555555;">Welcome to <strong>${process.env.APP_NAME}</strong>!</p>
          <p style="color: #555555;">To complete your registration and start using your account, please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 20px 0;">
              <a href="${verificationLink}" style="display: inline-block; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
          </div>
  
          <p style="color: #555555;">If the button above does not work, you can copy and paste the following link into your browser:</p>
          
          <p style="color: #555555; word-wrap: break-word;">${verificationLink}</p>
  
          <p style="color: #555555;">This verification link is valid for <strong>24 hours</strong>. If you do not verify your email within this timeframe, you will need to request a new verification link.</p>
          
          <p style="color: #555555;">If you did not create an account with <strong>${process.env.APP_NAME}</strong>, please ignore this email.</p>
          
          <p style="color: #555555;"><strong>Need Help?</strong></p>
          <p style="color: #555555;">If you encounter any issues or have any questions, feel free to reach out to us at <a href="mailto:${process.env.NodeMailer_ID}" style="color: #007BFF; text-decoration: none;">${process.env.NodeMailer_ID}</a>.</p>
  
          <p style="color: #555555;">Best regards,</p>
          <p style="color: #555555;"><strong>${process.env.APP_NAME} Team</strong><br>
          
          <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 30px;">Note: Please do not reply directly to this email, as this inbox is not monitored. For assistance, use the contact details provided above.</p>
      </div>
  </body>
  `;
  }
  