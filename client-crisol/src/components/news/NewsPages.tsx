import { useGetNewsQueries } from "../../queries/news.query";
import NewsRenderer from "./NewsRender";

const NewsPages = () => {

  const [data] = useGetNewsQueries();
  const newsItem = data.data?.news;
  
  return (
    <div>
      {newsItem?.map((news) => (
        <NewsRenderer key={news._id} newsItem={news} />
      ))}
    </div>
  );
};

export default NewsPages;
