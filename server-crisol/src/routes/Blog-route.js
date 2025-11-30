import express from 'express'
import { addBlog, deleteBlog, generateContent, getAllBlogs, getAllBlogsAdmin, getBlogById, getDashboard, togglePublish } from '../controllers/Blog-controller.js'; 
import upload from '../middlewares/multer-middleware.js'
import { LogAdmin, LogUser } from '../middlewares/auth-middleware.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), LogUser, addBlog);

blogRouter.get('/all', getAllBlogs);
blogRouter.delete('/delete/:blogId', LogUser, deleteBlog);

blogRouter.put('/toggle-publish', LogUser, togglePublish);
blogRouter.get('/all-admin/:userId', LogUser, getAllBlogsAdmin);

blogRouter.get('/dashboard', LogAdmin, LogUser, getDashboard);

blogRouter.post('/generate', LogUser, LogAdmin, generateContent);

blogRouter.get('/:blogId', getBlogById);


export default blogRouter;