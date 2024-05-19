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
      from: `Code Warriors <${process.env.EMAIL}>`,
      to: sub.email,
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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title></title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        font-family: "Poppins", sans-serif !important;
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 24px;
        color: #8094ae;
        font-weight: 400;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
        font-family: "Poppins", sans-serif !important;
      }

      a {
        text-decoration: none;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      .container {
        background: linear-gradient(50deg, #302072 0%, #26143e 100%, #a559ab 100%);
      }

      .code {
        padding: 5px 10px;
        margin-inline: 10px;
        border-radius: 5px;
        background: #4f38ac;
        color: white;
        font-weight: bold;
        font-size: 16px;
      }
    </style>
  </head>

  <body width="100%" style="margin: 0; padding: 0 !important">
    <div style="width: 100%" class="container">
      <div style="max-width: 600px; width: 100%; margin: auto; padding: 40px 0">
        <div style="margin: auto; padding-bottom: 5px; width: 100px; height: 60px">
          <img src="cid:unique" alt="" style="height: 100%; width: 100%; object-fit: contain" />
        </div>

        <div class="width:100%; max-width:600px; margin:0 auto;">
          <div style="text-align: center; padding: 30px 30px 20px">
            <h5 style="margin-bottom: 24px; color: #c6d1e6; font-size: 20px; font-weight: 400; line-height: 28px; text-transform: capitalize">
              Hello Warrior,
            </h5>
            <p style="margin-bottom: 10px; color: #c6d1e6; font-size: 16px">
              Thank you for subscribing to the Code Warriors newsletter! We're thrilled to have you onboard and to keep you informed about the latest updates,
              promotions, and exclusive content.
            </p>
            <p style="margin-bottom: 10px; color: #c6d1e6">
              Best regards,<br />
              Code Warriors
            </p>
          </div>
        </div>
        <div style="width: 100%; max-width: 620px; margin: 0 auto">
          <div style="text-align: center; padding: 20px 20px 0">
            <p style="font-size: 13px; color: white">Copyright © 2024 Code Warriors. All rights reserved.</p>
            <ul style="margin: 10px -4px 0; padding: 0">
              <li style="display: inline-block; list-style: none; padding: 4px">
                <a
                  style="display: inline-block; height: 30px; width: 30px; border-radius: 50%; background-color: #ffffff"
                  href="https://www.facebook.com/enetcomje"
                  ><img style="width: 25px; height: 25px; padding: 2px" src="cid:unique@fb" alt="brand"
                /></a>
              </li>
              <li style="display: inline-block; list-style: none; padding: 4px">
                <a
                  style="display: inline-block; height: 30px; width: 30px; border-radius: 50%; background-color: #ffffff"
                  href="https://www.instagram.com/enetcomjunior/"
                  ><img style="width: 25px; height: 25px; padding: 2px" src="cid:ig" alt="brand"
                /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>


  `;
}
