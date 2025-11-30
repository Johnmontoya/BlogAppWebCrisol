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
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-8">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2 block">
              {category}
            </span>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            <ul>
              {listBull?.map((item, index) => (
                <li key={index} className="flex items-start lg:col-span-1">
                  <div className="shrink-0">
                    <FaCheckCircle size={18} className="text-teal-400" />
                  </div>
                  <p className="ml-3 leading-5 text-gray-400">{item}</p>
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
