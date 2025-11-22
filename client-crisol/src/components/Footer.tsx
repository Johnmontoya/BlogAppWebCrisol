import { useContext } from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { UserContext } from "../contexts/UserContextProvider";

const Footer = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <footer
      className={`border-t ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } py-12`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="font-bold text-xl">CI</span>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Bienvenidos a uno de los pocos recursos web para refrescar el
              conocimiento. Explora todo tipo de contenido, entretenimiento y
              más.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <BsTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <BsInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <BsLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">HOME</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Lista Clasica
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Mis Cuentas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Inversiones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Información
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">CATEGORIAS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Tecnologias
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Viajes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Deportes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Negocios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">PAGINAS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Contactos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } pt-8 text-center text-sm text-gray-500`}
        >
          © 2025 — Revision. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
