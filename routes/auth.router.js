const {
  createUser,
  updateUser,
  getUsers,
} = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/create", createUser);
authRouter.put("/update", updateUser);
authRouter.get("/getusers", getUsers);

module.exports = authRouter;
