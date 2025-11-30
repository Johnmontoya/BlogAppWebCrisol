import News from "../models/News-model.js";

const addNewsService = async (dataNews) => {
  const news = new News({
    type: dataNews.type,
    title: dataNews.title,
    category: dataNews.category.toUpperCase(),
    contentHero: dataNews.contentHero,
    contentQuote: dataNews.contentQuote,
    contentBullet: dataNews.contentBullet,
    isPublished: dataNews.isPublished,
  });
  return await news.save();
};

const getNewsAll = async () => {
  const news = await News.find();
  return news;
};

const deleteNewsIdService = async (newsId) => {
  const news = await News.findByIdAndDelete(newsId);
  return news;
};

const getNewsId = async (newsId) => {
  const news = await News.findById(newsId);
  return news;
};

const updateNewsId = async (newsId, stateNews) => {
  const news = await News.findByIdAndUpdate(newsId, {
    isPublished: !stateNews,
  }, {
    new: true
  });
  return news;
};

export default {
  addNewsService,
  getNewsAll,
  deleteNewsIdService,
  getNewsId,
  updateNewsId,
};
