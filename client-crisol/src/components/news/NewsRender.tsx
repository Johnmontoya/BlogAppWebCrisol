import IconCardNews from "./IconCardNews";
import HeroNews from "./home/HeroNews";
import BulletNews from "./home/BulletNews";
import QuoteNews from "./home/QuoteNews";

const NewsRenderer = ({ newsItem }: any) => {
  switch (newsItem.type) {
    case 'hero-image':
      return <HeroNews news={newsItem} />;
    case 'bullet-list':
      return <BulletNews news={newsItem} />;
    case 'quote-block':
      return <QuoteNews news={newsItem} />;
    case 'icon-card':
      return <IconCardNews news={newsItem} />;
    default:
      return <p className="text-red-500">Tipo de noticia desconocido: {newsItem.type}</p>;
  }
};

export default NewsRenderer;