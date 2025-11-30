import express from 'express'
import { addNews, deleteNews, newsAll, stateNews } from '../controllers/News-controller.js'; 
import upload from '../middlewares/multer-middleware.js'
import { LogAdmin } from '../middlewares/auth-middleware.js';

const newsRouter = express.Router();

newsRouter.post("/add", upload.single('image'), LogAdmin, addNews);
newsRouter.get('/all', newsAll);
newsRouter.delete('/delete/:newsId', LogAdmin, deleteNews);
newsRouter.put('/statenews/:newsId', LogAdmin, stateNews);

export default newsRouter;