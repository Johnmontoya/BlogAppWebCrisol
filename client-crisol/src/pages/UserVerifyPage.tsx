import { useContext, useState, useRef, useEffect } from "react";
import { useVerifyMutation } from "../queries/user.query";
import { UserContext } from "../contexts/UserContextProvider";
import { useLocation } from "react-router-dom";
import SweetAlertas from "../components/alerts/SweetAlertas";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UserVerifyPage = () => {
  const { navigate } = useContext(UserContext);
  const verifyUser = useVerifyMutation();
  const queryUrl = useQuery();
  const userId = queryUrl.get("userId");
  const [error, setError] = useState({ errorInfo: "", passwordInfo: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  
  // Referencias para cada input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus en el primer input al montar
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Retroceder con Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    // Solo si son números
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus en el último input completado
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError({ errorInfo: "", passwordInfo: "" });

    const otpCode = otp.join("");

    // Validar que todos los campos estén llenos
    if (otpCode.length !== 6) {
      setError({ 
        errorInfo: "", 
        passwordInfo: "Por favor ingresa el código completo de 6 dígitos" 
      });
      setIsLoading(false);
      return;
    }

    verifyUser.mutateAsync({
      userId: userId!,
      otp: otpCode
    }, {
      onSuccess: (response: any) => {
        SweetAlertas.OnDialogSuccess({
          message: response.data.message
        })
        setIsLoading(false);
        navigate('/login')
      },
      onError: (error: any) => {
        setError({ 
          errorInfo: "", 
          passwordInfo: error.response.data.message 
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-indigo-600/30 shadow-xl shadow-indigo-600/15 rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center flex flex-col justify-center items-center m-auto">
            <div
              onClick={() => navigate("/")}
              className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              CI
            </div>
            <h1 className="text-3xl font-bold text-gray-700">
              <span className="text-indigo-600">Crisol</span> Verificación
            </h1>
            <p className="font-light text-gray-600 mt-2">
              Ingresa el código enviado a tu correo electrónico
            </p>
          </div>

          {/* Mensaje de error */}
          {error.passwordInfo && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error.passwordInfo}
            </div>
          )}

          <div className="mt-6 w-full text-gray-600">
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isLoading}
                  className="w-12 h-16 text-center text-2xl font-bold border-2 border-indigo-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600
                    transition-all duration-300 hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              ))}
            </div>

            <button
              onClick={onVerify}
              disabled={isLoading}
              className="w-full py-3 font-medium bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verificando cuenta..." : "Verificar"}
            </button>
          </div>

          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => {
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
              }}
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors block w-full"
            >
              Limpiar código
            </button>
            <div>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-indigo-600 hover:underline"
              >
                Volver al login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyPage;