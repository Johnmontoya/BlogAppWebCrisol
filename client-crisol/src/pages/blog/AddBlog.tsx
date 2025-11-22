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
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900"
          : "border-gray-200 bg-slate-100"
      }`}
    >
      <Sidebar />
      <form
        onSubmit={CreateBlog}
        className={`w-full pt-4 flex justify-center m-auto text-gray-600 mb-6 ${
          darkMode ? "text-slate-100" : "text-slate-900"
        }`}
      >
        <div className="flex flex-col gap-1 justify-center max-w-7xl shadow rounded">
          <h1 className="w-full justify-center text-center text-2xl font-bold mb-4">
            Agregar nuevo blog
          </h1>

          <p className="font-medium mb-2">Subir imagen</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={!image ? assets.Upload_area : URL.createObjectURL(image)}
              alt="Upload preview"
              className="mt-2 h-18 w-18 object-cover rounded border-2 border-dashed border-gray-300 hover:border-indigo-600 transition-colors"
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

          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1">
              <p className="mt-6 font-medium">Titulo del blog</p>
              <input
                type="text"
                placeholder="Ingresar el titulo"
                required
                className="w-full max-w-lg mt-1 p-3 border border-gray-300 outline-none rounded focus:border-indigo-600 transition-colors"
                onChange={onChangeblogData}
                value={blogData.title}
                name="title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="mt-6 font-medium">Subtitulo</p>
              <input
                type="text"
                placeholder="Ingresa el subtitulo del blog"
                required
                className="w-full max-w-lg mt-1 p-3 border border-gray-300 outline-none rounded focus:border-indigo-600 transition-colors"
                onChange={onChangeblogData}
                value={blogData.subTitle}
                name="subTitle"
              />
            </div>
          </div>

          <p className="mt-6 font-medium mb-2">Descripcion del blog</p>
          <div className="max-w-lg pb-16 sm:pb-10 relative">
            {/* Contenedor del editor - Quill agregará su propia estructura */}
            <div
              ref={editorRef}
              className="min-h-[250px] border border-gray-300 rounded overflow-hidden"
            />

            {isAdding && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
                <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
              </div>
            )}

            <button
              type="button"
              onClick={generateContent}
              disabled={isAdding || !blogData.title}
              className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-2 rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 z-10"
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
            className="mt-2 px-4 py-2.5 text-gray-700 border border-gray-300 outline-none rounded focus:border-rose-600 transition-colors cursor-pointer"
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
              className="w-5 h-5 cursor-pointer accent-rose-600"
              onChange={onChangeblogData}
              name="isPublished"
            />
            <label htmlFor="publish" className="font-medium cursor-pointer">
              Publicar Ahora
            </label>
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="mt-8 w-40 h-11 bg-indigo-600 text-white rounded cursor-pointer text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Agregando..." : "Agregar blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
