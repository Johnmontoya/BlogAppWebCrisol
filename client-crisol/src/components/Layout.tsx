import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GiSun } from "react-icons/gi";
import { useAuthStore } from "../store/auth";
import { useQueryClient } from "@tanstack/react-query";

const Layout = () => {
  const { navigate, darkMode, setDarkMode, isLogin } = useContext(UserContext);
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const handleLOgout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    queryClient.clear();
    window.location.href = "/login";
  };

  return (
    <div className="">
      <header
        className={`border-b ${
          darkMode
            ? "border-gray-700 bg-slate-900 text-slate-100"
            : "border-gray-200 bg-slate-100 text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                onClick={() => navigate("/")}
                className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer"
              >
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
              {isLogin ? (
                <>
                  <button
                    onClick={() => navigate("/user")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    {"Dashboard"}
                  </button>
                  <button
                    onClick={handleLOgout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    {"Logout"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {"Login"}
                </button>
              )}
              <button className="md:hidden p-2">
                <BiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
