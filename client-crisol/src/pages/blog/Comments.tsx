import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Sidebar from "../../components/Sidebar";
import type { ICommentResponse } from "../../interfaces/comment";
import { useGetCommentUserIdQueries } from "../../queries/comment.query";
import { useAuthStore } from "../../store/auth";
import CommenTableItem from "../../components/comment/CommentTableItem";

type FilterType = "Aprobado" | "No aprobado";

const Comments = () => {
  const { darkMode } = useContext(UserContext);
  const userId = useAuthStore((state) => state.userId);
  const [comments, setComments] = useState<ICommentResponse | undefined>();
  const [filter, setFilter] = useState<FilterType>("No aprobado");

  const [data] = useGetCommentUserIdQueries(userId);
  const isLoading = data.isLoading;

  // ✅ Usa useEffect para actualizar el estado cuando cambien los datos
  useEffect(() => {
    if (data.data) {
      setComments(data.data);
    }
  }, [data.data]);

  const filteredComments = comments?.comments.filter((comment) =>
    filter === "Aprobado" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div
      className={`border-b ${darkMode
        ? "bg-brand-dark text-slate-100"
        : "bg-brand-light text-slate-900"
        }`}
    >
      <Sidebar />
      <div className="flex m-auto justify-between items-center max-w-7xl mb-6">
        <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6 mt-10">
          <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
            Todos tus comentarios.
          </h1>
          <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
            Listado de todos tus comentarios registrados en el sistema.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Aprobado")}
            className={`shadow-sm border px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${filter === "Aprobado"
              ? "text-indigo-600 border-indigo-600 bg-indigo-50"
              : "text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
          >
            Aprobado (
            {comments?.comments.filter((c) => c.isApproved).length || 0})
          </button>

          <button
            onClick={() => setFilter("No aprobado")}
            className={`shadow-sm border px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${filter === "No aprobado"
              ? "text-indigo-600 border-indigo-600 bg-indigo-50"
              : "text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
          >
            No Aprobado (
            {comments?.comments.filter((c) => !c.isApproved).length || 0})
          </button>
        </div>
      </div>

      <div
        className={`relative max-w-7xl mx-auto mb-10 overflow-x-auto shadow scrollbar-hide ${darkMode ? "bg-zinc-900" : "bg-white"
          }`}
      >
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">Cargando comentarios...</p>
          </div>
        ) : (
          <>
            <table className={`w-full text-sm ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
              <thead className="text-xs text-gray-500 text-left uppercase">
                <tr className="font-serif">
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    Titulo del blog y Comentarios
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    Fecha
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComments?.map((comment, index) => (
                  <CommenTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>

            {filteredComments?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">
                  {filter.toLowerCase()} comentarios no encontrados
                </p>
                <p className="text-sm mt-2">
                  {filter === "Aprobado"
                    ? "No hay comentarios aprobados todavia."
                    : "Todos los comentarios han sido aprobados!"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
