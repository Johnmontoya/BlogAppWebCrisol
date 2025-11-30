import fs from "fs";
import imageKit from "../../config/imageKit.js";
import NewsService from "../services/News-service.js";

export const addNews = async (req, res) => {
  try {
    const { type, category, title, contentHero, contentQuote, contentBullet, isPublished } = req.body;

    if (!title || !category) {
      return res.json({
        success: false,
        message: "Los campos no pueden estar vacios",
      });
    }

    let dataNews = {
      type,
      title,
      category,
      contentHero,
      contentQuote,
      contentBullet,
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

export const newsAll = async (req, res) => {
  try {
    const news = await NewsService.getNewsAll();

    if (news.length === 0) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay noticias registradas en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      news,
    });
  } catch (error) {
    console.error("Error al mostrar las noticias", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al mostrar las noticias.",
      details: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const news = await NewsService.deleteNewsIdService(newsId);

    if (!news) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay noticias registradas en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Noticia eliminada",
    });
  } catch (error) {
    console.error("Error al borrar la noticia", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al borrar la noticia.",
      details: error.message,
    });
  }
};

export const stateNews = async(req, res) => {
  try {
    const { newsId } = req.params;
    const newsData = await NewsService.getNewsId(newsId);

    const stateNews = newsData.isPublished;

    const news = await NewsService.updateNewsId(newsId, stateNews);

    if (!news) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay noticias registradas en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Noticia publicada",
    });

  } catch (error) {
    console.error("Error al borrar la noticia", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al borrar la noticia.",
      details: error.message,
    });
  }
}