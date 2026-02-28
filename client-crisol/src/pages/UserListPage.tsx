import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Sidebar from "../components/Sidebar";
import { useGetUsersQueries } from "../queries/user.query";
import UserListItem from "../components/user/UserListItem";

const UserListPage = () => {
  const { darkMode } = useContext(UserContext);
  const data = useGetUsersQueries();
  const isLoading = data[0].isLoading;
  const users = data[0].data?.users;

  return (
    <div
      className={`border-b ${darkMode
        ? "bg-brand-dark text-slate-100"
        : "bg-brand-light text-slate-900"
        }`}
    >
      <Sidebar />
      <div className={`max-w-7xl flex-1 p-4 md:p-10 m-auto`}>
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 border-b border-black dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-2">
              Todos los usuarios.
            </h1>
            <p className={`font-light tracking-wide ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
              Listado de todos los usuarios registrados en el sistema.
            </p>
          </div>

          <div
            className={`relative max-w-7xl overflow-x-auto shadow scrollbar-hide ${darkMode ? "bg-zinc-900" : "bg-white"
              }`}
          >
            <table className={`w-full text-sm ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
              <thead className="text-xs text-gray-500 text-left uppercase">
                <tr className="font-serif">
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    #{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Usuario{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Email{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Role{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Cuenta{" "}
                  </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                    {" "}
                    Acciones{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No hay usuarios recientes
                    </td>
                  </tr>
                ) : (
                  users?.map((user, index) => {
                    return (
                      <UserListItem
                        key={user._id}
                        users={user}
                        index={index + 1}
                      />
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
