import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GiSun } from "react-icons/gi";
import { useAuthStore } from "../store/auth";
import { useQueryClient } from "@tanstack/react-query";

const Layout = () => {
  const { navigate, darkMode, setDarkMode, hasValidToken } = useContext(UserContext);
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();  

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    queryClient.clear();
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      <header
        className={`sticky top-0 z-50 border-b border-black dark:border-zinc-800 ${
          darkMode ? "bg-brand-dark text-white" : "bg-brand-light text-ink"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/")}
                className={`w-12 h-12 flex items-center justify-center font-serif text-2xl cursor-pointer border ${darkMode ? 'border-zinc-800 bg-brand-dark' : 'border-ink bg-brand-light'} hover:bg-accent hover:text-white hover:border-accent transition-all duration-300`}
              >
                CI
              </div>
              <span className="font-serif font-black text-2xl tracking-tight hidden sm:block">CRISOL DE IDEAS</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide uppercase">
              <a href="#" className="relative group overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Home</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent">Home</span>
              </a>
              <a href="#" className="relative group overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Features</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent">Features</span>
              </a>
              <a href="#" className="relative group overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Nosotros</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent">Nosotros</span>
              </a>
              <a href="#" className="relative group overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Contactos</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent">Contactos</span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className={`p-2 border rounded-full transition-colors duration-300 ${darkMode ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-200 hover:bg-gray-100'}`}
              >
                {darkMode ? <GiSun size={18} /> : <BiMoon size={18} />}
              </button>
              
              {hasValidToken ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate("/user")}
                    className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${darkMode ? 'border-zinc-800 hover:border-accent hover:text-accent' : 'border-ink hover:text-white hover:bg-ink'}`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${darkMode ? 'border-zinc-800 hover:border-red-500 hover:text-red-500' : 'border-ink hover:text-white hover:bg-red-600 hover:border-red-600'}`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className={`px-6 py-2 text-sm font-semibold uppercase tracking-wider border ${darkMode ? 'border-zinc-800 bg-zinc-900 hover:bg-white hover:text-black' : 'border-ink bg-ink text-white hover:bg-brand-light hover:text-ink'} transition-all duration-300`}
                >
                  Login
                </button>
              )}
              <button className="md:hidden p-2">
                <BiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
