import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../components/auth/AuthProvider";
import Sidebar from "../../components/Sidebar";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GiSun } from "react-icons/gi";

const Layout = () => {
  const { axios, setToken, navigate, darkMode, setDarkMode } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <>
      <header
        className={`border-b 
          ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div onClick={() => navigate('/')} className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer">
                CI
              </div>
              <span className="font-bold text-xl">CRISOL DE IDEAS</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-indigo-600">
                Home
              </a>
              <a href="#" className="hover:text-indigo-600">
                Features
              </a>
              <a href="#" className="hover:text-indigo-600">
                Nosotros
              </a>
              <a href="#" className="hover:text-indigo-600">
                Contactos
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <GiSun size={20} /> : <BiMoon size={20} />}
              </button>
              <button
                onClick={logout}
                className="text-sm px-8 py-2 bg-indigo-600 text-white rounded-full cursor-pointer"
              >
                Logout
              </button>
              <button className="md:hidden p-2">
                <BiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`px-4 max-w-7xl m-auto flex flex-col gap-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
