const { Repair } = require('../models/repair.model');
const { validationResult } = require('express-validator');
const { User } = require('../models/user.model');

const getAllrepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      include: [{ model: User }],
    });
    res.status(200).json({
      repairs,
    });
  } catch (error) {
    console.log(error);
  }
};
const createRepair = async (req, res) => {
  try {
    const { date, computerNumber, comments, userId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map(({ msg }) => msg);

      const errorsMsg = messages.join('. ');

      return res.status(400).json({
        status: 'error',
        messages: errorsMsg,
      });
    }
    const newRepair = await Repair.create({
      date,
      computerNumber,
      comments,
      userId,
    });
    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
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
