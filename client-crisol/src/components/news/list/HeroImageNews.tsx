import { useContext } from "react";
import type { INewsData } from "../../../interfaces/news";
import { UserContext } from "../../../contexts/UserContextProvider";
import { SlClose } from "react-icons/sl";
import { MdPublishedWithChanges } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../../alerts/SweetAlertas";
import { useDeleteNewsMutation, useStateNewsMutation } from "../../../queries/news.query";
import moment from "moment";

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

  const Cancel = () => { };

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
      }, {
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
          className="flex items-center cursor-pointer gap-2.5 border border-gray-300/30 px-4 py-1 text-sm text-indigo-400 hover:bg-indigo-500/10 border-indigo-500 hover:text-indigo-500 active:scale-95 transition"
        >
          <MdPublishedWithChanges size={22} className="text-indigo-400" />
          {isPublished ? "Publicado" : "No publicado"}
        </button>

        <button
          type="button"
          onClick={deleteOneNews}
          className="flex items-center cursor-pointer gap-2.5 border border-gray-500/30 px-4 py-1 text-sm text-red-400 hover:bg-red-500/10 border-red-500 hover:text-orange-500 active:scale-95 transition"
        >
          <SlClose size={22} className="text-red-400" />
          Eliminar
        </button>
      </div>
      <article
        className={`group overflow-hidden mb-12 border-b border-black dark:border-zinc-800 pb-8 transition-colors ${darkMode ? "bg-brand-dark" : "bg-brand-light"
          }`}
      >
        <div className="relative overflow-hidden mb-6 border border-black dark:border-zinc-800">
          <img
            src={contentHero?.imageUrl as string}
            alt={title}
            className="w-full h-80 object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
          />
        </div>

        <div>
          <span
            className={`text-xs font-bold uppercase tracking-widest mb-3 block text-accent`}
          >
            {category}
          </span>

          <h2
            className={`font-serif text-3xl font-black leading-tight mb-4 group-hover:text-accent transition-colors duration-300 ${darkMode ? "text-slate-100" : "text-ink"
              }`}
          >
            {title}
          </h2>

          <p
            className={`font-light mb-6 leading-relaxed ${darkMode ? "text-slate-400" : "text-ink-light"
              }`}
          >
            {contentHero?.description}
          </p>

          <time
            className={`text-xs font-medium tracking-widest uppercase ${darkMode ? "text-zinc-500" : "text-zinc-400"
              }`}
          >
            {moment(createdAt).format("MMM DD, YYYY")}
          </time>
        </div>
      </article>
    </>
  );
};

export default HeroImageNews;
