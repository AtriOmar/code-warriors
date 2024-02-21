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
      <title>Vérification de compte Code Warriors</title>
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
          color:#7c3aed;
          text-align:center;
          border-bottom:1px solid #e2e8f0;
          padding-bottom:10px;
          margin:0;
          margin-bottom:20px;
          
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 0;
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
          color: #4c1d95;
          background-color: #8b5cf6;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 150ms;
          margin-inline:auto;
        }
        .code:hover {
          background-color: #facc15;
        }
        .ps {
          font-size: 12px;
          margin-top: 20px;
        }
        .container{
          max-width:600px;
          margin:auto;
          border:1px solid #e2e8f0;
          border-radius:5px;
          padding:50px 30px;
        }
      </style>
    </head>
    <body>
      <section class="container"">
          <h1>Code Warriors</h1>
          <h2>Vérification de compte Code Warriors</h2>
          <p>Bonjour ${name},</p>
          <p>Pour compléter la création de votre compte Code Warriors, voici votre code:</p>
          <p class="code">${code}</p>
          <p>Si vous n'avez pas essayer de créer un compte, veuillez ignorer cet email.</p>
          <p>Cordialement,<br />L'équipe de Code Warriors</p>
          <p class="ps">PS: Ce lien expirera dans ${expiration}. Veuillez le réinitialiser à nouveau si nécessaire.</p>
      </section>
    </body>
  </html>
  `;
}
