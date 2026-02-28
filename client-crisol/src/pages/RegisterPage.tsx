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
          navigate('/login');
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
      {/* Form Left Side */}
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
            <h1 className="font-serif text-4xl font-black tracking-tight mb-2">Únete al Gremio.</h1>
            <p className="font-light text-ink-light">Completa tus datos para establecer tu perfil.</p>
          </div>

          {error.passwordInfo && (
            <div className="w-full mb-8 p-4 border border-red-500 bg-red-50 text-red-700 text-sm font-medium">
              {error.passwordInfo}
            </div>
          )}

          <form onSubmit={CreateUser} className="space-y-8">
            <div className="relative group">
              <input
                id="username"
                type="text"
                name="username"
                onChange={onChangeblogData}
                value={userData.username}
                required
                placeholder=" "
                className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors"
                disabled={isLoading}
              />
              <label
                htmlFor="username"
                className="absolute text-sm font-semibold tracking-wide uppercase text-black/50 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>

            <div className="relative group">
              <input
                id="email"
                type="email"
                name="email"
                onChange={onChangeblogData}
                value={userData.email}
                required
                placeholder=" "
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
                onChange={onChangeblogData}
                value={userData.password}
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
              className="w-full py-4 mt-4 font-bold tracking-widest uppercase bg-accent text-white border border-transparent hover:bg-brand-light hover:text-accent hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registrando..." : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-10 flex flex-col space-y-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate("/login"); }}
              className="text-sm font-medium tracking-wide border-b border-black/20 pb-1 w-fit hover:border-black transition-colors block"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f0ede6] text-ink flex-col justify-between p-12 border-l border-black relative overflow-hidden">
        {/* Background art graphic */}
        <div className="absolute -bottom-24 -right-24 font-serif text-[30rem] font-black italic opacity-5 leading-none pointer-events-none">
          R
        </div>

        <div className="self-end"
          onClick={() => navigate("/")}
        >
          <div className="w-16 h-16 flex items-center justify-center border border-black font-serif text-3xl cursor-pointer hover:bg-black hover:text-white transition-colors">
            CI
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="font-serif text-6xl xl:text-8xl font-black leading-none tracking-tighter mb-8">
            Dando forma a la <br /> <span className="italic text-accent">Narrativa.</span>
          </h2>
          <p className="font-light text-xl max-w-md opacity-80 leading-relaxed border-l-2 border-ink pl-6">
            Únete a un colectivo de voces exigentes. El registro otorga acceso a materiales seleccionados y permisos de comentario exclusivos.
          </p>
        </div>

        <div className="text-xs font-medium tracking-widest uppercase opacity-50 relative z-10">
          © 2025 Crisol de Ideas // Registro de Lectores
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
