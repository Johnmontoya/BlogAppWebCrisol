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

const getCommentAll = async () => {
  const comments = await Comment.find()
    .populate("blog")
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
