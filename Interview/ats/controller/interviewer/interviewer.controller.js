const Interviewer = require("../../model/interviewer.model");
allInterviewer = [];
module.exports = {
  getInterviewer: (req, res) => {
    Interviewer.find(
      { category: req.params.category, designation: req.params.designation },
      (err, data) => {
        if (err) throw err;
        else allInterviewer = data;

        res.status(200).send(allInterviewer);
      }
    );
  }
};
