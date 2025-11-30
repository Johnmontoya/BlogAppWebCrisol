import express from "express";
import {
  changePassword,
  ChangeStateUser,
  createUser,
  deleteUser,
  forgotPassword,
  getUserById,
  getUsers,
  login,
  resetPassword,
  VerifyUser,
} from "../controllers/User-controller.js";
import { LogAdmin, LogUser } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.put("/reset", resetPassword);
router.put("/change-pass", LogUser, changePassword);
router.put("/change-state", LogAdmin, ChangeStateUser);
router.delete('/user/:id', LogUser, deleteUser);
router.put('/verifyuser', VerifyUser);

export default router;
