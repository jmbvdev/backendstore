const { Repair } = require('../models/repair.model');

const repairExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id, status: 'pending' } });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No pending service found',
      });
    }

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairExists };
