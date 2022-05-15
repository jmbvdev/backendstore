const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return next(new AppError('No users found', 404));
  }
  req.user = user;
  next();
});

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  //Extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Session invalid', 403));
  }

  //Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }
  req.sessionUser = user;
  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError('Access not granted', 403));
  }
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  //Get current session user and the id of the user that is going to be updated
  const { sessionUser, user } = req;
  // compare ids
  if (sessionUser.id !== user.id) {
    //if the ids arent equal, return error
    return next(new AppError('You do not own this account', 403));
  }
  //if the ids are equal, the request pass
  next();
});

module.exports = {
  userExists,
  protectToken,
  protectAdmin,
  protectAccountOwner,
};
