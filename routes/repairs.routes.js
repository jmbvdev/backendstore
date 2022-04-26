const express = require("express");
const {
  getAllrepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair
} = require("../controllers/repair.controller");

const router = express.Router();

router.route("/").get(getAllrepairs).post(createRepair)

router.route("/:id").get(getRepairById).patch(updateRepair).delete(deleteRepair)

module.exports = { repairsRouter: router };
