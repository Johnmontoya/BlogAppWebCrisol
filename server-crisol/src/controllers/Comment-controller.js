import CommentService from "../services/Comment-service.js";

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await CommentService.addCommentService({ blog, name, content });

    return res.status(200).json({
      valid: "success",
      message: "Comentario agregado",
    });
  } catch (error) {
    console.error("Error al agregar el comentario", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al agregar el comentario.",
      details: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({
        valid: "fail",
        message: "ID del blog es requerido",
      });
    }

    const comments = await CommentService.getBlogComments(id);

    return res.status(200).json({
      valid: "success",
      comments,
    });
  } catch (error) {
    console.error("Error al obtener el comentario", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al obtener el comentario.",
      details: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentService.getCommentAll();

    return res.status(200).json({
      valid: "success",
      comments,
    });
  } catch (error) {
    console.error("Error al obtener todos los comentarios", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error obtener todos los comentarios.",
      details: error.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    
    await CommentService.deleteComment(id);

    if (!id) {
      return res.status(404).json({
        valid: "fail",
        message: "El comentario no existe",
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Comentario eliminado",
    });
  } catch (error) {
    console.error("Error al eliminar el comentario", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al eliminar el comentario.",
      details: error.message,
    });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await CommentService.approveComment(id);

    if (!id) {
      return res.status(404).json({
        valid: "fail",
        message: "El comentario no existe",
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Comentario actualizado",
    });
  } catch (error) {
    console.error("Error al cambiar el estado del comentario", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al cambiar el estado del comentario.",
      details: error.message,
    });
  }
};
