const bcrypt = require('bcryptjs');

//Models
const { User } = require('../models/user.model');

//Validations
const { validationResult } = require('express-validator');

//handle error
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  res.status(200).json({ users });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorsMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      messages: errorsMsg,
    });
  }
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  //Remove password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
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
