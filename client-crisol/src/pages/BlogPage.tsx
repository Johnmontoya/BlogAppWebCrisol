import { useLocation } from "react-router-dom";
import { useGetBlogIdQueries } from "../queries/blog.query";
import ArticleSkeleton from "../components/blog/ArticleSkeleton";
import moment from "moment";
import { SlSocialGoogle } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { UserContext } from "../contexts/UserContextProvider";
import type { IComment } from "../interfaces/comment";
import {
  useCreateCommentMutation,
  useGetCommentBlogQueries,
} from "../queries/comment.query";
import { FaUserTie, FaRegCommentDots } from "react-icons/fa6";
import useInputs from "../hooks/useInputs";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../components/alerts/SweetAlertas";
import { FaShareAlt } from "react-icons/fa";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BlogPage = () => {
  const queryClient = useQueryClient();
  const createCommentMutation = useCreateCommentMutation();
  const { darkMode } = useContext(UserContext);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commmentData, onChangeCommentData, setCommmentData] = useInputs({
    name: "",
    content: "",
  });

  const queryUrl = useQuery();
  const id = queryUrl.get("id");

  const data = useGetBlogIdQueries(id!);
  const isLoading = data.isLoading;
  const blog = data.data?.blog;

  const comment = useGetCommentBlogQueries(blog?._id!);

  useEffect(() => {
    setComments([]);
    setCommmentData({
      name: "",
      content: "",
    });
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (comment.data?.comments) {
      setComments(comment.data.comments);
    }
  }, [comment.data, id]);

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation.mutateAsync(
      {
        blog: id!,
        name: commmentData.name,
        content: commmentData.content,
      },
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries({ queryKey: ["comments", id] });
          await queryClient.invalidateQueries({ queryKey: ["blog", id] });

          setCommmentData({
            name: "",
            content: "",
          });
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

  if (!id || isLoading) {
    return (
      <div className={`w-full min-h-screen ${darkMode ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <ArticleSkeleton />
      </div>
    );
  }

  return (
    <article className={`min-h-screen relative overflow-x-hidden ${darkMode ? "bg-[#0B0F19] text-slate-200" : "bg-slate-50 text-slate-800"}`}>
      {/* Background Decoratives */}
      <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 animate-pulse ${darkMode ? 'bg-indigo-600/40' : 'bg-blue-400/30'}`} style={{ animationDuration: '4s' }} />
        <div className={`absolute top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse ${darkMode ? 'bg-purple-600/40' : 'bg-indigo-400/30'}`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <header className="w-full pt-32 pb-20 px-6 sm:px-8 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border ${darkMode ? 'bg-white/5 border-white/10 text-indigo-300' : 'bg-black/5 border-black/10 text-indigo-700'} shadow-sm transition-transform hover:scale-105`}>
              {blog?.category}
            </span>
          </div>

          <h1 className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-8 drop-shadow-sm ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-200' : 'text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800'}`}>
            {blog?.title}
          </h1>

          <h2 className={`text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {blog?.subTitle}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <div className={`flex items-center gap-3 px-6 py-2 rounded-full border backdrop-blur-sm ${darkMode ? 'bg-slate-800/40 border-slate-700/50 text-slate-300' : 'bg-white/60 border-slate-200 text-slate-600'} shadow-sm`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner">
                <FaUserTie size={14} />
              </div>
              <span className="tracking-wide">Written by <strong className={darkMode ? 'text-white' : 'text-indigo-900'}>{"usuario"}</strong></span>
            </div>
            <div className={`h-1 w-1 rounded-full ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <time dateTime={blog?.createdAt} className={`tracking-widest uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {moment(blog?.createdAt).format("MMMM Do YYYY")}
            </time>
          </div>
        </div>
      </header>

      {/* Hero Divider */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-16">
        <div className={`w-full h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 relative">

        {/* Floating Social Share (Sidebar on lg, top below header on mobile) */}
        <div className="hidden lg:block lg:w-20 shrink-0">
          <div className="sticky top-32 flex flex-col items-center gap-6">
            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] transform -rotate-90 origin-center mb-8 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Share</span>
            <div className={`w-px h-12 mb-4 ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />

            <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/25 ${darkMode ? 'bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600'}`}>
              <CiFacebook size={22} />
            </button>
            <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-sky-500/25 ${darkMode ? 'bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:text-sky-500'}`}>
              <CiTwitter size={22} />
            </button>
            <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/25 ${darkMode ? 'bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:text-red-500'}`}>
              <SlSocialGoogle size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-3xl flex-1 mx-auto lg:mx-0">

          {/* Article Body */}
          <div
            className={`prose prose-lg md:prose-xl max-w-none mb-24 font-sans leading-loose tracking-wide
              ${darkMode
                ? 'prose-invert prose-p:text-slate-300 prose-headings:text-indigo-50 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-900/10 prose-blockquote:text-slate-200 prose-img:rounded-2xl prose-img:shadow-2xl'
                : 'prose-p:text-slate-700 prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-strong:text-slate-900 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:text-slate-800 prose-img:rounded-2xl prose-img:shadow-xl'
              }`}
            dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
          />

          {/* Mobile Share section */}
          <div className="lg:hidden mb-16 flex flex-col items-center justify-center py-10 border-t border-b border-opacity-20 border-slate-500">
            <h3 className={`text-sm tracking-[0.2em] uppercase font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <FaShareAlt /> Share Article
            </h3>
            <div className="flex gap-4">
              <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600'}`}>
                <CiFacebook size={22} />
              </button>
              <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-sky-500'}`}>
                <CiTwitter size={22} />
              </button>
              <button className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-red-500'}`}>
                <SlSocialGoogle size={18} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <FaRegCommentDots className={`text-3xl ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
                Discourse <span className={`text-lg ml-2 px-3 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>{comments.length}</span>
              </h3>
            </div>

            <div className="space-y-8 mb-16">
              {comments.length > 0 ? (
                comments.map((item) => (
                  <div key={item._id} className={`p-6 md:p-8 rounded-2xl backdrop-blur-sm border shadow-sm transition-all hover:shadow-md ${darkMode ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' : 'bg-white/70 border-slate-200 hover:bg-white'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                        <FaUserTie size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <time className={`text-xs uppercase font-semibold tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {moment(item.createdAt).fromNow()}
                        </time>
                      </div>
                    </div>
                    <p className={`text-base font-light leading-relaxed pl-16 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className={`p-12 rounded-3xl border-2 border-dashed text-center flex flex-col items-center justify-center ${darkMode ? 'border-slate-800 bg-slate-900/20 text-slate-500' : 'border-slate-200 bg-slate-50/50 text-slate-400'}`}>
                  <FaRegCommentDots size={48} className="mb-4 opacity-20" />
                  <p className="font-serif text-2xl italic mb-2 text-slate-400">
                    The silence is pristine.
                  </p>
                  <p className="text-sm uppercase tracking-widest font-semibold">Be the first to reflect.</p>
                </div>
              )}
            </div>

            {/* Comment Form */}
            <div className={`relative overflow-hidden p-8 md:p-10 rounded-3xl border shadow-xl ${darkMode ? 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-slate-700/50' : 'bg-white border-slate-100'}`}>

              {/* Decorative gradient orb inside form */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

              <h4 className="font-serif text-2xl font-bold tracking-tight mb-8 relative z-10 flex items-center gap-3">
                <span className={`w-2 h-8 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
                Contribute to the Discourse
              </h4>

              <form onSubmit={addComment} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-bold tracking-widest uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Identifier or Alias
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={onChangeCommentData}
                    value={commmentData.name}
                    required
                    placeholder="Enter your name"
                    className={`w-full px-5 py-4 text-base rounded-xl border focus:outline-none focus:ring-4 transition-all duration-300 ${darkMode
                      ? 'bg-slate-900/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-slate-400'
                      }`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-bold tracking-widest uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Your Reflection
                  </label>
                  <textarea
                    name="content"
                    onChange={onChangeCommentData}
                    value={commmentData.content}
                    required
                    placeholder="Share your thoughts on this article..."
                    className={`w-full px-5 py-4 text-base rounded-xl border focus:outline-none focus:ring-4 transition-all duration-300 resize-none h-36 ${darkMode
                      ? 'bg-slate-900/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-slate-400'
                      }`}
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className={`px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm shadow-lg transition-all duration-300 hover:-translate-y-1 ${darkMode
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/30'
                      : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-500/30'
                      }`}
                  >
                    Submit Reflection
                  </button>
                </div>
              </form>
            </div>
          </section>

        </div>
      </div>
    </article>
  );
};

export default BlogPage;