import { useContext, useEffect, useRef, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../auth/AuthProvider";

interface PrivateRouteProps {
  element: ReactElement;
  //requiresPurchase?: boolean; // Para rutas que requieren cursos comprados
  redirectTo?: string; // Ruta personalizada de redirección
  message?: string; // Mensaje personalizado
}

const PrivateRoute = ({
  element,
  //requiresPurchase = false,
  redirectTo = "/register",
  message = "Please register to access this content.",
}: PrivateRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  const alertShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !alertShown.current) {
      alert(message);
      alertShown.current = true;
    }
  }, [isAuthenticated, message]);

  // Si no está autenticado, redirigir
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return element;
};

export default PrivateRoute;
