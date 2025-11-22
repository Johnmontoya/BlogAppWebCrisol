import Blog from "../models/Blog-model.js";
import Comment from "../models/Comment-model.js";

const addCommentService = async ({ blog, name, content }) => {
  const comment = new Comment({
    blog,
    name,
    content,
  });
  return await comment.save();
};

const getBlogComments = async (id) => {
  const comments = await Comment.find({ blog: id, isApproved: true }).sort({
    createdAt: -1,
  });

  return comments;
};

const getCommentAll = async (userId) => {
  const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
  const blogIds = blogs.map(blog => blog._id);

  const comments = await Comment.find({ blog: { $in: blogIds } })
    .populate("blog") // Incluye la información completa del blog asociado
    .sort({ createdAt: -1 });
  return comments;
};

const deleteComment = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
};

const approveComment = async (id) => {
  const comment = await Comment.findByIdAndUpdate(id, { isApproved: true });
  return comment;
};

export default {
  addCommentService,
  getBlogComments,
  getCommentAll,
  deleteComment,
  approveComment,
};
