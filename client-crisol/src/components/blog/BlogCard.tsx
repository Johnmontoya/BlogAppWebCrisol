import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";

interface Blog {
  _id: string | number;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { darkMode } = useAuthContext();
  const { title, description, category, image } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className={`rounded-xl overflow-hidden shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="h-48">
        <img src={image} className="w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-3">{category}</div>
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p
          className={darkMode ? "text-gray-400" : "text-gray-600"}
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
