import { useContext, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { useGetBlogQueries } from "../../queries/blog.query";
import type { Iblogs } from "../../interfaces/blog";
import BlogCard from "./BlogCard";
import { blogCategories } from "../../assets/assets";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import LoadingFallback from "../fallbacks/LoadingFallback";
import { UserContext } from "../../contexts/UserContextProvider";

const experiences = [
  { role: "Product Designer", company: "Pioneer", years: "2023 — Now" },
  { role: "Product Designer", company: "Digital", years: "2020 — 2023" },
  { role: "UX/UI Designer", company: "Digital", years: "2017 — 2020" },
];

const tools = [
  { name: "Figma", desc: "Collaborate and design interfaces in real-time." },
  { name: "Notion", desc: "Plan, track, and collaborate on projects easily." },
  { name: "Photoshop", desc: "Professional image and graphic editing tool." },
  {
    name: "Illustrator",
    desc: "Create stunning vector graphics and illustrations.",
  },
];

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
                          <BlogCard key={index} blog={item} />
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Author Card */}
                  <div
                    className={`rounded-xl p-6 ${
                      darkMode ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                      NOTICIA
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500"></div>
                      <div>
                        <h4 className="font-bold text-lg">Ethan Caldwell</h4>
                        <p className="text-sm text-indigo-600">
                          REFLECTIVE BLOGGER
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm mb-4 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Ethan Caldwell shares thoughtful insights and reflections
                      on life, culture, and personal growth. His work explores
                      the intersection of creativity and meaningful human
                      perspectives.
                    </p>
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        <BsTwitter size={20} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        <FaFacebook size={20} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        <BsInstagram size={20} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-indigo-600"
                      >
                        <BsLinkedin size={20} />
                      </a>
                    </div>
                  </div>

                  {/* NOTICIA */}
                  <div
                    className={`rounded-xl p-6 ${
                      darkMode ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                      NOTICIA
                    </h3>
                    {experiences.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-bold">{exp.role}</h4>
                        <p className="text-sm text-gray-500">{exp.company}</p>
                        <p className="text-sm text-gray-400">{exp.years}</p>
                      </div>
                    ))}
                  </div>

                  {/* TECNOLOGIA */}
                  <div
                    className={`rounded-xl p-6 ${
                      darkMode ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                      TECNOLOGIA
                    </h3>
                    {tools.map((tool, index) => (
                      <div
                        key={index}
                        className="mb-4 flex items-start space-x-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {tool.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
