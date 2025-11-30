import { useContext, useState } from "react";
import { useGetBlogQueries } from "../../queries/blog.query";
import type { Iblogs } from "../../interfaces/blog";
import BlogCard from "./BlogCard";
import { blogCategories } from "../../assets/assets";
import LoadingFallback from "../fallbacks/LoadingFallback";
import { UserContext } from "../../contexts/UserContextProvider";
import NewsPages from "../news/NewsPages";

const Blog = () => {
  const { darkMode, input } = useContext(UserContext);
  const [menu, setMenu] = useState("Todo");
  const [data] = useGetBlogQueries();
  const isLoading = data.isLoading;
  const blogs = data.data;

  const filteredBlogs = () => {
    let filtered = blogs;

    // Filtrar por búsqueda
    if (input !== "") {
      filtered = filtered?.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (menu !== "Todo") {
      filtered = filtered?.filter((blog) => blog.category === menu);
    }

    return filtered;
  };

  const blogsToDisplay = filteredBlogs();

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <LoadingFallback />
        </div>
      ) : (
        <>
          <div>
            {/* Categories Filter */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-center text-sm font-semibold text-gray-500 mb-6">
                EXPLORA DIFERENTES TEMAS
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {blogCategories.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setMenu(item.name)}
                    className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${
                      menu === item.name
                        ? "bg-indigo-600 text-white"
                        : darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </section>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Articles Grid */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogsToDisplay?.length === 0 ? (
                      <div className="w-full flex justify-center items-center font-bold">
                        No hay blogs
                      </div>
                    ) : (
                      <>
                        {blogsToDisplay?.map((item: Iblogs, index) => (
                          <BlogCard key={index} blog={item} author={item.author} />
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/**Noticias */}
                <NewsPages />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
