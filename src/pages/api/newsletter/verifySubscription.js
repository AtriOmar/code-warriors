const Subscription = require("@/models/Subscription");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { token } = req.body;
  console.log("body", req.body);

  try {
    await Subscription.update(
      {
        active: true,
      },
      {
        where: {
          token,
        },
      }
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
      from: `Code Warriors <${process.env.EMAIL}>`,
      to: email,
      subject: "Thanks for subscribing to Code Warriors Newsletter",
      html: emailBody(),
      attachments: [
        {
          filename: "logo.png",
          path: "./public/logo.png",
          cid: "unique",
        },
        {
          filename: "facebook-line.png",
          path: "./public/facebook-line.png",
          cid: "unique@fb",
        },
        {
          filename: "instagram-line.png",
          path: "./public/instagram-line.png",
          cid: "ig",
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
  }
}

function emailBody() {
  return `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Thanks for subscribing to our Newsletter</title>
    </head>
    <body>
      <section class="container"">
          <h2>Newsletter subscription</h2>
          <p>Thanks for subscribing to Code Warriors Newsletter</p>
      </section>
    </body>
  </html>
  `;
}
