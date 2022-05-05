const { Repair } = require('../models/repair.model');
const { validationResult } = require('express-validator');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');

const getAllrepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    include: [{ model: User }],
  });
  res.status(200).json({
    repairs,
  });
});
const createRepair = catchAsync(async (req, res, next) => {
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
   await res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id } });
  res.status(200).json({ repair });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const repair = await Repair.update(
    { status: 'completed' },
    { where: { id } }
  );
  res.status(200).json({ status: 'success' });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id } });
  await repair.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllrepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
