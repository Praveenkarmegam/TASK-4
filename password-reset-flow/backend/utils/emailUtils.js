const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Password Reset Request",
    text: `Please use the following token to reset your password: ${token}`,
  };

  return transporter.sendMail(message);
};

module.exports = { sendPasswordResetEmail };
