const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const batteryRouter = require("./battery.route");
const batterySystemRouter = require("./battery-system.route");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/battery", batteryRouter);
router.use("/battery-system", batterySystemRouter);

module.exports = router;
