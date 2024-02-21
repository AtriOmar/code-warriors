const User = require("@/models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { email } = req.body;
  console.log("body", req.body);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("user not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 3600000 * 2; // 1 hour from now
    console.log(resetTokenExpires);

    await User.update(
      {
        resetToken,
        resetTokenExpires,
      },
      { where: { email } }
    );

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
      subject: "Réintialisation de mot de passe Code Warriors",
      html: emailBody(user.username, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`, "1 heure"),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
      res.status(200).send("sent");
    } catch (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
  }
}

function emailBody(name, link, expiration) {
  return `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Réinitialisation de votre mot de passe Code Warriors</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.5;
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
          margin-top: 40px;
          margin-bottom: 20px;
        }
        p {
          margin-top: 0;
          margin-bottom: 20px;
        }
        p:first-of-type{
          text-transform: capitalize;
        }
        a {
          display:block;
          width:fit-content;
          color: #648415 !important;
          background-color: #a5da24;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 150ms;
        }
        a:hover {
          background-color: #97c520;
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
        .logo-name{
        }
        .logo-icon{
          margin-left:10px;
        }
        .logo-container{
          display:flex;
          width:fit-content;
          margin:auto;
          height:50px;
  
        }
      </style>
    </head>
    <body>
      <section class="container"">
          <h2>Réinitialisation de mot de passe</h2>
          <p>Bonjour ${name},</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe sur Code Warriors. Pour accéder à votre compte, veuillez cliquer sur le lien ci-dessous:</p>
          <p><a href="${link}">Réinitialiser votre mot de passe</a></p>
          <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          <p>Cordialement,<br />L'équipe de Code Warriors</p>
          <p class="ps">PS: Ce lien expirera dans ${expiration}. Veuillez le réinitialiser à nouveau si nécessaire.</p>
      </section>
    </body>
  </html>
  `;
}
