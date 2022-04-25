const express = require("express");
//controllers
const { getAllUsers, createUser } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

module.exports = { usersRouter: router };
