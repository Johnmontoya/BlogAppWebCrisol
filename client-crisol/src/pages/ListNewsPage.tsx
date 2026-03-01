import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContextProvider";
import HeroImageNews from "../components/news/list/HeroImageNews";
import { useGetNewsQueries } from "../queries/news.query";
import QuoteBlockNews from "../components/news/list/QuoteBlockNews";
import BulletListNews from "../components/news/list/BulletListNews";
import { HeroNewsSkeleton, BulletNewsSkeleton } from "../components/news/NewsSkeleton";

const ListNewsPage = () => {
  const { darkMode } = useContext(UserContext);
  const [data] = useGetNewsQueries();
  const news = data.data?.news || [];
  const isLoading = data.isLoading;

  // Filtrar noticias por tipo
  const heroNews = news.filter((item) => item.type === "hero-image" && item.contentHero);
  const quoteNews = news.filter((item) => item.type === "quote-block" && item.contentQuote);
  const bulletNews = news.filter((item) => item.type === "bullet-list" && item.contentBullet);

  return (
    <div
      className={`border-b ${darkMode
        ? "bg-brand-dark text-slate-100"
        : "bg-brand-light text-slate-900"
        }`}
    >
      <Sidebar />
      <div className="max-w-7xl flex-1 p-4 md:p-10 m-auto">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
              Todas las noticias.
            </h1>
            <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
              Listado de todas las noticias registradas en el sistema.
            </p>
          </div>

          <div className="w-full flex justify-between gap-4">
            {/* Columna 1: Hero News */}
            <div
              className={`relative w-full h-full`}
            >
              {isLoading ? (
                <HeroNewsSkeleton />
              ) : heroNews.length === 0 ? (
                <p className="p-4">No hay noticias hero disponibles</p>
              ) : (
                heroNews.map((item) => (
                  <HeroImageNews key={item._id} news={item} />
                ))
              )}
            </div>

            {/* Columna 2: Quote News */}
            <div
              className={`relative w-full h-full`}
            >
              {isLoading ? (
                <BulletNewsSkeleton />
              ) : quoteNews.length === 0 ? (
                <p className="p-4">No hay noticias quote disponibles</p>
              ) : (
                quoteNews.map((item) => (
                  <QuoteBlockNews key={item._id} news={item} />
                ))
              )}
            </div>

            {/* Columna 3: Bullet News */}
            <div
              className={`relative w-full h-full`}
            >
              {isLoading ? (
                <BulletNewsSkeleton />
              ) : bulletNews.length === 0 ? (
                <p className="p-4">No hay noticias bullet disponibles</p>
              ) : (
                bulletNews.map((item) => (
                  <BulletListNews key={item._id} news={item} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNewsPage;