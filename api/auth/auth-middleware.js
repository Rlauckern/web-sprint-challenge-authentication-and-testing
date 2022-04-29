const User = require("../users/users-model");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/index')

const checkUsernameValid = async (req, res, next) => {
  try {
    const user = await User.findBy(req.body.username);
    if (!user) {
      next({ status: 422, message: "invalid credentials" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

async function checkUsernameUnique(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) next();
    else next({ message: "username taken", status: 422 });
  } catch (err) {
    next(err);
  }
}

const validLogin = (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.username.trim() ||
      !req.body.password ||
      !req.body.password.trim()
    ) {
      next({ status: 401, message: "username and password required" });
    } else {
      req.body.username = req.body.username.trim();
      next();
    }
  } catch (err) {
    next(err);
  }
};

const tokenBuilder = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(payload, JWT_SECRET, options)

    return token
}

module.exports = {
  checkUsernameUnique,
  checkUsernameValid,
  validLogin,
  tokenBuilder,
};