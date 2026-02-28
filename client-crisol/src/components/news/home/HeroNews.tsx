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
        <article
          className={`group overflow-hidden mb-12 border-b border-black dark:border-zinc-800 pb-8 transition-colors ${darkMode ? "bg-brand-dark" : "bg-brand-light"
            }`}
        >
          <div className="relative overflow-hidden mb-6 border border-black dark:border-zinc-800">
            <img
              src={contentHero?.imageUrl as string}
              alt={title}
              className="w-full h-80 object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
            />
          </div>

          <div>
            <span
              className={`text-xs font-bold uppercase tracking-widest mb-3 block text-accent`}
            >
              {category}
            </span>

            <h2
              className={`font-serif text-3xl font-black leading-tight mb-4 group-hover:text-accent transition-colors duration-300 ${darkMode ? "text-slate-100" : "text-ink"
                }`}
            >
              {title}
            </h2>

            <p
              className={`font-light mb-6 leading-relaxed ${darkMode ? "text-slate-400" : "text-ink-light"
                }`}
            >
              {contentHero?.description}
            </p>

            <time
              className={`text-xs font-medium tracking-widest uppercase ${darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
            >
              {moment(createdAt).format("MMM DD, YYYY")}
            </time>
          </div>
        </article>
      ) : null}
    </>
  );
};

export default HeroNews;
