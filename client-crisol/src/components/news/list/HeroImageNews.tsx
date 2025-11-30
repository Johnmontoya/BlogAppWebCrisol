import { useContext } from "react";
import type { INewsData } from "../../../interfaces/news";
import { UserContext } from "../../../contexts/UserContextProvider";
import { SlClose } from "react-icons/sl";
import { MdPublishedWithChanges } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../../alerts/SweetAlertas";
import { useDeleteNewsMutation, useStateNewsMutation } from "../../../queries/news.query";

interface HeroImageNewsProps {
  news: INewsData;
}

const HeroImageNews = ({ news }: HeroImageNewsProps) => {
  const { darkMode } = useContext(UserContext);
  const { _id, category, title, contentHero, createdAt, isPublished } = news;
  const queryClient = useQueryClient();
  const deleteNews = useDeleteNewsMutation();
  const stateNews = useStateNewsMutation();

  // Validación de contentHero
  if (!contentHero) {
    return null;
  }

  function deleteOneNews() {
    SweetAlertas.OnDialogChoose({
      message: `Estas seguro de eliminar la noticia ${title}`,
      onConfirm: ConfirmDeleteNews,
      onCancel: Cancel,
    });
  }

  const Cancel = () => {};

  const ConfirmDeleteNews = () => {
    deleteNews.mutateAsync(
      {
        id: _id,
      },
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
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

  const ChangeState = () => {
    stateNews.mutateAsync(
      {
        id: _id,
      },{
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
          SweetAlertas.OnDialogSuccess({
            message: response.data.message
          })
        },
        onError: (error: any) => {
          SweetAlertas.OnDialogFail({
            message: error.response.data.message
          })
        }
      }
    )
  }

  return (
    <>
      <div className="flex flex-row justify-evenly gap-4 relative w-ful mb-1">
        <button
          type="button"
          onClick={ChangeState}
          className="flex items-center cursor-pointer gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 active:scale-95 transition"
        >
          <MdPublishedWithChanges size={22} className="text-blue-700" />
          {isPublished ? "Publicado" : "No publicado"}
        </button>

        <button
          type="button"
          onClick={deleteOneNews}
          className="flex items-center cursor-pointer gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 active:scale-95 transition"
        >
          <SlClose size={22} className="text-red-700" />
          Eliminar
        </button>
      </div>
      <div
        className={`rounded-lg shadow-xl overflow-hidden mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          src={contentHero.imageUrl as string}
          alt={title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <span
            className={`text-xs font-semibold uppercase tracking-wide mb-2 block ${
              darkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {category}
          </span>

          <h2
            className={`text-3xl font-bold mb-3 ${
              darkMode ? "text-slate-100" : "text-gray-900"
            }`}
          >
            {title}
          </h2>

          <p
            className={`text-lg mb-4 ${
              darkMode ? "text-slate-300" : "text-gray-700"
            }`}
          >
            {contentHero.description}
          </p>

          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {createdAt}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroImageNews;
