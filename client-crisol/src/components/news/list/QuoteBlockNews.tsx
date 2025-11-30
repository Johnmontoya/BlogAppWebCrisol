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
  );
};

export default QuoteBlockNews;
