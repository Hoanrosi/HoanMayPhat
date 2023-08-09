require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const multer = require("multer");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./route/index");
const { kStringMaxLength } = require("buffer");
const url = process.env.URL;
const upload = multer({ dest: "uploads/" });
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);
// Define mongoose schema and model
const DataModel = mongoose.model("Data", {
  UPS: [
    {
      "Tên Bình": String,
      "Ngày đo kiểm": String,
      "Nội trở đo kiểm": Number,
      "Điện áp đo kiểm": Number,
      "Nhiệt độ đo kiểm": Number,
      "Hãng UPS": String,
      "Tổ ắc quy": String,
      "Nhà sản xuất": String,
      "Xuất xứ": String,
      "Model ắc quy": String,
      "Thời gian lắp đặt": String,
      "Số năm sử dụng": Number,
      "Kích thước (mm)": String,
    },
  ],
});

app.post("/upload", upload.single("excel"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);

    const upSheets = ["UPS1", "UPS 2", "UPS 3", "UPS 4"];

    const allSheetData = {};

    upSheets.forEach((sheetName) => {
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const newData = new DataModel({
        UPS: sheetData,
      });
      newData.save();
    });

    // const newData = new DataModel({
    //   UPS: upSheets.map((sheetName) => ({
    //     data: allSheetData[sheetName],
    //   })),
    // });

    // await newData.save();

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during data import" });
  }
});

app.get("/get-all-data", async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!?");
});

http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
