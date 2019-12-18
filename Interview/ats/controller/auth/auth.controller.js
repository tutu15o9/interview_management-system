const express = require("express");
const login = require("../../model/login.model");
const jwt = require("jsonwebtoken");
const candidate = require("../../model/candidate.model");

module.exports = {
  doLogin: (req, res) => {
    console.log("do login ats");
    let loginInfo = new login(req.body);
    if (!loginInfo) {
      res.status(400).send(" Bad inputs");
    } else {
      login.findOne(
        { email: req.body.email, password: req.body.password },
        (err, user) => {
          if (err) throw err;
          else if (!user) return res.json({ user: null });
          else {
            if (user.role == "candidate") {
              candidate.findById(user.userId, (cerr, candid) => {
                if (cerr) throw cerr;
                let token = jwt.sign(
                  {
                    role: user.role,
                    userId: user.userId,
                    isVerifiedOtp: true,
                    isVerifiedEmail: true
                  },
                  "secretkey",
                  {
                    expiresIn: 86400
                  }
                );
                res.status(200).json({ token: token });
              });
            } else {
              let token = jwt.sign(
                { role: user.role, userId: user.userId },
                "secretkey",
                {
                  expiresIn: 86400
                }
              );
              res.status(200).json({ token: token });
            }
          }
        }
      );
    }
  }
};
