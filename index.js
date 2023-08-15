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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

