const Subscription = require("@/models/Subscription");
const User = require("@/models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { body } = req;

  if (!body.name || !body.email || !body.message) {
    res.status(400).send("invalid request");
    return;
  }

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

    const subject = `New message from ${body.name}`;

    const mailOptions = {
      from: `Code Warriors <${process.env.EMAIL}>`,
      to: process.env.COMPANY_EMAIL,
      subject: subject,
      html: emailBody(body.name, body.email, body.phone, body.message),
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

function emailBody(name, email, phone, message) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Message Notification</title>
  <style>
      /* Reset some default styling */
      body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          line-height: 1.6;
      }
      
      /* Styling for the email container */
      .email-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
      }
  
      /* Styling for the header */
      .header {
          text-align: center;
          margin-bottom: 20px;
      }
  
      /* Styling for the content */
      .content {
          color: #333;
      }
  
      /* Styling for the message details */
      .message-details {
          margin-top: 20px;
      }
  
      /* Styling for the message details labels */
      .label {
          font-weight: bold;
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
  <div class="email-container">
      <div class="content">
            <div class="logo-container">
              <img src="cid:unique@elcamba.net"  >
          </div>
          <p>You have received a new message from:</p>
          <div class="message-details">
              <p><span class="label">Name:</span> ${name}</p>
              <p><span class="label">Phone:</span> ${phone}</p>
              <p><span class="label">Email:</span> ${email}</p>
              <p><span class="label">Message:</span> ${message}</p>
          </div>
      </div>
  </div>
  </body>
  </html>
  
    `;
}
