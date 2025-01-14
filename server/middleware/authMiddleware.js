const User = require("../models/User");
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;
    console.log("nikesh");
    console.log(token);
    const decoded = jwt.verify(token, "anykey");
    const userFound = await User.findById(decoded.userId).select("-password");
    if (!userFound) return next(appError("not authorized, invalid token"));
    req.user = userFound;

    next();
  } catch (error) {
    return next(appError("not authorized , no token"));
  }
};
 
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(appError("not authorized, not admin", 403));
  }
};

module.exports = {
  protect,
  admin,
};













