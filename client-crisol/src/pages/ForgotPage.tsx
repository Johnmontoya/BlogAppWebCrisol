import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import useInputs from "../hooks/useInputs";
import { useForgotMutation } from "../queries/user.query";
import SweetAlertas from "../components/alerts/SweetAlertas";

const ForgotPage = () => {
  const { navigate } = useContext(UserContext);
  const forgotUser = useForgotMutation();
  const [error, setError] = useState({ errorInfo: "", passwordInfo: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInData, onChangeSignInData, setsignInData] = useInputs({
    email: "",
  });

  const onForgot = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    forgotUser.mutateAsync(
      {
        email: signInData.email,
      },
      {
        onSuccess: (response: any) => {
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
          setsignInData({
            email: "",
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
              Ingresa el correo electrónico con el cuál registraste tu cuenta
            </p>
          </div>

          {/* Mensaje de error */}
          {error.passwordInfo && (
            <div className="w-full mb-4 p-3 bg-indigo-100 border border-indigo-400 text-indigo-700 rounded text-sm">
              {error.passwordInfo}
            </div>
          )}

          <form onSubmit={onForgot} className="mt-6 w-full text-gray-600">
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-2 font-medium">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={onChangeSignInData}
                value={signInData.email}
                required
                placeholder="ingresa tu email"
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

export default ForgotPage;
