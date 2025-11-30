import type { INewsData } from "../../../interfaces/news";

interface IQuoteNewsProps {
  news: INewsData;
}

const QuoteNews = ({ news }: IQuoteNewsProps) => {
  const { contentQuote, title, category, isPublished } = news;
  return (
    <>
      {isPublished ? (
        <>
          <div className="bg-linear-to-r from-purple-700 to-indigo-700 text-white p-8 rounded-lg shadow-xl mb-8">
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wide mb-4 block">
              {category}
            </span>
            <blockquote className="text-3xl font-light italic border-l-4 border-purple-300 pl-4 mb-4">
              "{contentQuote?.quoteText}"
            </blockquote>
            <p className="text-lg font-medium text-purple-200">- {title}</p>
            {contentQuote?.context && (
              <p className="text-sm text-purple-300">{contentQuote?.context}</p>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuoteNews;
