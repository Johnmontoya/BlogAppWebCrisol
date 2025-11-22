import fs from "fs";
import imageKit from "../../config/imageKit.js";
import main from "../../config/gemini.js";
import BlogService from "../services/Blog-service.js";

export const addBlog = async (req, res) => {
  try {
    const { userId, title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Los campos no pueden estar vacios",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //Upload image to imagekit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //optimization de la imagen
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    let dataBlog = {
      author: userId,
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    };

    await BlogService.addBlogService(dataBlog);

    return res.status(200).json({
      valid: "success",
      message: "Blog agregado!",
    });
  } catch (error) {
    console.error("Error al agregar el blog", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al guardar el blog.",
      details: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogService.getBlogsAll();

    if (blogs.length === 0) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay blogs registrados en la base de datos.",
      });
    }

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error al obtener los blogs", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al obtener los blogs.",
      details: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogService.getBlogIdService(blogId);

    if (!blog) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay blog registrado en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      blog,
    });
  } catch (error) {
    console.error("Error al obtener el blog", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al obtener el blog.",
      details: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogService.deleteBlogIdService(blogId);

    if (!blog) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay blog registrado en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Blog eliminado",
    });
  } catch (error) {
    console.error("Error al borrar el blog", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al borrar el blog.",
      details: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await BlogService.getBlogIdService(id);

    blog.isPublished = !blog.isPublished;

    await blog.save();

    return res.status(200).json({
      valid: "success",
      message: "Blog actualizado",
    });
  } catch (error) {
    console.error("Error al actualizar el blog", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al actualizar el blog.",
      details: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await BlogService.getBlogAdmin(userId);

    if (!blogs) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay blogs registrados en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      blogs,
    });
  } catch (error) {
    console.error("Error al obtener los blogs", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al obtener los blogs.",
      details: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const Blogs = await BlogService.dashboardService();
    return res.status(200).json({
      valid: "success",
      Blogs,
    });
  } catch (error) {
    console.error("Error al obtener los datos", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error al obtener los datos.",
      details: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt +
        "Genera el contenido de una blog para este tema en un formato de texto simple"
    );

    return res.status(200).json({
      valid: "success",
      content,
    });
  } catch (error) {
    console.error("Error al generar el contenido", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error con la generacion de contenido.",
      details: error.message,
    });
  }
};
