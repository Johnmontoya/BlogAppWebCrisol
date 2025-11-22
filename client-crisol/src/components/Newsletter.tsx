import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const Newsletter = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <section className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-16`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Suscríbase a nuestro boletín informativo</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Suscríbete a nuestro boletín informativo por correo electrónico para recibir las últimas publicaciones directamente en tu correo electrónico.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              className={`flex-1 px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
              Suscríbete
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * No spam, retira la suscripción cuando desees
          </p>
        </div>
      </section>
  );
};

export default Newsletter;