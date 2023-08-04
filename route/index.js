const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const batteryRouter = require("./battery.route");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/battery", batteryRouter);

module.exports = router;
