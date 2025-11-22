import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import type { IBlogTableItemProps } from "../../interfaces/blog";
import {
  useDeleteBlogMutation,
  useToggleBlogMutation,
} from "../../queries/blog.query";
import SweetAlertas from "../alerts/SweetAlertas";

const BlogTableItem: React.FC<IBlogTableItemProps> = ({ blog, index }) => {
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

  const Cancel = () => {};

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
    <tr className="border-y border-gray-300 hover:bg-gray-300 transition-colors">
      <th scope="row" className="px-2 py-4 font-medium text-gray-900">
        {index}
      </th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`font-medium ${
            isPublished ? "text-green-600" : "text-red-700"
          }`}
        >
          {isPublished ? "Publicado" : "No Publicado"}
        </p>
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-between text-xs gap-3">
          <button
            onClick={ChangeTogglePublish}
            className={`border px-3 py-1.5 rounded cursor-pointer transition-colors hover:shadow-md ${
              blog.isPublished
                ? "border-green-600 text-green-700 hover:bg-green-50"
                : "border-red-600 text-red-700 hover:bg-red-50"
            }`}
          >
            {isPublished ? "Publicado" : "No Publicado"}
          </button>
          <AiOutlineDelete
            size={28}
            onClick={deleteOneBlog}
            className="hover:scale-110 text-red-600 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
