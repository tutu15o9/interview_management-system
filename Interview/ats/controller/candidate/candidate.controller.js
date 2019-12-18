const jwt = require("jsonwebtoken");
const path = require("path");
const Candidate = require("../../model/candidate.model");
const Login = require("../../model/login.model");
const Otp = require("../../model/otp.model");
const Email = require("../../model/email.model");
const Request = require("request");
const randomstring = require("randomstring");
const emailServ = require("../../playground/sendgrid.playground");
const key = require("../../key");

module.exports = {
  signup: (req, res) => {
    console.log("BODY CONT", req.body);

    let userInfo = new Candidate({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      experienceMonth: req.body.experienceMonth,
      experienceYear: req.body.experienceYear,
      employeer: req.body.employeer ? req.body.employeer : [],
      educational: req.body.educational ? req.body.educational : []
    });
    if (!userInfo) {
      return alert("invalid details");
    } else {
      jwt.sign(
        { userInfo },
        "secretkey",
        { expiresIn: 86400 },
        async (err, token) => {
          await userInfo.save(err => {
            if (err) throw err;
            else {
              let login = new Login();
              login.email = req.body.email;
              login.password = req.body.password;
              login.role = "candidate";
              login.userId = userInfo._id;
              login.save((err, res) => {
                if (err) throw err;
              });

              res.status(200).json(userInfo);
            }
          });
        }
      );
    }
  },
  addCandidateFiles: (req, res) => {
    if (req.files.defaultResumeLink) {
      if (req.files.defaultResumeLink.length > 0) {
        Candidate.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: {
              defaultResumeLink: req.files.defaultResumeLink[0].filename,
              video: req.files.video[0].filename
            }
          },
          { new: true },
          (err, data) => {
            if (err) throw err;
            else console.log("Resume Updated");
            res.json(data);
          }
        );
      }
    }
  },
  myProfile: (req, res) => {
    Candidate.findById(req.params.candidateId, (err, data) => {
      if (err) throw err;
      else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  },
  getFile: (req, res) => {
    res.sendFile(
      path.resolve(`${__dirname}/../../assets/${req.params.filename}`)
    );
  },
  createOtp: (req, res) => {
    let valueOtp = Math.floor(100000 + Math.random() * 900000);
    let otpInfo = new Otp({
      userId: req.body.userId,
      role: req.body.role,
      timestamp: Date.now(),
      valueOtp: valueOtp,
      type: req.body.type,
      expiry: ""
    });

    // send message on user phone
    Candidate.findById(req.body.userId, (err, candid) => {
      if (err) throw err;
      console.log("Heyyyy..key   ..");
      console.log("Heyyyyy..key   ..",candid);
      console.log("Hey val ",valueOtp);
      // Request.get(`${key.otp}${candid.phoneNumber}/${valueOtp}`, (err, msg) => {
      //   if (err) throw err;
      //   console.log("Message Sent");
      // });
    });

    otpInfo.save((err, data) => {
      if (err) throw err;
      else console.log("otp generated");
      res.status(200).send({ data });
    });
  },
  createEmail: (req, res) => {
    let token = randomstring.generate();
    let emailInfo = new Email({
      userId: req.body.userId,
      token: token,
      isActive: true
    });
    Candidate.findById(req.body.userId, (err, data) => {
      if (err) throw err;
      else {
        console.log("Sending email");
        //send email
        let link = `http://localhost:4200/emailverify/${token}`;
        emailServ.sendEmail(data.email, link);
        emailInfo.save((nerr, emailData) => {
          if (nerr) throw nerr;
          else {
            res.status(200).json({ status: "true" });
          }
        });
      }
    });
  },
  matchEmail: (req, res) => {
    Email.findOne({ token: req.params.id }, (err, data) => {
      if (err) throw err;
      if (data === null) {
        status = false;
        res.status(200).send({ status: status });
      } else {
        Candidate.findByIdAndUpdate(
          data.userId,
          { $set: { isVerifiedEmail: true } },
          { new: true },
          (nerr, result) => {
            if (nerr) throw nerr;
            else {
              console.log("Email matched");
              console.log(result);
              res.status(200).json({ status: "true" });
            }
          }
        );
      }
    });
  },
  matchOtp: (req, res) => {
    Otp.findOne(
      { userId: req.params.candidateId, valueOtp: req.params.otp },
      (err, data) => {
        if (err) throw err;
        let status = "true";

        if (data === null) {
          status = "false";
          res.status(200).send({ status: status });
        } else {
          Candidate.findByIdAndUpdate(
            req.params.candidateId,
            {
              $set: { isVerifiedOtp: true }
            },
            { new: true },
            (err, saved) => {
              res.status(200).send({ status: status });
            }
          );
        }
      }
    );
  }
};
// const express = require("express");

// const Candidate = require("../../model/candidate.model");

// module.exports = {
//   signup: (req, res) => {
//     let user = req.body;
//     console.log(user);
//     let candidate = new Candidate(user);
//     candidate.save((err, res) => {
//       if (err) throw err;
//       else console.log(res);
//     });
//     res.send("Done");
//   }
// };
