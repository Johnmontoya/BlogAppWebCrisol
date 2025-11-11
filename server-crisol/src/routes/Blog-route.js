import express from 'express'
import { addBlog, deleteBlog, generateContent, getAllBlogs, getAllBlogsAdmin, getBlogById, getDashboard, togglePublish } from '../controllers/Blog-controller.js'; 
import upload from '../middlewares/multer-middleware.js'
import { LogUser } from '../middlewares/auth-middleware.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), LogUser, addBlog);

blogRouter.get('/all', getAllBlogs);
blogRouter.delete('/delete', LogUser, deleteBlog);

blogRouter.put('/toggle-publish', LogUser, togglePublish);
blogRouter.get('/all-admin', getAllBlogsAdmin);

blogRouter.get('/dashboard', getDashboard);

/*


blogRouter.post('/add-comment', addComment);
blogRouter.get('/comments', getBlogComments);
blogRouter.get('/comments/all', getAllComments);

blogRouter.put('/approve-comment', approceCommentById);
blogRouter.delete('/delete-comment', deleteCommentById);
*/

blogRouter.post('/generate', LogUser, generateContent);

blogRouter.get('/:blogId', getBlogById);


export default blogRouter;