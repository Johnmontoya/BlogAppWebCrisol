import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Sidebar from "../../components/Sidebar";
import { useGetOwnBlogQueries } from "../../queries/blog.query";
import { useAuthStore } from "../../store/auth";
import BlogTableItem from "../../components/blog/BlogTableItem";

const ListBlog = () => {
  const userId = useAuthStore((state) => state.userId);
  const { darkMode } = useContext(UserContext);

  const data = useGetOwnBlogQueries(userId);
  const blogs = data.data?.blogs;
  const isLoading = data.isLoading;

  return (
    <div
      className={`border-b ${darkMode
        ? "bg-brand-dark text-slate-100"
        : "bg-brand-light text-slate-900"
        }`}
    >
      <Sidebar />
      <div className={`flex-1 max-w-7xl p-4 md:p-10 m-auto`}>
        <div>
          <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
              Todos tus blogs.
            </h1>
            <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
              Listado de todos tus blogs registrados en el sistema.
            </p>
          </div>

          <div
            className={`relative max-w-7xl overflow-x-auto shadow scrollbar-hide ${darkMode ? "bg-zinc-900" : "bg-white"
              }`}
          >
            <table className={`w-full text-sm ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
              <thead className="text-xs text-gray-500 text-left uppercase">
                <tr className="font-serif">
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    #{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Título del blog{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Fecha{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Estados{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Acciones{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
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
