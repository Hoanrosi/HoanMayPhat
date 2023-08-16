const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const pathSrc = require("../path.js");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const ObjectID = require("mongodb");
const objectID = ObjectID.ObjectId;

const mongoURL = "mongodb+srv://admin:admin@hoan.ral2lga.mongodb.net";
const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "test";
const eatonData = "EATON";
const chlorideData = "CHLORIDE";

const db = client.db(dbName);
const eaton = db.collection(eatonData);
const chloride = db.collection(chlorideData);
const HandleUploadFile = {
  uploadFileEaton: async (req, res) => {
    try {
      const filePath = path.join(pathSrc, req.file.filename);
      const workbook = new ExcelJS.Workbook();

      await workbook.xlsx.readFile(filePath);

      const sheets = workbook.worksheets;

      // Cac cot
      const fields = [
        "Tên Bình",
        "Ngày đo kiểm",
        "Nội trở đo kiểm",
        "Điện áp đo kiểm",
        "Nhiệt độ đo kiểm",
        "Hãng UPS",
        "Tổ ắc quy",
        "Nhà sản xuất",
        "Xuất xứ",
        "Model ắc quy",
        "Thời gian lắp đặt",
        "Số năm sử dụng",
        "Kích thước",
        "Note",
        "Nội trở tiêu chuẩn",
      ];
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
            soNamSuDung: null,
            kichThuoc: null,
            note: null,
            noiTroTieuChuan: null,
          };

          for (let j = 1; j <= actualColumnCount; j++) {
            const cellValue = sheet.getRow(i).getCell(j).value;
            switch (fields[j - 1]) {
              case "Tên Bình":
                obj.name = cellValue;
                break;
              case "Ngày đo kiểm":
                obj.date = cellValue;
                break;
              case "Nội trở đo kiểm":
                obj.noiTro = cellValue;

              case "Điện áp đo kiểm":
                obj.dienApDoKiem = cellValue;
                break;

              case "Nhiệt độ đo kiểm":
                obj.nhietDoDoKiem = cellValue;
                break;

              case "Hãng UPS":
                obj.hang = cellValue;
                break;

              case "Tổ ắc quy":
                obj.toAcQuy = cellValue;
                break;
              case "Nhà sản xuất":
                obj.nsx = cellValue;
                break;

              case "Xuất xứ":
                obj.xuatsu = cellValue;
                break;

              case "Model ắc quy":
                obj.model = cellValue;
                break;

              case "Thời gian lắp đặt":
                obj.thoiGianLap = cellValue;
                break;
              case "Số năm sử dụng":
                obj.soNamSuDung = cellValue;
                break;
              case "Kích thước":
                obj.kichThuoc = cellValue;
                break;
              case "Note":
                obj.note = cellValue;
                break;
              case "Nội trở tiêu chuẩn":
                obj.noiTroTieuChuan = cellValue;
                break;
              default:
                break;
            }
          }
          sheetData.UDP.push(obj);
        }
        const resultData = await eaton.insertOne(sheetData);
      }
      res.json({});
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(200).json({});
    }
  },
  uploadFileChloride: async (req, res) => {
    try {
      console.log("req.file???", req.file);
      const filePath = path.join(pathSrc, req.file.filename);
      const workbook = new ExcelJS.Workbook();

      await workbook.xlsx.readFile(filePath);

      const sheets = workbook.worksheets;

      // Cac cot
      const fields = [
        "Tên Bình",
        "Ngày đo kiểm",
        "Nội trở đo kiểm",
        "Điện áp đo kiểm",
        "Nhiệt độ đo kiểm",
        "Hãng UPS",
        "Tổ ắc quy",
        "Nhà sản xuất",
        "Xuất xứ",
        "Model ắc quy",
        "Thời gian lắp đặt",
        "Số năm sử dụng",
        "Kích thước",
        "Note",
        "Nội trở tiêu chuẩn",
      ];
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
            soNamSuDung: null,
            kichThuoc: null,
            note: null,
            noiTroTieuChuan: null,
          };

          for (let j = 1; j <= actualColumnCount; j++) {
            const cellValue = sheet.getRow(i).getCell(j).value;
            switch (fields[j - 1]) {
              case "Tên Bình":
                obj.name = cellValue;
                break;
              case "Ngày đo kiểm":
                obj.date = cellValue;
                break;
              case "Nội trở đo kiểm":
                obj.noiTro = cellValue;

              case "Điện áp đo kiểm":
                obj.dienApDoKiem = cellValue;
                break;

              case "Nhiệt độ đo kiểm":
                obj.nhietDoDoKiem = cellValue;
                break;

              case "Hãng UPS":
                obj.hang = cellValue;
                break;

              case "Tổ ắc quy":
                obj.toAcQuy = cellValue;
                break;
              case "Nhà sản xuất":
                obj.nsx = cellValue;
                break;

              case "Xuất xứ":
                obj.xuatsu = cellValue;
                break;

              case "Model ắc quy":
                obj.model = cellValue;
                break;

              case "Thời gian lắp đặt":
                obj.thoiGianLap = cellValue;
                break;
              case "Số năm sử dụng":
                obj.soNamSuDung = cellValue;
                break;
              case "Kích thước":
                obj.kichThuoc = cellValue;
                break;
              case "Note":
                obj.note = cellValue;
                break;
              case "Nội trở tiêu chuẩn":
                obj.noiTroTieuChuan = cellValue;
                break;
              default:
                break;
            }
          }
          sheetData.UDP.push(obj);
        }
        const resultData = await chloride.insertOne(sheetData);
      }
      res.json({});
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(200).json({});
    }
  },

  listEaton: async (req, res) => {
    const documents = await eaton.find().toArray();
    res.json(documents);
    return res.status(200);
  },
  listChloride: async (req, res) => {
    const documents = await chloride.find().toArray();
    res.json(documents);
    return res.status(200);
  },
  updateRecordChloride: async (req, res) => {
    const { upsId, id } = req.params;
    const data = req.body;
    const filter = { _id: new objectID(upsId) };
    const result = await chloride.findOne(filter);
    const updateArray = result.UDP || [];
    updateArray.forEach((e) => {
      if (e._id === id) {
        e.noiTro = data.noiTro;
        e.dienApDoKiem = data.dienApDoKiem;
        e.nhietDoDoKiem = data.nhietDoDoKiem;
      }
    });
    const update = {
      $set: {
        UDP: updateArray,
      },
    };
    const element = updateArray.findIndex((e) => e._id === id);
    const updateResult = await chloride.updateOne(filter, update);
    res.json(updateResult);
    return res.status(200).json(element);
  },
  updateRecordEaton: async (req, res) => {
    const { upsId, id } = req.params;
    const data = req.body;
    const filter = { _id: new objectID(upsId) };
    const result = await eaton.findOne(filter);
    const updateArray = result.UDP || [];
    updateArray.forEach((e) => {
      if (e._id === id) {
        e.noiTro = data.noiTro;
        e.dienApDoKiem = data.dienApDoKiem;
        e.nhietDoDoKiem = data.nhietDoDoKiem;
      }
    });
    const update = {
      $set: {
        UDP: updateArray,
      },
    };
    const element = updateArray.findIndex((e) => e._id === id);
    const updateResult = await eaton.updateOne(filter, update);
    res.json(updateResult);
    return res.status(200).json(element);
  },
};

module.exports = HandleUploadFile;
