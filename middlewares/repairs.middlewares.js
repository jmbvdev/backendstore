const { Repair } = require('../models/repair.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const repairExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id, status: 'pending' } });
  if (!repair) {
    return next(new AppError('No pending service found', 404));
  }
  res.status(200).json({
    repair,
  });
  next();
});

module.exports = { repairExists };
