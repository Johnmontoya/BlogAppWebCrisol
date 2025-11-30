import express from 'express'
import { addNews, deleteNews, newsAll, stateNews } from '../controllers/News-controller.js'; 
import upload from '../middlewares/multer-middleware.js'
import { LogUser } from '../middlewares/auth-middleware.js';

const newsRouter = express.Router();

newsRouter.post("/add", upload.single('image'), addNews);
newsRouter.get('/all', newsAll);
newsRouter.delete('/delete/:newsId', deleteNews);
newsRouter.put('/statenews/:newsId', stateNews);

export default newsRouter;