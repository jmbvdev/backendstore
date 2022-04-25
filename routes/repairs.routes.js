const express = require("express");
const {
  getAllrepairs,
  createRepair,
} = require("../controllers/repair.controller");

const router = express.Router();

router.get("/", getAllrepairs);
router.post("/", createRepair);

module.exports = { repairsRouter: router };
