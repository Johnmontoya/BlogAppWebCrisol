import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Sidebar from "../../components/Sidebar";
import { useGetOwnBlogQueries } from "../../queries/blog.query";
import { useAuthStore } from "../../store/auth";
import BlogTableItem from "../../components/blog/BlogTableItem";

const ListBlog = () => {
  const userId = useAuthStore((state) => state.userId);
  const {darkMode } = useContext(UserContext);

  const data = useGetOwnBlogQueries(userId);
  const blogs = data.data?.blogs;
  const isLoading = data.isLoading;

  return (
    <div
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900 text-slate-100"
          : "border-gray-200 bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />
      <div className={`flex-1 max-w-7xl p-4 md:p-10 m-auto`}>
        <div>
          <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
            <p>Todos tus blogs</p>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No hay blogs recientes
                    </td>
                  </tr>
                ) : (
                  blogs?.map((blog, index) => {
                    return (
                      <BlogTableItem
                        key={blog._id}
                        blog={blog}
                        index={index + 1}
                      />
                    );
                  })
                )}                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
