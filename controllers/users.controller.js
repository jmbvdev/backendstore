const { User } = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ users });
};
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = User.create({ name, email, password, role });
  res.status(201).json({
    newUser,
  });
};
module.exports = { getAllUsers, createUser };
