import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import useInputs from "../hooks/useInputs";
import { useResetMutation } from "../queries/user.query";
import { useLocation } from "react-router-dom";
import SweetAlertas from "../components/alerts/SweetAlertas";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPage = () => {
  const { navigate } = useContext(UserContext);
  const queryUrl = useQuery();
  const userId = queryUrl.get("userId");
  const token = queryUrl.get("token");

  const [error, setError] = useState({ errorInfo: "", passwordInfo: "" });
  const resetUser = useResetMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInData, onChangeSignInData, setsignInData] = useInputs({
    password: "",
    repeatPassword: "",
  });

  const onReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signInData.password !== signInData.repeatPassword) {
      setError({
        errorInfo: "",
        passwordInfo: "Las contraseñas no son iguales",
      });
    } else {
      setIsLoading(true);
      resetUser.mutateAsync(
        {
          userId: userId!,
          password: signInData.password,
          token: token!,
        },
        {
          onSuccess: (response: any) => {
            SweetAlertas.OnDialogSuccess({
              message: response.data.message,
            });
            setsignInData({
              password: "",
              repeatPassword: ""
            });
            setError({
                errorInfo: "",
                passwordInfo: "",
            });
            setIsLoading(false);
          },
          onError: (error: any) => {
            setIsLoading(false);
            setError({
              errorInfo: error.response.data.error,
              passwordInfo: error.response.data.message,
            });
          },
        }
      );
    }
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
              <span className="text-indigo-600">Crisol</span> Recuperar
            </h1>
            <p className="font-light text-gray-600 mt-2">
              Ingresa los datos para recuperar la cuenta
            </p>
          </div>

          {/* Mensaje de error */}
          {error.passwordInfo && (
            <div className="w-full mb-4 p-3 bg-indigo-100 border border-indigo-400 text-indigo-700 rounded text-sm">
              {error.passwordInfo}
            </div>
          )}

          <form onSubmit={onReset} className="mt-6 w-full text-gray-600">
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 font-medium">
                Nueva Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={onChangeSignInData}
                value={signInData.password}
                required
                placeholder="ingresa tu contraseña"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="repeat-password" className="mb-2 font-medium">
                Repetir Contraseña
              </label>
              <input
                id="repeat-password"
                type="password"
                name="repeatPassword"
                onChange={onChangeSignInData}
                value={signInData.repeatPassword}
                required
                placeholder="repite la contraseña"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar"}
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
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
