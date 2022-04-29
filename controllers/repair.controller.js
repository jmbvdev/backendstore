const { Repair } = require('../models/repair.model');

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

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });
    res.status(200).json({ repair });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const repair = await Repair.update(
      { status: 'completed' },
      { where: { id } }
    );
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });
    await repair.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllrepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
