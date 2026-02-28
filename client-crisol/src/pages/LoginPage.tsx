import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { useAuthStore } from "../store/auth";
import token from "../lib/token";
import { ACCESS_TOKEN_KEY } from "../config/config";
import useInputs from "../hooks/useInputs";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../queries/user.query";
import SweetAlertas from "../components/alerts/SweetAlertas";

const LoginPage = () => {
  const { setIsLogin, setRole, navigate } = useContext(UserContext);
  const auth = useAuthStore((state) => state.setUserData);
  const loginUserMutation = useLoginMutation();
  const [error, setError] = useState({ errorInfo: "", passwordInfo: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInData, onChangeSignInData, setsignInData] = useInputs({
    email: "",
    password: "",
  });

  const onLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    loginUserMutation.mutateAsync(
      {
        email: signInData.email,
        password: signInData.password,
      },
      {
        onSuccess: async (response: any) => {
          token.setToken(ACCESS_TOKEN_KEY, response.data.token);
          const decoded: any = jwtDecode(response.data.token);
          const { role, userId } = decoded;

          auth(userId, role);
          setRole(role);
          setIsLogin(true);

          if (role === "Admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/user", { replace: true });
          }
          setsignInData({
            email: "",
            password: "",
          });
          setError({
            errorInfo: "",
            passwordInfo: "",
          });
          setIsLoading(false);
          SweetAlertas.OnDialogSuccess({
            message: "Bienvenido",
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
    <div className="flex min-h-screen bg-brand-light text-ink selection:bg-accent selection:text-white">
      {/* Editorial Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink text-brand-light flex-col justify-between p-12 border-r border-black">
        <div
          onClick={() => navigate("/")}
          className="w-16 h-16 flex items-center justify-center border border-brand-light/30 font-serif text-3xl cursor-pointer hover:bg-brand-light hover:text-ink transition-colors"
        >
          CI
        </div>

        <div>
          <h2 className="font-serif text-6xl xl:text-8xl font-black leading-none tracking-tighter mb-8">
            Entra al <br /> <span className="italic text-accent">Discurso.</span>
          </h2>
          <p className="font-light text-xl max-w-md opacity-80 leading-relaxed border-l border-accent pl-6">
            La autenticación es necesaria para curar, comentar y participar en el pensamiento arquitectónico de nuestro tiempo.
          </p>
        </div>

        <div className="text-xs font-medium tracking-widest uppercase opacity-50">
          © 2025 Crisol de Ideas
        </div>
      </div>

      {/* Form Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden">
          <div
            onClick={() => navigate("/")}
            className="w-12 h-12 flex items-center justify-center border border-ink font-serif text-2xl cursor-pointer hover:bg-ink hover:text-white transition-colors"
          >
            CI
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="font-serif text-4xl font-black tracking-tight mb-2">Bienvenido de nuevo.</h1>
            <p className="font-light text-ink-light">Por favor ingresa tus credenciales para continuar.</p>
          </div>

          {error.passwordInfo && (
            <div className="w-full mb-8 p-4 border border-red-500 bg-red-50 text-red-700 text-sm font-medium">
              {error.passwordInfo}
            </div>
          )}

          <form onSubmit={onLogin} className="space-y-8">
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

            <div className="relative group">
              <input
                id="password"
                type="password"
                name="password"
                onChange={onChangeSignInData}
                value={signInData.password}
                required
                placeholder=" "
                className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                disabled={isLoading}
              />
              <label
                htmlFor="password"
                className="absolute text-sm font-semibold tracking-wide uppercase text-black/50 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 font-bold tracking-widest uppercase bg-ink text-white border border-transparent hover:bg-brand-light hover:text-ink hover:border-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Autenticando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-10 flex flex-col space-y-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate("/register"); }}
              className="text-sm font-medium tracking-wide border-b border-black/20 pb-1 w-fit hover:border-accent hover:text-accent transition-colors block"
            >
              Crear una cuenta
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate("/forgot-password"); }}
              className="text-sm font-medium tracking-wide border-b border-black/20 pb-1 w-fit hover:border-accent hover:text-accent transition-colors block"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
