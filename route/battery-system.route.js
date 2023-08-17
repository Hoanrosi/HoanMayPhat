const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controller/battery-system.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/upload-file-chloride",
  upload.single("excelFile"),
  controller.uploadFileChloride
);
router.post(
  "/upload-file-eaton",
  upload.single("excelFile"),
  controller.uploadFileEaton
);

router.get("/ups/eaton", controller.listEaton);
router.get("/ups/chloride", controller.listChloride);

router.put("/ups/chloride/:upsId/udp/:id", controller.updateRecordChloride);
router.put("ups/eaton/:upsId/udp/:id", controller.updateRecordEaton);
module.exports = router;
