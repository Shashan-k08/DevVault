var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const sendMail = async (email, subject, message) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_GMAIL_USER,
        pass: process.env.SMTP_GMAIL_PASS,
      },
    })
  );

  var mailOptions = {
    from: "DevVault",
    to: email,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
