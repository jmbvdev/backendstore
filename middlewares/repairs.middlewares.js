const { Repair } = require('../models/repair.model');

const repairExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const repair = await Repair.findOne({ where: { id} });

    if (repair.status==="cancelled") {
      return res
        .status(404)
        .json({ status: 'error', message: 'Pending services not found' });
    }
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairExists };
