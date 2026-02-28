import { useContext } from "react";
import moment from "moment";
import type { Iblogs } from "../../interfaces/blog";
import { UserContext } from "../../contexts/UserContextProvider";
import type { IUser } from "../../interfaces/auth";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blog: Iblogs;
  author: IUser
}

const BlogCard = ({ blog, author }: BlogCardProps) => {
  const { darkMode, navigate } = useContext(UserContext);
  const { _id, category, image, title, description, createdAt } = blog;

  return (
    <article
      onClick={() => navigate(`/blog?id=${_id}`)}
      className={`group cursor-pointer flex flex-col h-full border ${darkMode ? "border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50" : "border-black hover:bg-black/5 hover:border-accent"
        } transition-all duration-500`}
    >
      <div className="relative h-64 w-full overflow-hidden border-b border-black dark:border-zinc-800">
        <div className="absolute inset-0 bg-ink/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700 z-10" />
        <img
          src={`${image}`}
          alt={title}
          className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white text-ink text-xs font-bold uppercase tracking-widest px-3 py-1 border border-black dark:border-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4 border-b border-black/10 dark:border-zinc-800 pb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            By {author?.username}
          </span>
          <time className={`text-xs font-medium uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {moment(createdAt).format("MMM DD, YYYY")}
          </time>
        </div>

        <h3 className="font-serif text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        <p
          className={`font-light leading-relaxed flex-grow text-[15px] ${darkMode ? "text-zinc-400" : "text-ink-light"}`}
          dangerouslySetInnerHTML={{ __html: description.slice(0, 140) + "..." }}
        ></p>

        <div className="mt-8 pt-4 flex items-center text-xs font-bold uppercase tracking-widest gap-2 group-hover:text-accent transition-colors duration-300">
          Read Article
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;