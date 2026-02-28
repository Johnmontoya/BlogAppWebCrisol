import { useLocation } from "react-router-dom";
import { useGetBlogIdQueries } from "../queries/blog.query";
import LoadingFallback from "../components/fallbacks/LoadingFallback";
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
import { FaUserTie } from "react-icons/fa6";
import useInputs from "../hooks/useInputs";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../components/alerts/SweetAlertas";

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
          console.log(response);
          // ✅ Invalidar solo las queries del blog actual
          await queryClient.invalidateQueries({ queryKey: ['comments', id] });
          await queryClient.invalidateQueries({ queryKey: ['blog', id] });

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

  // ✅ Mostrar loading mientras cambia el blog
  if (!id || isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-brand-light dark:bg-brand-dark">
        <LoadingFallback />
      </div>
    );
  }

  return (
    <article className="max-w-screen-2xl mx-auto flex flex-col items-center pb-24 border-b border-black dark:border-zinc-800">

      {/* Editorial Header Sequence */}
      <header className="w-full text-center px-6 pt-24 pb-16 md:pt-32 md:pb-24 max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest border border-black dark:border-zinc-800 px-4 py-1">
            {blog?.category}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter mb-8">
          {blog?.title}
        </h1>

        <h2 className={`text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-12 ${darkMode ? 'text-slate-300' : 'text-ink-light'}`}>
          {blog?.subTitle}
        </h2>

        <div className={`flex items-center justify-center gap-4 text-sm font-medium uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'} pt-8 border-t border-black/10 dark:border-zinc-800/50 w-full max-w-lg mx-auto`}>
          <time dateTime={blog?.createdAt}>
            {moment(blog?.createdAt).format("MMMM Do YYYY")}
          </time>
          <span>—</span>
          <span>By Author Identity</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl mx-auto px-6">

        {/* Article Body */}
        <div
          className={`prose prose-lg md:prose-xl max-w-none mb-24 font-light leading-relaxed ${darkMode ? 'prose-invert prose-p:text-slate-300 prose-headings:text-slate-100' : 'prose-p:text-ink prose-headings:text-ink'}`}
          dangerouslySetInnerHTML={{ __html: blog?.description! }}
        />

        <div className="w-full h-[1px] bg-black dark:bg-zinc-800 mb-20" />

        {/* Share Section */}
        <div className="mb-24 flex flex-col md:flex-row items-center justify-between border-b border-black dark:border-zinc-800 pb-12">
          <h3 className="font-serif text-2xl italic tracking-tight mb-6 md:mb-0">Share this dispatch</h3>
          <div className="flex gap-4">
            <button className={`w-12 h-12 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
              <CiFacebook size={24} />
            </button>
            <button className={`w-12 h-12 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
              <CiTwitter size={24} />
            </button>
            <button className={`w-12 h-12 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
              <SlSocialGoogle size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mb-16">
          <h3 className="font-serif text-3xl font-bold tracking-tight mb-10 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-black dark:bg-zinc-800" />
            Discourse ({comments.length})
          </h3>

          <div className="space-y-8 mb-16">
            {comments.length > 0 ? (
              comments.map((item) => (
                <div key={item._id} className="border-l-2 border-black/10 dark:border-zinc-800 pl-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-xs">
                      <FaUserTie />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <time className={`text-xs uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {moment(item.createdAt).fromNow()}
                      </time>
                    </div>
                  </div>
                  <p className={`text-base font-light leading-relaxed pl-11 ${darkMode ? 'text-slate-300' : 'text-ink-light'}`}>
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-serif italic text-xl text-center text-ink-light opacity-60 py-12">
                The silence is pristine. Be the first to reflect.
              </p>
            )}
          </div>

          <div className="border border-black dark:border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />

            <h4 className="font-serif text-2xl font-bold tracking-tight mb-8">Contribute to the Discourse</h4>
            <form onSubmit={addComment} className="flex flex-col gap-6 relative z-10">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  onChange={onChangeCommentData}
                  value={commmentData.name}
                  required
                  placeholder=" "
                  className="block w-full px-0 py-3 text-base bg-transparent border-0 border-b-2 border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                />
                <label className="absolute text-xs font-semibold tracking-widest uppercase text-black/50 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Identifier or Alias
                </label>
              </div>

              <div className="relative group mt-6">
                <textarea
                  name="content"
                  onChange={onChangeCommentData}
                  value={commmentData.content}
                  required
                  placeholder=" "
                  className="block w-full px-0 py-3 text-base bg-transparent border-0 border-b-2 border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors resize-none h-32"
                />
                <label className="absolute text-xs font-semibold tracking-widest uppercase text-black/50 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Reflection
                </label>
              </div>

              <button
                type="submit"
                className="self-start mt-4 px-8 py-3 bg-ink text-white font-bold tracking-widest uppercase text-sm border border-transparent hover:bg-brand-light hover:text-ink hover:border-ink transition-colors"
              >
                Submit Reflection
              </button>
            </form>
          </div>
        </section>
      </div>
    </article>
  );
};

export default BlogPage;