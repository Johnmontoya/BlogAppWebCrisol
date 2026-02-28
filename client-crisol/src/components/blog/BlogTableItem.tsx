import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { IBlogTableItemProps } from "../../interfaces/blog";
import {
  useDeleteBlogMutation,
  useToggleBlogMutation,
} from "../../queries/blog.query";
import SweetAlertas from "../alerts/SweetAlertas";
import { CiTrash } from "react-icons/ci";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

const BlogTableItem: React.FC<IBlogTableItemProps> = ({ blog, index }) => {
  const { darkMode } = useContext(UserContext);
  const queryClient = useQueryClient();
  const togglePublish = useToggleBlogMutation();
  const deleteBlog = useDeleteBlogMutation();

  const { _id, title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  function deleteOneBlog() {
    SweetAlertas.OnDialogChoose({
      message: `Estas seguro de eliminar el blog ${title}`,
      onConfirm: ConfirmDeleteBlog,
      onCancel: Cancel,
    });
  }

  const Cancel = () => { };

  const ChangeTogglePublish = () => {
    togglePublish.mutateAsync(
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

  const ConfirmDeleteBlog = () => {
    deleteBlog.mutateAsync(
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

  return (
    <tr className={`font-light tracking-wide border-y border-gray-300 transition-all duration-500 ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
      <th scope="row" className="px-2 py-4 font-medium">
        {index}
      </th>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-light">{title}</td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-light">{BlogDate.toDateString()}</td>
      <td className="px-4 py-4">
        <div className="flex justify-between text-xs gap-3">
          <button
            onClick={ChangeTogglePublish}
            className={`border px-3 py-1.5 rounded cursor-pointer transition-colors hover:shadow-md ${blog.isPublished
              ? "border-indigo-400 text-indigo-400 hover:bg-indigo-50/10"
              : "border-red-600 text-red-700 hover:bg-red-50"
              }`}
          >
            {isPublished ? "Publicado" : "No Publicado"}
          </button>
        </div>
      </td>
      <td className="p-5 whitespace-nowrap text-sm leading-6 font-light text-gray-900">
        <CiTrash
          size={26}
          onClick={deleteOneBlog}
          className="hover:scale-110 text-red-600 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
