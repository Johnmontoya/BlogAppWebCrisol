import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContextProvider";
import HeroImageNews from "../components/news/list/HeroImageNews";
import { useGetNewsQueries } from "../queries/news.query";
import QuoteBlockNews from "../components/news/list/QuoteBlockNews";
import BulletListNews from "../components/news/list/BulletListNews";

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
      className={`min-h-screen border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900 text-slate-100"
          : "border-gray-200 bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />
      <div className="max-w-7xl flex-1 p-4 md:p-10 m-auto">
        <div>
          <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
            <p>Todas las noticias</p>
          </div>

          <div className="w-full flex justify-between gap-4">
            {/* Columna 1: Hero News */}
            <div
              className={`relative w-full h-full rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {isLoading ? (
                <p className="p-4">Cargando noticias...</p>
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
              className={`relative w-full h-full rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {isLoading ? (
                <p className="p-4">Cargando noticias...</p>
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
              className={`relative w-full h-full rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {isLoading ? (
                <p className="p-4">Cargando noticias...</p>
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