import Navbar from "@/components/Navbar";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function index({ status }) {
  return (
    <div>
      <Navbar />
      <div className="fixed inset-0 grid place-items-center">
        <div>
          {status === "success" ? (
            <div className="p-10 rounded-2xl shadow-[0_0_5px_rgb(0,0,0,.3)]">
              <i className="block text-center">
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-[100px] text-purple" />
              </i>
              <p className="mt-10 font-bold text-xl">Thanks for subscribing to our newsletter</p>
            </div>
          ) : (
            <div className="p-10 rounded-2xl shadow-[0_0_5px_rgb(0,0,0,.3)]">
              <i className="block text-center">
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-[100px] text-red-500" />
              </i>
              <p className="mt-10 font-bold text-xl">Sorry, we can't recognize this token</p>
            </div>
          )}
        </div>
      </div>
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
      sub.active = true;

      await sub.save();

      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }

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
