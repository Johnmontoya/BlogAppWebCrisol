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
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center flex flex-col justify-center items-center m-auto">
            <div
              onClick={() => navigate("/")}
              className="w-16 h-16 flex items-center justify-center border border-zinc-600 font-serif text-3xl cursor-pointer hover:bg-brand-light hover:text-ink transition-colors"
            >
              CI
            </div>
            <h1 className="text-3xl font-bold text-gray-700">
              <span className="text-orange-600">Crisol</span> Recuperar
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
            <div className="relative group">
              <input
                id="email"
                type="email"
                name="email"
                onChange={onChangeSignInData}
                value={signInData.email}
                required
                placeholder=""
                className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                disabled={isLoading}
              />
              <label
                htmlFor="email"
                className="absolute text-sm font-semibold tracking-wide uppercase text-black/50 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Dirección de correo electrónico
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 font-bold tracking-widest uppercase bg-ink text-white border border-transparent hover:bg-brand-light hover:text-ink hover:border-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="text-sm font-medium tracking-wide border-b border-black/20 pb-1 w-fit hover:border-accent hover:text-accent transition-colors block"
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
