import Blog from "../models/Blog-model.js";
import Comment from "../models/Comment-model.js";

const addBlogService = async(dataBlog) => {
    const blog = new Blog({
        title: dataBlog.title,
        subTitle: dataBlog.subTitle,
        description: dataBlog.description,
        category: dataBlog.category,
        image: dataBlog.image,
        isPublished: dataBlog.isPublished
    })
    return await blog.save();
}

const getBlogsAll = async() => {
    const blogs = await Blog.find();
    return blogs;
}

const getBlogIdService = async(blogId) => {
    const blog = await Blog.findById(blogId);
    return blog;
}

const deleteBlogIdService = async(blogId) => {
    const blog = await Blog.findByIdAndDelete(blogId);
    return blog;
}

const getBlogAdmin = async() => {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    return blog;
}

const dashboardService = async() => {
    const recentblogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments();

    return {
        recentblogs, blogs, comments, drafts
    }
//    const comments = await Comment.coun
}

export default {
    addBlogService,
    getBlogsAll,
    getBlogIdService,
    deleteBlogIdService,
    getBlogAdmin,
    dashboardService
}