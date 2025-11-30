import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContextProvider";
import { useGetUserIdQueries } from "../queries/user.query";
import { useAuthStore } from "../store/auth";
import { TfiEmail } from "react-icons/tfi";
import { CiCalendarDate, CiUser } from "react-icons/ci";

const ProfilePage = () => {
  const userId = useAuthStore((state) => state.userId);
  const { darkMode } = useContext(UserContext);
  const [data] = useGetUserIdQueries(userId);
  const user = data.data?.user;

  return (
    <div
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900"
          : "border-gray-200 bg-slate-100"
      }`}
    >
      <Sidebar />
      <div className={`w-full flex-1 p-4 md:p-10`}>
        <div className="max-w-7xl m-auto gap-4 mb-6">
          <div className={` ${darkMode ? "bg-gray-800 text-slate-100" : "bg-slate-100 text-slate-900"}rounded-xl shadow-2xl w-full p-8 transition-all duration-300 animate-fade-in`}>
            <div className="flex flex-col md:flex-row">
              <div className="text-center mb-8 md:mb-0">                
                <h1 className="text-2xl font-bold text-indigo-400 mb-2">
                  {user?.username}
                </h1>
                <p className="text-gray-400">
                  {user?.email}
                </p>
                <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                  Editar Perfil
                </button>
              </div>
              <div className="w-full md:pl-8">
                <h2 className="text-xl font-semibold text-indigo-400 mb-4">
                  Sobre mí
                </h2>
                <p className="text-gray-400 mb-6">
                  Passionate software developer with 5 years of experience in
                  web technologies. I love creating user-friendly applications
                  and solving complex problems.
                </p>
                <h2 className="text-xl font-semibold text-indigo-400 mb-4">
                  Información de cuenta
                </h2>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <TfiEmail className="mr-2"/>
                    {user?.email}
                  </li>
                  <li className="flex items-center">
                    <CiUser className="mr-2" />
                    {user?.role}
                  </li>
                  <li className="flex items-center">
                    <CiCalendarDate className="mr-2" />
                   {user?.createdAt}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
