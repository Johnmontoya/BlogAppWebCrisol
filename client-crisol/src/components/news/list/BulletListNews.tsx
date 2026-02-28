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
      <div>
        <div className="border-b border-gray-500 text-white p-6 mb-8">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2 block">
            {category}
          </span>
          <h2 className="font-serif text-slate-800 text-2xl font-bold mb-4">{title}</h2>

          <ul>
            {listBull?.map((item, index) => (
              <li key={index} className="flex items-start lg:col-span-1">
                <div className="shrink-0">
                  <FaCheckCircle size={18} className="text-indigo-400" />
                </div>
                <p className="font-light tracking-wide ml-3 leading-5 text-gray-400">{item}</p>
              </li>
            ))}
          </ul>

          {contentBullet?.author && (
            <p className="text-sm text-gray-500 mt-4">
              Por: {contentBullet.author}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BulletListNews;
