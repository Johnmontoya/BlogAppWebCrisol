import { useContext, type JSX } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import routerMeta from "../../interfaces/routerMeta";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: JSX.Element;
  path: string;
}

const ProtectedRoute = ({ children, path }: IProtectedRoute) => {
  const { isLogin, role } = useContext(UserContext);

  // -------------------------
  // 1. Buscar la ruta en routerMeta
  // -------------------------
  const currentRoute = Object.values(routerMeta).find(
    (route) => route.path === path
  );

  // -------------------------
  // 2. Determinar si es ruta pública
  // -------------------------
  // Una ruta es pública si:
  // - isAuth === false (explícitamente no requiere auth)
  // - isCommon === true (ruta común para todos)
  const isPublicRoute =
    currentRoute?.isAuth === false || currentRoute?.isCommon === true;

  // Si es pública → dejar pasar
  if (isPublicRoute) {
    return children;
  }

  // -------------------------
  // 3. Proteger si no está logueado
  // -------------------------
  if (!isLogin) {
    return <Navigate to={routerMeta.LoginPage.path} replace />;
  }

  // -------------------------
  // 4. Rutas administrativas
  // -------------------------
  const isAdminRoute =
    path === routerMeta.DashboardAdminPage.path ||
    path.startsWith("/admin");

  if (isAdminRoute && role !== "Admin") {
    return <Navigate to="/user" replace />;
  }

  // -------------------------
  // 5. Rutas del usuario normal
  // -------------------------
  const isUserRoute =
    path === routerMeta.DashboardUsersPage.path ||
    path.startsWith("/user");

  if (isUserRoute && role !== "User") {
    return <Navigate to="/admin" replace />;
  }

  // -------------------------
  // 6. Si ya está logueado y quiere ir al login
  // -------------------------
  if (isLogin && path === routerMeta.LoginPage.path) {
    return <Navigate to={routerMeta.HomePage.path} replace />;
  }

  return children;
};

export default ProtectedRoute;