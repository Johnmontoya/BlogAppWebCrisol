import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContextProvider";
import type { INewsData } from "../../../interfaces/news";
import moment from "moment";

interface HeroImageNewsProps {
  news: INewsData;
}

const HeroNews = ({ news }: HeroImageNewsProps) => {
  const { darkMode } = useContext(UserContext);
  const { category, title, contentHero, createdAt, isPublished } = news;

  return (
    <>
      {isPublished ? (
        <div
          className={`rounded-lg shadow-xl overflow-hidden mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <img
            src={contentHero?.imageUrl as string}
            alt={title}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <span
              className={`text-xs font-semibold uppercase tracking-wide mb-2 block ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              {category}
            </span>

            <h2
              className={`text-3xl font-bold mb-3 ${
                darkMode ? "text-slate-100" : "text-gray-900"
              }`}
            >
              {title}
            </h2>

            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {contentHero?.description}
            </p>

            <p
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeroNews;
