import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../auth/AuthProvider";
import BlogTableItem from "./BlogTableItem";

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

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { axios: axiosInstance, darkMode } = useAuthContext();

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

  const fetchBlogs = async () => {
    try {
      const { data } = await axiosInstance.get(
        "https://backendcrisolideas.onrender.com/api/v1/blog/all-admin"
      );
      if (data.valid === "success") {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div
      className={`flex-1 p-4 md:p-10 ${
        darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
          <p>Todos los blogs</p>
        </div>

        <div
          className={`relative max-w-7xl overflow-x-auto shadow rounded-lg scrollbar-hide ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-500 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  {" "}
                  #{" "}
                </th>
                <th scope="col" className="px-2 py-4">
                  {" "}
                  Título del blog{" "}
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  {" "}
                  Fecha{" "}
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  {" "}
                  Estados{" "}
                </th>
                <th scope="col" className="px-2 py-4">
                  {" "}
                  Acciones{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => {
                  return (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchBlogs}
                      index={index + 1}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No hay blogs recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
