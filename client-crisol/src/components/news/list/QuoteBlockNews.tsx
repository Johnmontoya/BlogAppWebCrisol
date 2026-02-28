import { SlClose } from "react-icons/sl";
import type { INewsData } from "../../../interfaces/news";
import SweetAlertas from "../../alerts/SweetAlertas";
import {
  useDeleteNewsMutation,
  useStateNewsMutation,
} from "../../../queries/news.query";
import { useQueryClient } from "@tanstack/react-query";
import { MdPublishedWithChanges } from "react-icons/md";

interface IQuoteNewsProps {
  news: INewsData;
}

const QuoteBlockNews = ({ news }: IQuoteNewsProps) => {
  const { _id, contentQuote, title, category, isPublished } = news;
  const queryClient = useQueryClient();
  const deleteNews = useDeleteNewsMutation();
  const stateNews = useStateNewsMutation();

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
      },
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError: (error: any) => {
          SweetAlertas.OnDialogFail({
            message: error.response.data.message,
          });
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-row justify-evenly gap-4 relative w-ful mb-1">
        <button
          type="button"
          onClick={ChangeState}
          className="flex items-center cursor-pointer gap-2.5 border border-gray-300/30 px-4 py-1 text-sm text-indigo-400 hover:bg-indigo-500/10 border-indigo-500 hover:text-indigo-500 active:scale-95 transition"
        >
          <MdPublishedWithChanges size={22} className="text-indigo-500" />
          {isPublished ? "Publicado" : "No publicado"}
        </button>

        <button
          type="button"
          onClick={deleteOneNews}
          className="flex items-center cursor-pointer gap-2.5 border border-gray-500/30 px-4 py-1 text-sm text-red-400 hover:bg-red-500/10 border-red-500 hover:text-orange-500 active:scale-95 transition"
        >
          <SlClose size={22} className="text-red-500" />
          Eliminar
        </button>
      </div>
      <div className="border border-indigo-400 text-white p-8 shadow-xl mb-8">
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
  );
};

export default QuoteBlockNews;
