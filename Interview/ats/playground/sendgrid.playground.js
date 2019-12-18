const sgMail = require("@sendgrid/mail");
const key = require("../key");

sgMail.setApiKey(key.email);
module.exports = {
  sendEmail: (receiver, link) => {
    //link contains detail in case of interviewer
    let info = "";
    info = `Password: ${link.password} \n You are added as an Interviewer in ${
      link.category
    } Department at ${
      link.designation
    } Position \n Use this email to login \n Do Not Share this password`;
    const msg = {
      to: receiver,
      from: "support@atsgem.in",
      subject: "Ats Support",
      text: info
    };
    sgMail.send(msg, (err, res) => {
      if (err) console.log(err);
      console.log(res);
    });
  }
};
