import React from "react";

export default function index({ status }) {
  return (
    <div className="fixed inset-0 grid place-items-center">
      <h1 className="text-2xl font-bold">{status === "success" ? "You have successfully subscribed!" : "Invalid token"}</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const Subscription = require("@/models/Subscription");
  const nodemailer = require("nodemailer");

  const token = context.params.token;

  const sub = await Subscription.findOne({
    where: { token },
  });

  if (!sub) {
    return {
      props: {
        status: "invalid token",
      },
    };
  }

  if (!sub.active) {
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
      to: sub.email,
      subject: "Thanks for subscribing to Code Warriors Newsletter",
      html: emailBody(),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }

  sub.active = true;

  await sub.save();

  return {
    props: {
      status: "success",
    },
  };
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
