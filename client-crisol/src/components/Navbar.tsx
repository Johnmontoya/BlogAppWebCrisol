import { useAuthContext } from "../components/auth/AuthProvider";
import { BiMenu, BiMoon } from "react-icons/bi";
import { GiSun } from "react-icons/gi";
import Header from "./Header";

const Navbar = () => {
  const { token, navigate, darkMode, setDarkMode } = useAuthContext();

  return (
    <header
      className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer">
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
            <Header />       
            <button onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? <GiSun size={20} /> : <BiMoon size={20} />}
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {token ? "Dashboard" : "Login"}
            </button>
            <button className="md:hidden p-2">
              <BiMenu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
