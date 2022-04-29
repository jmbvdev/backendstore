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
    body('date').notEmpty().withMessage('Date cannont be empty'),
    createRepair
  );

router
  .route('/:id')
  .get(repairExists, getRepairById)
  .patch(repairExists, updateRepair)
  .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
