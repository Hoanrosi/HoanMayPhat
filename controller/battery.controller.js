const Battery = require("../model/Battery");

const BatteryController = {
  create: async (req, res) => {
    try {
      const newBattery = await Battery.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Battery created successfully",
        battery: newBattery,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  getAllBatteries: async (req, res) => {
    try {
      const batteries = await Battery.find();

      return res.status(200).json({
        message: "All batteries fetched successfully",
        batteries: batteries,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  getBatteryById: async (req, res) => {
    try {
      const id = req.params.id;
      const battery = await Battery.findById(id);

      if (battery) {
        return res.status(200).json({
          message: "Battery fetched successfully",
          battery: battery,
        });
      }

      return res.status(404).json({
        message: "Battery not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  updateBattery: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedBattery = await Battery.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (updatedBattery) {
        return res.status(200).json({
          message: "Battery updated successfully",
          battery: updatedBattery,
        });
      }

      return res.status(404).json({
        message: "Battery not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  deleteBattery: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedBattery = await Battery.findByIdAndDelete(id);

      if (deletedBattery) {
        return res.status(200).json({
          message: "Battery deleted successfully",
        });
      }

      return res.status(404).json({
        message: "Battery not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

module.exports = BatteryController;
