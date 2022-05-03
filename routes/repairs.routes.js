const express = require('express');
const { body } = require('express-validator');
//middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');

//controllers
const {
  getAllrepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');

const router = express.Router();

router
  .route('/')
  .get(getAllrepairs)
  .post(
    body('date')
      .notEmpty()
      .withMessage('Date cannont be empty')
      .isDate()
      .withMessage('must be a valid date'),
    body('computerNumber')
      .notEmpty()
      .withMessage('ComputerNumber cannont be empty'),
    body('comments').notEmpty().withMessage('Comments cannont be empty'),
    createRepair
  );

router
  .route('/:id')
  .get(repairExists, getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairsRouter: router };
