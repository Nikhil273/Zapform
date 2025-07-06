const nodemailer = require('nodemailer');
exports.sendEmail = async (to, formData, formtitle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use Mailgun/SendGrid
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      ,
    },
  });

  const htmlBody = Object.entries(formData).map(
    ([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`
  ).join('');


  await transporter.sendMail({
    from: `${formtitle} New form submission`,
    to,
    subject: 'New Form Submission',
    html: htmlBody,
  });
};

