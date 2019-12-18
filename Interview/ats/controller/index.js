const express = require("express");
const router = express.Router();

let authRouter = require("./auth/index");
let jobRouter = require("./job/index");
let candidateRouter = require("./candidate/index");
let scheduleRouter = require("./schedule/index");
let interviewerRouter = require("./interviewer/index");
let adminRouter = require("./admin/index");
let genreRouter = require("./genre/index");
let applyRouter = require("./apply/index");

router.use("/auth", authRouter);
router.use("/job", jobRouter);
router.use("/candidate", candidateRouter);
router.use("/schedule", scheduleRouter);
router.use("/interviewer", interviewerRouter);
router.use("/admin", adminRouter);
router.use("/genre", genreRouter);
router.use("/apply", applyRouter);

module.exports = router;
