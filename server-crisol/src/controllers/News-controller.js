import fs from "fs";
import imageKit from "../../config/imageKit.js";
import NewsService from "../services/News-service.js";

export const addNews = async (req, res) => {
  try {
    const { title, description, category, isPublished } = JSON.parse(req.body.news);
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
      folder: "/crisol/news",
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

    let dataNews = {      
      title,
      description,
      category,
      image,
      isPublished,
    };

    await NewsService.addNewsService(dataNews);

    return res.status(200).json({
      valid: "success",
      message: "Noticia agregada!",
    });
  } catch (error) {
    console.error("Error al agregar la noticia", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al guardar la noticia.",
      details: error.message,
    });
  }
};