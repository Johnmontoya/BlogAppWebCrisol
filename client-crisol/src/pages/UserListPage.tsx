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
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900 text-slate-100"
          : "border-gray-200 bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />
      <div className={`max-w-7xl flex-1 p-4 md:p-10 m-auto`}>
        <div>
          <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
            <p>Todos los usuarios</p>
          </div>

          <div
            className={`relative max-w-7xl overflow-x-auto shadow rounded-lg scrollbar-hide ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-500 text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6">
                    {" "}
                    #{" "}
                  </th>
                  <th scope="col" className="px-2 py-4">
                    {" "}
                    Usuario{" "}
                  </th>
                  <th scope="col" className="px-2 py-4">
                    {" "}
                    Email{" "}
                  </th>
                  <th scope="col" className="px-2 py-4">
                    {" "}
                    Role{" "}
                  </th>
                  <th scope="col" className="px-2 py-4">
                    {" "}
                    Cuenta{" "}
                  </th>
                  <th scope="col" className="px-2 py-4">
                    {" "}
                    Acciones{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
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
