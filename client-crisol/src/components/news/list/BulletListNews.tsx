import { useQueryClient } from "@tanstack/react-query";
import type { INewsData } from "../../../interfaces/news";
import { FaCheckCircle } from "react-icons/fa";
import {
  useDeleteNewsMutation,
  useStateNewsMutation,
} from "../../../queries/news.query";
import SweetAlertas from "../../alerts/SweetAlertas";
import { SlClose } from "react-icons/sl";
import { MdPublishedWithChanges } from "react-icons/md";

interface IBulletNewsProps {
  news: INewsData;
}

const BulletListNews = ({ news }: IBulletNewsProps) => {
  const { _id, category, contentBullet, title, isPublished } = news;
  const listBull = contentBullet?.points.split(",");
  const stateNews = useStateNewsMutation();
  const queryClient = useQueryClient();
  const deleteNews = useDeleteNewsMutation();

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
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-8">
        <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2 block">
          {category}
        </span>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <ul>
          {listBull?.map((item, index) => (
            <li key={index} className="flex items-start lg:col-span-1">
              <div className="shrink-0">
                <FaCheckCircle size={18} className="text-teal-400" />
              </div>
              <p className="ml-3 leading-5 text-gray-400">{item}</p>
            </li>
          ))}
        </ul>

        {contentBullet?.author && (
          <p className="text-sm text-gray-500 mt-4">
            Por: {contentBullet.author}
          </p>
        )}
      </div>
    </>
  );
};

export default BulletListNews;
