import express from 'express'
import { addNews } from '../controllers/News-controller.js'; 
import upload from '../middlewares/multer-middleware.js'
import { LogUser } from '../middlewares/auth-middleware.js';

const newsRouter = express.Router();

newsRouter.post("/add", upload.single('image'), LogUser, addNews);

export default newsRouter;