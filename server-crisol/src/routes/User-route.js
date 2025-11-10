import express from "express";
import {
  changePassword,
  createUser,
  deleteUser,
  forgotPassword,
  getUserById,
  getUsers,
  login,
  resetPassword,
} from "../controllers/User-controller.js";
import { LogUser } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.put("/reset", resetPassword);
router.put("/change-pass", LogUser, changePassword);
router.delete('/:id', LogUser, deleteUser);

export default router;
