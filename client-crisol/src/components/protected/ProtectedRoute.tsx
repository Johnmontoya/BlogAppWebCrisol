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
  // 1. Rutas públicas
  // -------------------------
  const publicPaths = [
    routerMeta.LoginPage.path,
    routerMeta.RegisterPage.path,
    routerMeta.ForgotPage.path,
    routerMeta.ResetPassPage.path,
    routerMeta.HomePage.path,
    routerMeta.BlogPage.path
  ];

  // Si es pública → dejar pasar
  if (publicPaths.includes(path)) {
    return children;
  }

  // -------------------------
  // 2. Proteger si no está logueado
  // -------------------------
  if (!isLogin) {
    return <Navigate to={routerMeta.LoginPage.path} replace />;
  }

  // -------------------------
  // 3. Rutas administrativas
  // -------------------------
  const isAdminRoute =
    path === routerMeta.DashboardAdminPage.path ||
    path.startsWith("/admin");

  if (isAdminRoute && role !== "Admin") {
    return <Navigate to="/user" replace />;
  }

  // -------------------------
  // 4. Rutas del usuario normal
  // -------------------------
  const isUserRoute =
    path === routerMeta.DashboardUsersPage.path ||
    path.startsWith("/user");

  if (isUserRoute && role !== "User") {
    return <Navigate to="/admin" replace />;
  }

  // -------------------------
  // 5. Si ya está logueado y quiere ir al login
  // -------------------------
  if (isLogin && path === routerMeta.LoginPage.path) {
    return <Navigate to={routerMeta.HomePage.path} replace />;
  }

  return children;
};

export default ProtectedRoute;

