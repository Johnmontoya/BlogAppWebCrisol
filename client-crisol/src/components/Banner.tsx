import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const Banner = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-4">
        Reflexiones <span className="text-indigo-600">sinceras:</span> Historias
        de amor,
        <br />
        Perdida y Crecimiento.
      </h1>
      <p
        className={`text-lg ${
          darkMode ? "text-gray-400" : "text-gray-600"
        } max-w-3xl mx-auto`}
      >
        ¡Bienvenido a la fuente definitiva de perspectivas innovadoras! Explora
        contenido seleccionado para informar, entretener e involucrar a lectores
        de todo el mundo.
      </p>
    </section>
  );
};

export default Banner;
