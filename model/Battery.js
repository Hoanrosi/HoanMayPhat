const mongoose = require("mongoose");

// Define the Battery schema
const batterySchema = new mongoose.Schema({
  Time: { type: String, required: true },
  SKU: { type: String, required: true },
  Area: { type: String, required: true },
  ModelName: { type: String, required: true },
  Producer: { type: String, required: true },
  Origin: { type: String, required: true },
  Type: { type: String, required: true },
  Size: { type: String, required: true },
  ParameterAccu: [
    {
      Voltage: { type: String, required: true },
      Resistor: { type: String, required: true },
      Time: { type: String, required: true },
    },
  ],
  SafeThreshold: [
    {
      Voltage: { type: String, required: true },
      Resistor: { type: String, required: true },
      Time: { type: String, required: true },
    },
  ],
  Note: { type: String, required: true },
});

// Create the Battery model
const Battery = mongoose.model("Battery", batterySchema);

module.exports = Battery;
