const express = require('express');

// Middlewares
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');
const { pendingRepairExists } = require('../middlewares/repairs.middlewares');
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validators.middleware');

// Controllers
const {
  getAllCompletedRepairs,
  getAllPendingRepairs,
  createRepair,
  getRepairById,
  repairCancelled,
  repairCompleted,
} = require('../controllers/repairs.controller');

//utils
const { upload } = require('../utils/multer');

const router = express.Router();
router.use(protectToken);

router.get('/completed', getAllCompletedRepairs);

router.get('/pending', getAllPendingRepairs);

router.post(
	'/',
  upload.single("imgPath"),
  createRepairValidations,
  checkValidations,
  createRepair
);

router.get('/:id', protectAdmin, pendingRepairExists, getRepairById);

router.patch('/:id', protectAdmin, pendingRepairExists, repairCompleted);

router.delete('/:id', protectAdmin, pendingRepairExists, repairCancelled);

module.exports = { repairsRouter: router };
