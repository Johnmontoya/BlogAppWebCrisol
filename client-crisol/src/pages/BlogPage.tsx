import { useLocation } from "react-router-dom";
import { useGetBlogIdQueries } from "../queries/blog.query";
import LoadingFallback from "../components/fallbacks/LoadingFallback";
import moment from "moment";
import { SlSocialGoogle } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { UserContext } from "../contexts/UserContextProvider";
import type { IComment } from "../interfaces/comment";
import {
  useCreateCommentMutation,
  useGetCommentBlogQueries,
} from "../queries/comment.query";
import { FaUserTie } from "react-icons/fa6";
import Footer from "../components/Footer";
import useInputs from "../hooks/useInputs";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../components/alerts/SweetAlertas";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BlogPage = () => {
  const queryClient = useQueryClient();
  const createCommentMutation = useCreateCommentMutation();
  const { darkMode } = useContext(UserContext);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commmentData, onChangeCommentData, setCommmentData] = useInputs({
    name: "",
    content: "",
  });

  const queryUrl = useQuery();
  const id = queryUrl.get("id");

  const data = useGetBlogIdQueries(id!);
  const isLoading = data.isLoading;
  const blog = data.data?.blog;

  const comment = useGetCommentBlogQueries(blog?._id!);

  useEffect(() => {
    setComments([]);
    
    setCommmentData({
      name: "",
      content: "",
    });
    
    window.scrollTo(0, 0);
  }, [id]); 

  useEffect(() => {
    if (comment.data?.comments) {
      setComments(comment.data.comments);
    }
  }, [comment.data, id]);

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation.mutateAsync(
      {
        blog: id!,
        name: commmentData.name,
        content: commmentData.content,
      },
      {
        onSuccess: async (response: any) => {
          console.log(response);
          // ✅ Invalidar solo las queries del blog actual
          await queryClient.invalidateQueries({ queryKey: ['comments', id] });
          await queryClient.invalidateQueries({ queryKey: ['blog', id] });
          
          setCommmentData({
            name: "",
            content: "",
          });
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError(error: any) {
          SweetAlertas.OnDialogFail({
            message: error.response.data.message,
          });
        },
      }
    );
  };

  // ✅ Mostrar loading mientras cambia el blog
  if (!id || isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-slate-100 border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="h-auto">
        <div className="text-center pt-20 text-gray-600">
          <p className="text-indigo-600 py-4 font-medium">
            Publicado en {moment(blog?.createdAt).format("MMMM Do YYYY")}
          </p>
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto">
            {blog?.title}
          </h1>
          <h2 className="my-5 max-w-lg mx-auto">{blog?.subTitle}</h2>
          <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-indigo-600/35 bg-indigo-600/5 font-medium text-gray-400">
            {blog?.category}
          </p>
        </div>

        <div className="mx-5 max-w-5xl md:mx-auto mb-20">
          <div
            className="rich-text max-w-3xl mx-auto prose prose-lg text-center"
            dangerouslySetInnerHTML={{ __html: blog?.description! }}
          ></div>

          <div className="mt-14 mb-10 max-w-3xl mx-auto">
            <p className="font-semibold mb-4 text-xl">
              Comentarios ({comments.length})
            </p>

            {comments.length > 0 ? (
              <div className="flex flex-col gap-4">
                {comments.map((item) => (
                  <div
                    key={item._id} // ← Usa _id en lugar de index
                    className="relative bg-indigo-600/5 border border-indigo-600/10 max-w-xl p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FaUserTie className="w-6 h-6 text-indigo-600" />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm max-w-md ml-8 mt-2">
                      {item.content}
                    </p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500">
                      {moment(item.createdAt).fromNow()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No hay comentarios aún. Sé el primero!
              </p>
            )}
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="font-semibold mb-4 text-xl">Agrega un comentario</p>
            <form
              onSubmit={addComment}
              className="flex flex-col items-start gap-4 max-w-lg"
            >
              <input
                type="text"
                onChange={onChangeCommentData}
                value={commmentData.name}
                name="name"
                placeholder="Tu nombre"
                required
                className={`w-full p-3 border rounded outline-none focus:border-indigo-600 transition-colors ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <textarea
                placeholder="Tu comentario"
                onChange={onChangeCommentData}
                value={commmentData.content}
                name="content"
                className={`w-full p-3 border rounded outline-none h-32 focus:border-indigo-600 transition-colors resize-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2.5 rounded hover:bg-indigo-700 transition-colors font-medium"
              >
                Enviar comentario
              </button>
            </form>
          </div>

          {/* Share Buttons */}
          <div className="max-w-3xl mx-auto">
            <p className="font-semibold my-4 text-lg">
              Comparte este artículo en las redes sociales
            </p>
            <div className="flex gap-4">
              <button className="hover:scale-110 transition-transform">
                <CiFacebook className="w-8 h-8 cursor-pointer hover:text-indigo-600 transition-colors" />
              </button>
              <button className="hover:scale-110 transition-transform">
                <CiTwitter className="w-8 h-8 cursor-pointer hover:text-indigo-600 transition-colors" />
              </button>
              <button className="hover:scale-110 transition-transform">
                <SlSocialGoogle className="w-8 h-8 cursor-pointer hover:text-indigo-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;