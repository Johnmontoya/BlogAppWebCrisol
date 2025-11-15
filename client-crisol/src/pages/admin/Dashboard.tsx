import { useEffect, useState } from "react";
import { useAuthContext } from "../../components/auth/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import BlogTableItem from "../../components/blog/BlogTableItem";

interface DashboardData {
  blogs: number;
  comments: number;
  drafts: number;
  recentblogs: any[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentblogs: [],
  });

  const { axios: axiosInstance, token } = useAuthContext();

  // Función de utilidad para manejar errores de Axios
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return err.response.data.message;
      }
      return err.message;
    }
    return "An unexpected error occurred.";
  };

  const fetchDashboard = async () => {
    if (!token) {
      toast.error("No estás autenticado");
      return;
    }

    try {
      const { data } = await axiosInstance.get('https://backendcrisolideas.onrender.com/api/v1/blog/dashboard');
      console.log("Dashboard data:", data);
      if (data.valid === "success") {
        setDashboardData(data.Blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-4 bg-white p-4 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comentarios</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Borrador</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <p>Últimos blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
                <th scope="col" className="px-2 py-4"> Título del blog </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Fecha </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Estados </th>
                <th scope="col" className="px-2 py-4"> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentblogs.length > 0 ? (
                dashboardData.recentblogs.map((blog, index) => (
                  <BlogTableItem 
                    key={blog._id || index} 
                    blog={blog} 
                    fetchBlogs={fetchDashboard} 
                    index={index + 1} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No hay blogs recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;