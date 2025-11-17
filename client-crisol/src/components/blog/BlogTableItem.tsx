import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuthContext } from "../../components/auth/AuthProvider";
import Swal from "sweetalert2";

export interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogTableItemProps {
  blog: Blog;
  fetchBlogs: () => void | Promise<void>;
  index: number;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({
  blog,
  fetchBlogs,
  index,
}) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const { axios: axiosInstance } = useAuthContext();

  // Función de utilidad para manejar errores de Axios
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return err.response.data.message;
      }
      return err.message;
    }
    return "An unexpected error occurred.";
  };

  const deleteBlog = async () => {
    Swal.fire({
      title: "Estas seguro de eliminar ese blog?",
      text: "La acción no se podrá revertír",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axiosInstance.delete(
            `https://backendcrisolideas.onrender.com/api/v1/blog/delete/${blog._id}`
          );
          await fetchBlogs();
          Swal.fire({
            title: "Borrado!",
            text: "Tu archivo ha sido borrado.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };

  const handleTogglePublish = async () => {
    try {
      const { data } = await axiosInstance.put(
        "https://backendcrisolideas.onrender.com/api/v1/blog/toggle-publish",
        { id: blog._id }
      );
      if (data.valid === "success") {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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
            isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {isPublished ? "Publicado" : "No publicado"}
        </p>
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-between text-xs gap-3">
          <button
            onClick={handleTogglePublish}
            className={`border px-3 py-1.5 rounded cursor-pointer transition-colors hover:shadow-md ${
              blog.isPublished
                ? "border-orange-600 text-orange-700 hover:bg-orange-50"
                : "border-green-600 text-green-700 hover:bg-green-50"
            }`}
          >
            {isPublished ? "No publicado" : "Publicado"}
          </button>
          <AiOutlineDelete
            size={28}
            onClick={deleteBlog}
            className="hover:scale-110 text-red-600 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
