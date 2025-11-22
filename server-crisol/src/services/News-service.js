import News from "../models/News-model.js";

const addNewsService = async(dataNews) => {
    const news = new News({
        title: dataNews.title,
        description: dataNews.description,
        category: dataNews.category,
        image: dataNews.image,
        isPublished: dataNews.isPublished
    })
    return await news.save();
}

export default {addNewsService};