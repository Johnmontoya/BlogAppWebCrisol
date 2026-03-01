import { useContext, useState } from "react";
import { useGetBlogQueries } from "../../queries/blog.query";
import type { Iblogs } from "../../interfaces/blog";
import BlogCard from "./BlogCard";
import { blogCategories } from "../../assets/assets";
import { UserContext } from "../../contexts/UserContextProvider";
import NewsPages from "../news/NewsPages";
import BlogCardSkeleton from "./BlogCardSkeleton";
import NewsSkeleton from "../news/NewsSkeleton";

const Blog = () => {
  const { darkMode, input } = useContext(UserContext);
  const [menu, setMenu] = useState("Todo");
  const [data] = useGetBlogQueries();
  const isLoading = data.isLoading;
  const blogs: any = data.data;

  const filteredBlogs = () => {
    let filtered = blogs;

    // Filtrar por búsqueda
    if (input !== "") {
      filtered = filtered?.filter(
        (blog: any) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (menu !== "Todo") {
      filtered = filtered?.filter((blog: any) => blog.category === menu);
    }

    return filtered;
  };

  const blogsToDisplay = filteredBlogs();

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20">
        {/* Categories Filter */}
        <section className="mb-16 border-b border-black dark:border-zinc-800 pb-8">
          <h2 className="text-xs font-medium tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-black dark:bg-zinc-800"></span>
            The Index
          </h2>
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((item) => (
              <button
                key={item.name}
                onClick={() => setMenu(item.name)}
                className={`px-5 py-2 text-sm font-medium tracking-wide transition-all border ${menu === item.name
                  ? "bg-ink text-white border-ink dark:bg-white dark:text-ink dark:border-white"
                  : darkMode
                    ? "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-400"
                    : "border-black/10 text-ink hover:border-black"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span className="opacity-70">{item.icon}</span>
                  <span className="uppercase">{item.name}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
          {/* Articles Grid */}
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
              {isLoading ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <BlogCardSkeleton key={i} />
                  ))}
                </>
              ) : blogsToDisplay?.blogs?.length === 0 ? (
                <div className="w-full h-64 flex justify-center items-center col-span-2 border border-dashed border-black dark:border-zinc-800 text-xl font-serif italic text-ink-light">
                  No se encontraron articulos en esta edicion.
                </div>
              ) : (
                <>
                  {blogsToDisplay?.blogs?.map((item: Iblogs, index: number) => (
                    <BlogCard key={index} blog={item} author={item.author} />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Sidebar / Noticias */}
          <div className="xl:col-span-4 border-t xl:border-t-0 xl:border-l border-black dark:border-zinc-800 pt-12 xl:pt-0 xl:pl-12">
            <h3 className="font-serif text-3xl font-bold mb-8 italic tracking-tight">
              Ultimas Noticias
            </h3>
            {isLoading ? <NewsSkeleton /> : <NewsPages />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
