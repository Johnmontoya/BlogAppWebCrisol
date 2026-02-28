import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { useCreateNewsMutation } from "../../queries/news.query";
import useInputs from "../../hooks/useInputs";
import SweetAlertas from "../../components/alerts/SweetAlertas";
import type { IContentHero, IQuote, IBullet } from "../../interfaces/news";
import Sidebar from "../../components/Sidebar";
import HeroImageFields from "../../components/news/add/HeroImageFields";
import QuoteBlockFields from "../../components/news/add/QuoteBlockFields";
import BulletListFields from "../../components/news/add/BulletListFields";

const newsTypes = [
  { value: "hero-image", label: "Imagen Destacada (Hero)" },
  { value: "bullet-list", label: "Lista de Puntos" },
  { value: "quote-block", label: "Cita Destacada" },
];

const AddNews = () => {
  const { darkMode } = useContext(UserContext);
  const createNewsMutation = useCreateNewsMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsData, onChangeNewsData, setNewsData] = useInputs({
    type: "hero-image",
    category: "",
    title: "",
    // Campos para hero-image
    imageUrl: "",
    description: "",
    // Campos para quote-block
    quoteText: "",
    context: "",
    // Campos para bullet-list
    points: "",
    author: "",
    isPublished: false,
  });

  const handleSpecificContentChange = (
    name: string,
    value: string | boolean
  ) => {
    setNewsData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentContentData = {
    imageUrl: newsData.imageUrl,
    description: newsData.description,
  };

  const currentQuoteData = {
    quoteText: newsData.quoteText,
    context: newsData.context,
  };

  const currentBulletData = {
    points: newsData.points,
    author: newsData.author,
  };

  const createNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Construir el payload según el tipo de noticia
    const payload: any = {
      type: newsData.type,
      category: newsData.category,
      title: newsData.title,
      isPublished: newsData.isPublished,
    };

    // Agregar el contenido específico al campo correspondiente
    if (newsData.type === "hero-image") {
      payload.contentHero = {
        imageUrl: newsData.imageUrl,
        description: newsData.description,
      } as IContentHero;
    } else if (newsData.type === "quote-block") {
      payload.contentQuote = {
        quoteText: newsData.quoteText,
        context: newsData.context,
      } as IQuote;
    } else if (newsData.type === "bullet-list") {
      payload.contentBullet = {
        points: newsData.points,
        author: newsData.author,
      } as IBullet;
    }

    createNewsMutation.mutateAsync(payload, {
      onSuccess: async (response: any) => {
        setNewsData({
          type: "hero-image",
          category: "",
          title: "",
          imageUrl: "",
          description: "",
          quoteText: "",
          context: "",
          points: "",
          author: "",
          isPublished: false,
        });
        setIsLoading(false);
        SweetAlertas.OnDialogSuccess({
          message: response.data.message || "Noticia creada exitosamente",
        });
      },
      onError: async (error: any) => {
        setIsLoading(false);
        SweetAlertas.OnDialogFail({
          message: error.response.data.message,
        });
      },
    });
  };

  // Manejador especial para el checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsData({
      ...newsData,
      isPublished: e.target.checked,
    });
  };

  // Renderizar campos específicos según el tipo seleccionado
  const renderSpecificFields = () => {
    switch (newsData.type) {
      case "hero-image":
        return (
          <HeroImageFields
            onChange={handleSpecificContentChange}
            contentData={currentContentData}
            darkMode={darkMode}
            isLoading={isLoading}
          />
        );

      case "quote-block":
        return (
          <QuoteBlockFields
            onChange={handleSpecificContentChange}
            newsData={currentQuoteData}
            darkMode={darkMode}
            isLoading={isLoading}
          />
        );

      case "bullet-list":
        return (
          <BulletListFields
            onChange={handleSpecificContentChange}
            contentData={currentBulletData}
            darkMode={darkMode}
            isLoading={isLoading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`border-b ${darkMode
        ? "bg-brand-dark text-slate-100"
        : "bg-brand-light text-slate-900"
        }`}
    >
      <Sidebar />
      <div className="max-w-7xl flex flex-col m-auto my-10 px-10">
        <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
          <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
            Agregar Nueva Noticia
          </h1>
          <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
            Agrega una nueva noticia al sistema.
          </p>
        </div>

        <form onSubmit={createNews} className="flex flex-col gap-1 font-light tracking-wide">
          {/* 1. Selector de Plantilla (Type) */}
          <div className="flex flex-col mb-6">
            <label htmlFor="type" className="mb-2 font-medium">
              Plantilla de Diseño (Tipo de Noticia)
            </label>
            <select
              id="type"
              name="type"
              onChange={onChangeNewsData}
              value={newsData.type}
              className={`w-full max-w-lg p-3 border outline-none focus:border-orange-600 transition-colors ${darkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300"
                }`}
              disabled={isLoading}
            >
              {newsTypes.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* 2. Campo Título */}
            <div className="flex flex-col flex-1 mb-6">
              <label htmlFor="title" className="mb-2 font-medium">
                Título de la Noticia
              </label>
              <input
                id="title"
                type="text"
                name="title"
                onChange={onChangeNewsData}
                value={newsData.title}
                required
                placeholder="Ingresar el título"
                className={`w-full p-3 border outline-none focus:border-orange-600 transition-colors ${darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
                  }`}
                disabled={isLoading}
              />
            </div>

            {/* 3. Campo Categoría */}
            <div className="flex flex-col flex-1 mb-6">
              <label htmlFor="category" className="mb-2 font-medium">
                Categoría
              </label>
              <input
                id="category"
                type="text"
                name="category"
                onChange={onChangeNewsData}
                value={newsData.category}
                required
                placeholder="Ej. Tecnología, Política, Deportes"
                className={`w-full p-3 border outline-none focus:border-orange-600 transition-colors ${darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
                  }`}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* 4. Campos Específicos Dinámicos */}
          <div className="mb-6 p-4 border border-dashed border-orange-300">
            <h3 className={`font-semibold mb-3 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
              Datos Específicos para Plantilla:{" "}
              {newsTypes.find((t) => t.value === newsData.type)?.label}
            </h3>
            {renderSpecificFields()}
          </div>

          {/* 5. Checkbox (Publicar) */}
          <div className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              id="isPublished"
              checked={newsData.isPublished}
              onChange={handleCheckboxChange}
              className="w-5 h-5 cursor-pointer accent-slate-800"
              disabled={isLoading}
            />
            <label htmlFor="isPublished" className="font-medium cursor-pointer">
              Publicar Ahora
            </label>
          </div>

          {/* 6. Botón de Envío */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-40 py-3 font-medium cursor-pointer hover:bg-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed 
              ${darkMode ? "text-slate-100 border border-slate-100 hover:bg-zinc-100 hover:text-slate-900" : "text-slate-900 border border-slate-900 hover:bg-zinc-900 hover:text-slate-100"
              }`}
          >
            {isLoading ? "Agregando..." : "Agregar Noticia"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;