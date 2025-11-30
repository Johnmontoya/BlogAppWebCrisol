import { useContext, useState } from "react";
import { useRegisterUserMutation } from "../queries/user.query";
import { UserContext } from "../contexts/UserContextProvider";
import useInputs from "../hooks/useInputs";
import SweetAlertas from "../components/alerts/SweetAlertas";

const RegisterPage = () => {
  const { navigate } = useContext(UserContext);
  const createUserMutation = useRegisterUserMutation();
  const [error, setError] = useState({ errorInfo: "", passwordInfo: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, onChangeblogData, setUserData] = useInputs({
    username: "",
    email: "",
    password: "",
  });

  const CreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    createUserMutation.mutateAsync(
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      {
        onSuccess: async (response: any) => {
          setUserData({
            username: "",
            email: "",
            password: "",
          });
          setError({
            errorInfo: "",
            passwordInfo: "",
          });
          setIsLoading(false);
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError: async (error: any) => {
          setIsLoading(false);
          setError({
            errorInfo: error.response.data.error,
            passwordInfo: error.response.data.message,
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center flex flex-col justify-center items-center m-auto">
            <div
              onClick={() => navigate("/")}
              className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer"
            >
              CI
            </div>
            <h1 className="text-3xl font-bold text-gray-700">
              <span className="text-indigo-600">Crisol</span> Registro
            </h1>
            <p className="font-light text-gray-600 mt-2">
              Ingresa tus credenciales para crear una cuenta
            </p>
          </div>

          {/* Mensaje de error */}
          {error.passwordInfo && (
            <div className="w-full mb-4 p-3 bg-indigo-100 border border-indigo-400 text-indigo-700 rounded text-sm">
              {error.passwordInfo}
            </div>
          )}

          <form onSubmit={CreateUser} className="mt-6 w-full text-gray-600">
            <div className="flex flex-col mb-6">
              <label htmlFor="username" className="mb-2 font-medium">
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                name="username"
                onChange={onChangeblogData}
                value={userData.username}
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
                name="email"
                onChange={onChangeblogData}
                value={userData.email}
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
                name="password"
                onChange={onChangeblogData}
                value={userData.password}
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
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="text-sm text-indigo-600 hover:underline"
            >
              Loguear usuario
            </a>
          </div>

          {/* Link opcional para recuperar contraseña */}
          <div className="w-full mt-4 text-right">
            <a href="#" onClick={() => navigate('/forgot-password')} className="text-sm text-indigo-600 hover:underline">
              Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
