const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

module.exports = {
  postEmail: (req, res) => {
    const EMAIL = process.env.EMAIL;
    let mailOptions = new (function () {
      this.to = ["munasikataupn@gmail.com", EMAIL];
      this.from = EMAIL;
      this.subject = `${req.body.title}`;
      this.html = `<h3>Selamat siang panitia munas,</h3>
                  <p>Anda mendapat pesan dari,</p>
                  <p>Nama : ${req.body.username}</p>
                  <p>Email : ${req.body.email}</p>
                  <p>Pesan : ${req.body.message}</p>
                  <p>Harap panitia untuk membalas pesan ini.</p>
                  <p>Terima kasih</p>`;
    })();

    let mailOptionsSender = new (function () {
      this.to = req.body.email;
      this.from = EMAIL;
      this.subject = `${req.body.title}`;
      this.html = `<h3>Terimakasih sudah menghubungu panitia MUNAS IKATA 2021 </h3>
                  <p>Pesan anda akan kami teruskan ke bagian kepanitiaan terkait</p>
                  <p>Terima kasih</p>`;
    })();

    const PASSWORD = process.env.PASSWORD;

    let transporter = nodemailer.createTransport({
      host: "dci02.dewaweb.com",
      port: 465,
      secureConnection: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        secureProtocol: "TLSv1_method",
      },
    });

    transporter.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.json({
          status: "fail",
        });
      } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
      }
    });

    let transporterSender = nodemailer.createTransport({
      host: "dci02.dewaweb.com",
      port: 465,
      secureConnection: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        secureProtocol: "TLSv1_method",
      },
    });

    transporterSender.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });

    transporterSender.sendMail(mailOptionsSender, function (err, data) {
      if (err) {
        res.json({
          status: "fail",
        });
      } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
      }
    });
  },
};
