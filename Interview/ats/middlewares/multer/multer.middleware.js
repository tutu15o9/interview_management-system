let multer = require("multer");
let path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../../assets/`);
  },
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname)
      ? `${path.extname(file.originalname)}`
      : ``;
    console.log("BODY", req.body);
    callback(null, `${Date.now()}${ext}`);
  }
});
let upload = multer({
  storage: storage
});

module.exports = {
  candidateUploads: upload.fields([
    {
      name: "defaultResumeLink",
      maxCount: 1
    },
    {
      name: "video",
      mxCount: 1
    }
  ])
};
