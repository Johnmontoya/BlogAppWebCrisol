import express from "express";
import {
  addComment,
  approveCommentById,
  deleteCommentById,
  getAllComments,
  getBlogComments,
} from "../controllers/Comment-controller.js";
import { LogUser } from "../middlewares/auth-middleware.js";

const blogRouter = express.Router();

blogRouter.post("/add-comment", LogUser, addComment);
blogRouter.get("/blog", getBlogComments);
blogRouter.get("/comments/all", getAllComments);

blogRouter.put("/approve-comment", LogUser, approveCommentById);
blogRouter.delete("/delete-comment", LogUser, deleteCommentById);

export default blogRouter;
