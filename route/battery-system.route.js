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

router.post("/upload-file", upload.single("excelFile"), controller.uploadFile);
router.get("/", controller.list);
router.put("/:id", controller.updateRecord);

module.exports = router;
