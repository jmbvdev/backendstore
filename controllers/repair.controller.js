const { Repair } = require("../models/repair.model");

const getAllrepairs = async (req, res) => {
  const repairs = await Repair.findAll();
  res.status(200).json({
    repairs,
  });
};
const createRepair = async (req, res) => {
  const { date, userId } = req.body;
  const newRepair = Repair.create({ date, userId });
  res.status(201).json({
    newRepair,
  });
};

module.exports = { getAllrepairs, createRepair };
