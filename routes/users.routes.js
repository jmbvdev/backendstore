const express = require('express');
const { body } = require('express-validator');
//middlewares

const { userExists } = require('../middlewares/users.middlewares');

//controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(
    body('name').notEmpty().withMessage('Name cannont be empty'),
    body('email')
      .notEmpty()
      .withMessage('Email cannont be empty')
      .isEmail()
      .withMessage('Must be a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password cannont be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be least 8 characters long'),
    createUser
  );

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
