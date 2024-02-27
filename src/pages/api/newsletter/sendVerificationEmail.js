const Subscription = require("@/models/Subscription");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { email } = req.body;
  console.log("body", req.body);

  try {
    const token = crypto.randomBytes(20).toString("hex");

    await Subscription.create({
      email,
      token,
      active: false,
    });

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
      subject: "Subscription to Code Warriors Newsletter",
      html: emailBody(`${process.env.FRONTEND_URL}/newsletter/${token}`, "1 heure"),
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

function emailBody(link, expiration) {
  return `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Subscription to Code Warriors Newsletter</title>
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
          color: white !important;
          background-color: #6600ff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 150ms;
        }
        a:hover {
          background-color: #4700b3;
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
          <h2>Newsletter subscription</h2>
          <p>Hello,</p>
          <p>Vous avez demandé à rejoindre la Newsletter de Code Warriors. Pour confirmer, veuillez cliquer sur le lien ci-dessous:</p>
          <p><a href="${link}">Subscribe</a></p>
          <p>Si vous n'avez pas demandé ça, veuillez ignorer cet email.</p>
          <p>Cordialement,<br />L'équipe de Code Warriors</p>
          <p class="ps">PS: Ce lien expirera dans ${expiration}. Veuillez le réinitialiser à nouveau si nécessaire.</p>
      </section>
    </body>
  </html>
  `;
}
