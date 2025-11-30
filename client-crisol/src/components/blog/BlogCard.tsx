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
  const { _id, category, image, title, description, createdAt  } = blog;

  return (
    <div
      onClick={() => navigate(`/blog?id=${_id}`)}
      className={`rounded-xl overflow-hidden shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="h-48">
        <img src={`${image}`} className="w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-2 font-extralight">{category}</div>
        <p className="text-sm text-gray-500 mb-2 font-bold">{author?.username}</p>
        <h3 className="text-xl font-bold mb-3 uppercase">{title}</h3>
        <p
          className={darkMode ? "text-gray-400" : "text-gray-600"}
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
        <h3 className="w-full flex justify-end text-sm font-light text-gray-600 mt-5">{moment(createdAt).fromNow()}</h3>
      </div>
    </div>
  );
};

export default BlogCard;