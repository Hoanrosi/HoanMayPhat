const express = require("express");
const batteryRouter = express.Router();
const batteryController = require("../controller/battery.controller");

// api/battery/create
batteryRouter.post("/create", batteryController.create);

// api/battery/getallbatteries
batteryRouter.get("/getallbatteries", batteryController.getAllBatteries);

// api/battery/getbattery/:id
batteryRouter.get("/getbattery/:id", batteryController.getBatteryById);

// api/battery/update/:id
batteryRouter.put("/update/:id", batteryController.updateBattery);

// api/battery/update/:id
batteryRouter.put("/update/:id", batteryController.updateBattery);

// api/battery/delete/:id
batteryRouter.post("/delete/:id", batteryController.deleteBattery);

module.exports = batteryRouter;
