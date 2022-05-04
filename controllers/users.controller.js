const { User } = require('../models/user.model');
const { validationResult } = require('express-validator');
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ users });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorsMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      messages: errorsMsg,
    });
  }
  const newUser = await User.create({ name, email, password, role });
  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  res.status(200).json({ user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await User.update({ name, email }, { where: { id } });
  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  await user.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
