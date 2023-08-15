const { log } = require("console");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const pathSrc = require("../path.js");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const mongoURL = "mongodb+srv://admin:admin@hoan.ral2lga.mongodb.net";
const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "test";
const collectionName = "EATON";

const db = client.db(dbName);
const collection = db.collection(collectionName);

const HandleUploadFile = {
  uploadFile: async (req, res) => {
    try {
      console.log(pathSrc);

      const filePath = path.join(pathSrc, req.file.filename);

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const sheets = workbook.worksheets;

      // Cac cot
      const fileds = [
        "name",
        "date",
        "noiTro",
        "dienApDoKiem",
        "nhietDoDoKiem",
        "hang",
        "toAcQuy",
        "nsx",
        "xuatsu",
        "model",
        "thoiGianLap",
      ];
      const data = [];
      for (let sheet of sheets) {
        const actualColumnCount = sheet.actualColumnCount;
        const actualRowCount = sheet.actualRowCount;
        const sheetData = {
          sheetName: sheet.name,
          UDP: [],
        };
        for (let i = 2; i <= actualRowCount; i++) {
          // Obj muon tao ra trong DB
          const obj = {
            _id: uuidv4(),
            name: null,
            date: null,
            noiTro: null,
            dienApDoKiem: null,
            nhietDoDoKiem: null,
            hang: null,
            toAcQuy: null,
            nsx: null,
            xuatsu: null,
            model: null,
            thoiGianLap: null,
          };

          for (let j = 1; j <= actualColumnCount; j++) {
            const cellValue = sheet.getRow(i).getCell(j).value;
            switch (fileds[j - 1]) {
              case "name":
                obj.name = cellValue;
                break;
              case "date":
                obj.date = cellValue;
                break;
              case "noiTro":
                obj.noiTro = cellValue;

              case "dienApDoKiem":
                obj.dienApDoKiem = cellValue;
                break;

              case "nhietDoDoKiem":
                obj.nhietDoDoKiem = cellValue;
                break;

              case "hang":
                obj.hang = cellValue;
                break;

              case "toAcQuy":
                obj.toAcQuy = cellValue;
                break;
              case "nsx":
                obj.nsx = cellValue;
                break;

              case "xuatsu":
                obj.xuatsu = cellValue;
                break;

              case "model":
                obj.model = cellValue;
                break;

              case "thoiGianLap":
                obj.thoiGianLap = cellValue;
                break;
              default:
                break;
            }
          }
          sheetData.UDP.push(obj);
        }
        const insertResult = await collection.insertOne(sheetData);
      }
      res.json({});
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(200).json({});
    }
  },

  list: async (req, res) => {
    const documents = await collection.find().toArray();
    res.json(documents);
    return res.status(200);
  },

  updateRecord: async (req, res) => {
    const documentId = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectID(documentId) };
    const update = {
      $set: {
        noiTro: data.noiTro,
        dienApDoKiem: data.dienApDoKiem,
        nhietDoDoKiem: data.nhietDoDoKiem,
      },
    };
    const updateResult = await collection.updateOne(filter, update);
    res.json(updateResult);
    return res.status(200);
  },
};

module.exports = HandleUploadFile;
