import { useContext, useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { UserContext } from "../../contexts/UserContextProvider";
import Sidebar from "../../components/Sidebar";
import {
  useCreateBlogMutation,
  useGenerateAIMutation,
} from "../../queries/blog.query";
import useInputs from "../../hooks/useInputs";
import SweetAlertas from "../../components/alerts/SweetAlertas";
import { useAuthStore } from "../../store/auth";

const AddBlog = () => {
  const userId = useAuthStore((state) => state.userId);
  const { darkMode } = useContext(UserContext);
  const createBlogMutation = useCreateBlogMutation();
  const generateAIMutation = useGenerateAIMutation();

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [blogData, onChangeblogData, setBlogData] = useInputs({
    title: "",
    subTitle: "",
    category: "",
    isPublished: false,
  });

  const CreateBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quillRef.current) {
      SweetAlertas.OnDialogFail({
        message: "El editor no está inicializado",
      });
      return;
    }

    setIsAdding(true);

    const description = quillRef.current.root.innerHTML;

    if (!description || description === "<p><br></p>") {
      SweetAlertas.OnDialogFail({
        message: "Por favor, escribe una descripción para el blog",
      });
      setIsAdding(false);
      return;
    }

    const Data = {
      userId: userId,
      title: blogData.title,
      subTitle: blogData.subTitle,
      description: description,
      category: blogData.category,
      isPublished: blogData.isPublished,
      createdAt: new Date().toISOString(),
    };

    const formData = new FormData();
    formData.append("blog", JSON.stringify(Data));
    formData.append("image", image!);

    createBlogMutation.mutateAsync(formData, {
      onSuccess: async (response: any) => {
        setBlogData({
          title: "",
          subTitle: "",
          category: "Todo",
          isPublished: false,
        });
        setImage(null);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
        setIsAdding(false);
        SweetAlertas.OnDialogSuccess({
          message: response.data.message,
        });
      },
      onError(error: any) {
        SweetAlertas.OnDialogFail({
          message: error.response.data.message,
        });
      },
    });
  };

  const generateContent = () => {
    setIsAdding(true);
    generateAIMutation.mutateAsync(blogData.title, {
      onSuccess: async (response: any) => {
        setIsAdding(false);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = response.data.content;
        } else {
          SweetAlertas.OnDialogFail({
            message: response.data.message,
          });
        }
      },
      onError: async (error: any) => {
        SweetAlertas.OnDialogFail({
          message: error.response.data.message,
        });
      },
    });
  };

  useEffect(() => {
    // Inicializar Quill solo si no existe y el ref está disponible
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Escribe tu contenido aquí...",
      });
    }

    // Cleanup al desmontar el componente
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

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
            Agregar nuevo blog
          </h1>
          <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
            Agrega un nuevo blog al sistema.
          </p>
        </div>
        <form
          onSubmit={CreateBlog}
          className="font-light tracking-wide flex flex-col gap-1"
        >
          <p className="font-medium mb-2">Subir imagen</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={!image ? assets.Upload_area : URL.createObjectURL(image)}
              alt="Upload preview"
              className="mt-2 h-18 w-18 object-cover border-2 border-dashed border-gray-300 hover:border-indigo-600 transition-colors"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            id="image"
            hidden
            required
          />

          <div className="w-full flex flex-row gap-4">
            <div className="w-full flex flex-col gap-1">
              <p className="mt-6 font-medium">Titulo del blog</p>
              <input
                type="text"
                placeholder="Ingresar el titulo"
                required
                className={`w-full max-w-lg p-3 border outline-none focus:border-orange-600 transition-colors ${darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
                  }`}
                onChange={onChangeblogData}
                value={blogData.title}
                name="title"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <p className="w-full mt-6 font-medium">Subtitulo</p>
              <input
                type="text"
                placeholder="Ingresa el subtitulo del blog"
                required
                className={`w-full max-w-lg p-3 border outline-none focus:border-orange-600 transition-colors ${darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300"
                  }`}
                onChange={onChangeblogData}
                value={blogData.subTitle}
                name="subTitle"
              />
            </div>
          </div>

          <p className="mt-6 font-medium mb-2">Descripcion del blog</p>
          <div className="w-full pb-16 sm:pb-10 relative">
            {/* Contenedor del editor - Quill agregará su propia estructura */}
            <div
              ref={editorRef}
              className={`min-h-[250px] border border-gray-300 overflow-hidden ${darkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300"
                }`}
            />

            {isAdding && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-8 h-8-full border-2 border-t-white animate-spin"></div>
              </div>
            )}

            <button
              type="button"
              onClick={generateContent}
              disabled={isAdding || !blogData.title}
              className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-2 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 z-10"
            >
              {isAdding ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  Generando...
                </>
              ) : (
                "Generar con IA ✨"
              )}
            </button>
          </div>

          {!blogData.title && (
            <p className="text-xs text-gray-500 mt-1">
              * Agrega un titulo para habilitar la IA
            </p>
          )}

          <p className="mt-6 font-medium mb-2">Categoria del blog</p>
          <select
            onChange={onChangeblogData}
            value={blogData.category}
            name="category"
            className="mt-2 px-4 py-2.5 text-gray-700 border border-gray-300 outline-none focus:border-orange-600 transition-colors cursor-pointer"
          >
            {blogCategories.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="publish"
              checked={blogData.isPublished}
              onChange={onChangeblogData}
              name="isPublished"
              className="w-5 h-5 cursor-pointer accent-slate-800"
            />
            <label htmlFor="isPublished" className="font-medium cursor-pointer">
              Publicar Ahora
            </label>
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className={`w-40 py-3 font-medium cursor-pointer hover:bg-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed 
              ${darkMode ? "text-slate-100 border border-slate-100 hover:bg-zinc-100 hover:text-slate-900" : "text-slate-900 border border-slate-900 hover:bg-zinc-900 hover:text-slate-100"
              }`}
          >
            {isAdding ? "Agregando..." : "Agregar blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
