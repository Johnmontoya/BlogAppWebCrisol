import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useAuthContext } from "./AuthProvider";

const Login: React.FC = () => {
  const { setToken, axios: axiosInstance, navigate } = useAuthContext();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("https://backendcrisolideas.onrender.com/api/v1/user/register", {
        username,
        email,
        password,
      });

      if (data.valid === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axiosInstance.defaults.headers.common["Authorization"] = data.token;
        navigate("/admin")
      } else {
        toast.error(data.message);
      }
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(err)) {
        // Si hay una respuesta del servidor (código 4xx, 5xx)
        if (err.response && err.response.data && err.response.data.message) {
          // El error más específico del backend
          errorMessage = err.response.data.message;
        } else if (err.message) {
          // Error de red (ej: desconexión) o timeout
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        // Si es un error de JavaScript estándar (no de Axios)
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center flex flex-col justify-center items-center m-auto">
           <div onClick={() => navigate("/")} className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer">
              CI
            </div>
            <h1 className="text-3xl font-bold text-gray-700">
              <span className="text-indigo-600">Crisol</span> Register
            </h1>
            <p className="font-light text-gray-600 mt-2">
              Ingresa tus credenciales para crear una cuenta en crisol de ideas
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 w-full text-gray-600">
            <div className="flex flex-col mb-6">
              <label htmlFor="username" className="mb-2 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                placeholder="ingresa tu nombre de usuario"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-2 font-medium">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="ingresa tu email"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="ingresa tu contraseña"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registrando..." : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" onClick={() => navigate("/login")} className="text-sm text-indigo-600 hover:underline">
              Iniciar sesion
            </a>
          </div>

          {/* Link opcional para recuperar contraseña */}
          <div className="w-full mt-4 text-right">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
