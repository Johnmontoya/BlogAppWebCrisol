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
          <div className="border border-indigo-500 text-white p-8 shadow-xl mb-8">
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-4 block">
              {category}
            </span>
            <blockquote className="text-3xl font-light text-slate-800 italic border-l-4 border-indigo-500 pl-4 mb-4">
              "{contentQuote?.quoteText}"
            </blockquote>
            <p className="text-lg font-medium text-indigo-500">- {title}</p>
            {contentQuote?.context && (
              <p className="text-sm text-indigo-500">{contentQuote?.context}</p>
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
