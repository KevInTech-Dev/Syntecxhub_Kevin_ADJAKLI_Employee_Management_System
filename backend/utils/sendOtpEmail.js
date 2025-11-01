
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Employee Management System" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your One-Time Password (OTP) – Employee Management System',
    text: `
Hello,

Welcome to the Employee Management System!

Your 6-digit verification code is: ${otp}

Please enter this code in the verification form to complete your registration. 
⚠️ This code will expire in 5 minutes for security reasons.

If you did not request this code, please ignore this email.

Thank you,  
The Employee Management System Team
    `.trim(),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
