import { FaCheckCircle } from "react-icons/fa";
import type { INewsData } from "../../../interfaces/news";

interface IBulletNewsProps {
  news: INewsData;
}

const BulletNews = ({ news }: IBulletNewsProps) => {
  const { category, contentBullet, title, isPublished } = news;
  const listBull = contentBullet?.points.split(",");

  return (
    <>
      {isPublished ? (
        <div>
          <div className="border-b border-gray-500 text-white p-6 mb-8">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2 block">
              {category}
            </span>
            <h2 className="font-serif text-slate-800 text-2xl font-bold mb-4">{title}</h2>

            <ul>
              {listBull?.map((item, index) => (
                <li key={index} className="flex items-start lg:col-span-1">
                  <div className="shrink-0">
                    <FaCheckCircle size={18} className="text-indigo-400" />
                  </div>
                  <p className="font-light tracking-wide ml-3 leading-5 text-gray-400">{item}</p>
                </li>
              ))}
            </ul>

            {contentBullet?.author && (
              <p className="text-sm text-gray-500 mt-4">
                Por: {contentBullet.author}
              </p>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BulletNews;
