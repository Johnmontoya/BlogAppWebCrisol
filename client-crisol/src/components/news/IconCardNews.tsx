const IconCardNews = ({ news }: any) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4 mb-8 border-l-4 border-orange-500">
    <div className="text-4xl">
      {news.icon} {/* Puede ser un emoji o un componente de icono */}
    </div>
    <div>
      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide block">
        {news.category}
      </span>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{news.title}</h3>
      <p className="text-gray-600 text-sm">{news.description}</p>
    </div>
  </div>
);

export default IconCardNews;