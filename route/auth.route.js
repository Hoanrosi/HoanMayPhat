const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userMiddleware = require("../middleware/user.middleware");
// api/auth/login
authRouter.post(
    "/login",
    userMiddleware.checkRequiredLogin,
    authController.login,
);
// api/auth/logout
authRouter.post(
    "/logout",
    authMiddleware.checkRequired,
    authMiddleware.verifiyToken,
    authController.logout,
);
authRouter.post(
    "/refresh-token",
    authMiddleware.checkRequired,
    // authMiddleware.verifiyRFToken,
    authController.refreshToken,
);

module.exports = authRouter;
