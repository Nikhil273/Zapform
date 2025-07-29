const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, formData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      ,
    },
  });


  let htmlBody = '';
  if (typeof formData === 'object') {
    htmlBody = Object.entries(formData).map(
      ([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`
    ).join('');
  }

  await transporter.sendMail({
    from: `Zapform : New Form Submission <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlBody ? htmlBody : undefined,
    text: typeof formData === 'string' ? formData : undefined,
  });
};

