import { CiStickyNote, CiTrash } from "react-icons/ci";
import {
  useDeleteCommentMutation,
  useStateCommentMutation,
} from "../../queries/comment.query";
import { useQueryClient } from "@tanstack/react-query";
import SweetAlertas from "../alerts/SweetAlertas";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

// Interfaz actualizada según la estructura real de datos
interface BlogInfo {
  _id: string;
  title: string; // Cambiado de 'title' a 'titulo' según tus datos
}

interface Comment {
  _id: string;
  blog: BlogInfo; // La referencia original (ej: "blog_data[0]")
  name: string;
  content: string;
  createdAt: string | Date;
  isApproved: boolean;
}

interface CommentTableItemProps {
  comment: Comment;
  index?: number; // Opcional, si quieres mostrar números
}

const CommenTableItem: React.FC<CommentTableItemProps> = ({ comment }) => {
  const { darkMode } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { createdAt, _id, name, content } = comment;
  const BlogDate = new Date(createdAt);
  const approveCommentMutation = useStateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const handleApproveComment = async () => {
    approveCommentMutation.mutateAsync(
      {
        id: _id,
      },
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError(error: any) {
          console.log(error);
        },
      }
    );
  };

  const ConfirmDeleteBlog = () => {
    deleteCommentMutation.mutateAsync(
      {
        id: _id,
      },
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError(error: any) {
          SweetAlertas.OnDialogFail({
            message: error.response.data.message
          })
        },
      }
    );
  };

  function deleteOneComment() {
    SweetAlertas.OnDialogChoose({
      message: `Estas seguro de eliminar el comentario ${name}`,
      onConfirm: ConfirmDeleteBlog,
      onCancel: Cancel,
    });
  }

  const Cancel = () => { };

  return (
    <tr className={`font-light tracking-wide border-y border-gray-300 transition-all duration-500 ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
      <td className="px-6 py-4">
        <div className="space-y-2">
          <p>
            <span className="font-medium">Blog:</span>{" "}
            <span>
              {comment.blog?.title || "Unknown Blog"}
            </span>
          </p>
          <p>
            <span className="font-medium">Nombre:</span>{" "}
            <span>{name}</span>
          </p>
          <p>
            <span className="font-medium">Comentario:</span>{" "}
            <span>{content}</span>
          </p>
        </div>
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        <div className="flex flex-col">
          <span>{BlogDate.toLocaleDateString()}</span>
          <span className="text-xs text-gray-400">
            {BlogDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!comment.isApproved ? (
            <button
              onClick={handleApproveComment}
              className="group flex items-center gap-2 px-3 py-1.5 border border-red-600 text-red-600 rounded hover:bg-green-50 transition-colors cursor-pointer"
              aria-label="Approve comment"
              title="Click to approve"
            >
              <CiStickyNote className="w-4 h-4" />
              <span className="text-xs font-medium">No aprobado</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="group flex items-center gap-2 px-3 py-1.5 border border-indigo-400 text-indigo-400 hover:bg-indigo-50/10 rounded transition-colors cursor-pointer">
                Aprobados
              </span>
              <CiTrash
                size={26}
                onClick={deleteOneComment}
                className="hover:scale-110 text-red-600 transition-all cursor-pointer"
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommenTableItem;
