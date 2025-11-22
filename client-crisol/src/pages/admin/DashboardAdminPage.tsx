import { FcAbout, FcAnswers, FcFullTrash } from "react-icons/fc";
import Sidebar from "../../components/Sidebar";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { useGetDashboardQueries } from "../../queries/blog.query";

const DashboardAdminPage = () => {
  const { darkMode } = useContext(UserContext);

  const [data] = useGetDashboardQueries();
  const dashboardData = data.data?.Blogs;

  return (
    <div
      className={`border-b ${
        darkMode
          ? "border-gray-700 bg-slate-900"
          : "border-gray-200 bg-slate-100"
      }`}
    >
      <Sidebar />
      <div
        className={`flex-1 p-4 md:p-10`}
      >
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 m-auto gap-4 mb-6">
          <div
            className={`flex items-center gap-4 ${
              darkMode ? "bg-gray-700" : "bg-white"
            } p-4 rounded shadow cursor-pointer hover:scale-105 transition-all`}
          >
            <div>
              <FcAnswers size={52} />
              <div className="flex flex-row gap-2 items-center">
                <p className="text-xl font-semibold text-gray-900">
                  {dashboardData?.blogs}
                </p>
                <p className="text-gray-400 font-light">Blogs</p>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 ${
              darkMode ? "bg-gray-700" : "bg-white"
            } p-4 rounded shadow cursor-pointer hover:scale-105 transition-all`}
          >
            <div>
              <FcAbout size={52} />
              <div className="flex flex-row gap-2 items-center">
                <p className="text-xl font-semibold text-gray-900">
                  {dashboardData?.comments}
                </p>
                <p className="text-gray-400 font-light">Comentarios</p>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 ${
              darkMode ? "bg-gray-700" : "bg-white"
            } p-4 rounded shadow cursor-pointer hover:scale-105 transition-all`}
          >
            <div>
              <FcFullTrash size={52} />
              <div className="flex flex-row gap-2 items-center">
                <p className="text-xl font-semibold text-gray-900">
                  {dashboardData?.drafts}
                </p>
                <p className="text-gray-400 font-light">Borrador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
