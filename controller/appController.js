const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const dotenv = require("dotenv");
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
// const signup = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
//   const message = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bagulaniket03@gmali.com, apbagul03@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>hello aniket</b>", // html body
//   };
//   transporter
//     .sendMail(message)
//     .then((info) => {
//       return res.status(201).json({
//         message: "Email Send",
//         info: info.messageId,
//         preview: nodemailer.getTestMessageUrl(info),
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({ error });
//     });
//   //   res.status(201).json("Signup Succesfully");
// };

const email = (req, res) => {
  const { recipients, subject, body } = req.body;
  const config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: { name: "Mailgen", link: "http://www.mailgen.js" },
  });
  let response = {
    body: {
      intro: body,
    },
  };

  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: recipients,
    subject: subject,
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json("message:Email sent successfully");
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  email,
};
