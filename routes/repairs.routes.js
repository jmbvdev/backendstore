const express = require('express');

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

router.route('/').get(getAllrepairs).post(createRepair);

router
  .route('/:id')
  .get(repairExists, getRepairById)
  .patch(repairExists, updateRepair)
  .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
