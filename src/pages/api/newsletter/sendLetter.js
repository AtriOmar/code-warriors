const Subscription = require("@/models/Subscription");
const User = require("@/models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { body } = req;

  if (!body.subject || !body.body) {
    res.status(400).send("invalid request");
    return;
  }

  if (body.target === "subs") {
    var emails = await Subscription.findAll({
      where: {
        active: true,
      },
      attributes: ["email"],
      raw: true,
    });
  } else {
    var emails = await User.findAll({
      attributes: ["email"],
      raw: true,
    });
  }

  console.log("-------------------- emails --------------------");
  console.log(emails);

  try {
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
      to: emails.map((e) => e.email),
      subject: body.subject,
      html: body.body,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
      res.status(200).send("success");
      return;
    } catch (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
    return;
  }
}
