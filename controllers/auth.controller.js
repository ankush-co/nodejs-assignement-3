const logger = require("../config/logger/logger.config");
const generatePassword = require("../utils/encryptPassword");
const httpLogger = require("../utils/httpLogger");
const userModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    logger.info(httpLogger(req));
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      logger.warn(httpLogger(req, res, `Bad Request`));
      return res.json({ message: "Bad Request" });
    }
    const user = await userModel.findOne({
      email: email,
    });
    if (user) {
      res.status(409);
      logger.warn(httpLogger(req, res, "User already exists"));
      return res.json({ message: "User already exists" });
    }
    const hashedPassword = await generatePassword(req.body.password);
    const response = await new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    }).save();
    const createdUser = {
      email: response.email,
      username: response.username,
      userID: response._id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
    res.status(201);
    logger.info(httpLogger(req, res, `user created: ${createdUser.email}`));
    return res.json({
      message: "User creation successful!",
      user: createdUser,
    });
  } catch (error) {
    res.status(500);
    logger.error(httpLogger(req, res, error.message));
    return res.json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    logger.info(httpLogger(req));
    const { userID, username } = req.body;
    if (!userID) {
      res.status(400);
      logger.warn(httpLogger(req, res, `Bad Request`));
      return res.json({ message: "Bad Request" });
    }
    const user = await userModel.findById(userID);
    if (!user) {
      res.status(404);
      logger.warn(httpLogger(req, res, `User not found`));
      return res.json({ message: "User not found" });
    }
    const response = await userModel.findByIdAndUpdate(user.id, {
      $set: {
        username: username ? username : user.username,
      },
    });
    const updatedUser = {
      username: username ? username : response.username,
      email: response.email,
      userID: response._id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
    res.status(200);
    logger.info(httpLogger(req, res, `user updated: ${updatedUser.email}`));
    return res.json({
      message: "User update successful!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500);
    logger.error(httpLogger(req, res, error.message));
    return res.json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    logger.info(httpLogger(req));
    const data = await userModel.find();
    const users = data.map((user) => {
      return {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    res.status(200);
    logger.info(httpLogger(req, res, `User data fetch successful!`));
    return res.json({
      message: "User data fetch successful!",
      users,
    });
  } catch (error) {
    res.status(500);
    logger.error(httpLogger(req, res, error.message));
    return res.json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
};
