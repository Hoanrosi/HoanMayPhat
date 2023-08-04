const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");
const userMiddleware = require("../middleware/user.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/uploadImage");

// api/user/account/id
userRouter.get(
  "/account",
  authMiddleware.checkRequired,
  authMiddleware.verifiyToken,
  userController.getUserById
);

// api/user/admin/account/id
userRouter.post(
  "/admin/account/:id",
  authMiddleware.isAdmin,
  userController.getUserById
);

// api/user/update/id
userRouter.put("/update/:id", userController.update);

// api/admin/update/id
userRouter.put(
  "/admin/update/:id",
  authMiddleware.isAdmin,
  userController.update
);

// api/admin/update/face/id
userRouter.put("/admin/update/face/:id", userController.updateFace);

// /api/user/admin/getallusers
userRouter.post(
  "/admin/getallusers/:position",
  authMiddleware.isAdmin,
  userController.getAlls
);

// /api/user/admin/delete/id
userRouter.post(
  "/admin/delete/:id",
  authMiddleware.isAdmin,
  userController.delete
);

// /api/user/create
userRouter.post(
  "/create",
  userMiddleware.checkRequire,
  userMiddleware.checkExist,
  userController.create
);

// /api/user/uploadimg

userRouter.post(
  "/uploadimg/:id",
  upload.single("image"),
  userController.uploadImg
);

module.exports = userRouter;
