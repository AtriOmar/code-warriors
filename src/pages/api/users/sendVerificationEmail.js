import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const saltRounds = 10;

const User = require("@/models/User");

export default async function handler(req, res) {
  const { email, name } = req.body;
  console.log("body", req.body);

  try {
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ["id"],
    });

    const verificationCode = Math.floor(Math.random() * 900000) + 100000 + "";
    const hash = await bcrypt.hash(verificationCode, saltRounds);

    if (user) {
      res.status(400).send("email already used");
      return;
    }

    console.log("-------------------- hash verification code --------------------");
    console.log(hash);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    const mailOptions = {
      from: "Code Warriors <contact@omaratri.online>",
      to: email,
      subject: "Vérification de compte Code Warriors",
      html: verificationEmailBody(name || "Mr/Mme,", verificationCode, "1 heure"),
      attachments: [
        {
          filename: "logo.png",
          path: "./public/logo.png",
          cid: "unique@elcamba.net",
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
      res.status(200).send(hash);
    } catch (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
  }
}

function verificationEmailBody(name, code, expiration) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Vérification de compte ELCAMBA</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          color: #333;
          padding: 20px;
        }
        h1{
          font-size:32px;
          font-weight:bold;
          color:#dc2626;
          text-align:center;
          border-bottom:1px solid #e2e8f0;
          padding-bottom:10px;
          margin:0;
          margin-bottom:20px;
          
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        p {
          margin-top: 0;
          margin-bottom: 20px;
        }
        p:first-of-type{
          text-transform: capitalize;
        }
        .code {
          width:fit-content;
          color: #3b0764;
          background-color: #a855f7;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 150ms;
          margin:10px auto;
        }
        .code:hover {
          background-color: #9333ea;
        }
        .container{
          max-width:600px;
          margin:auto;
          border:1px solid #e2e8f0;
          border-radius:5px;
          padding:50px 30px;
        }
        .logo-container{
          
          position:relative;
          height:50px;
          width:fit-content;
          margin:auto;
  
        }
        .logo-container img{
          width:100%;
          height:100%;
          object-fit:contain;
        }
      </style>
    </head>
    <body>
      <section class="container"">
          <div class="logo-container">
              <img src="cid:unique@elcamba.net"  >
          </div>
          <h2>Code Warriors account verification</h2>
          <p>Hello ${name},</p>
          <p>Welcome to code warriors, to continue creating your account, here is your code:</p>
          <p class="code">${code}</p>
          <p>If you are not trying to create an account, you may ignore this email.</p>
          <p>Best regards,<br/>Code Warriors.</p>
      </section>
    </body>
  </html>
  `;
}
