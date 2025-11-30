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
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900 text-slate-100"
          : "border-gray-200 bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />
      <div className="flex m-auto justify-between items-center max-w-7xl mb-6">
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
          <p>Comentarios</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Aprobado")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "Aprobado"
                ? "text-indigo-600 border-indigo-600 bg-indigo-50"
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Aprobado (
            {comments?.comments.filter((c) => c.isApproved).length || 0})
          </button>

          <button
            onClick={() => setFilter("No aprobado")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "No aprobado"
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
        className={`relative max-w-7xl m-auto pb-10 mb-6 overflow-x-auto shadow rounded-lg cursor-pointer ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">Cargando comentarios...</p>
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 text-left uppercase border-b">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Titulo del blog y Comentarios
                  </th>
                  <th scope="col" className="px-6 py-3 max-sm:hidden">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3">
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
