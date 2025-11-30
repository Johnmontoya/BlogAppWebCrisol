import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  QueryClientProvider,
  QueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import UserContextProvider from "./contexts/UserContextProvider";
import routerMeta from "./interfaces/routerMeta";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import LoadingFallback from "./components/fallbacks/LoadingFallback";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/fallbacks/ErrorFallback";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const pages = import.meta.glob("./pages/**/*.tsx");

const lazyImport = (file: string) =>
  lazy(pages[`./pages/${file}.tsx`] as () => Promise<any>);

// Rutas que NO necesitan Layout (auth pages)
const authRoutes = [
  routerMeta.LoginPage,
  routerMeta.RegisterPage,
  routerMeta.ForgotPage,
  routerMeta.UserVerifyPage,
  routerMeta.ResetPassPage,
];

// Rutas que SÍ necesitan Layout
const layoutRoutes = Object.keys(routerMeta)
  .map((key) => routerMeta[key])
  .filter((route) => !authRoutes.includes(route));

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Routes>
            {/* Rutas SIN Layout (Auth) */}
            {authRoutes.map((meta) => {
              const filePath = meta.file ?? meta.name;
              const Component = lazyImport(filePath!);

              return (
                <Route
                  key={meta.path}
                  path={meta.path}
                  element={
                    <ProtectedRoute path={meta.path}>
                      <Suspense fallback={<LoadingFallback />}>
                        <ErrorBoundary
                          onReset={reset}
                          fallbackRender={({ resetErrorBoundary }) => (
                            <ErrorFallback
                              resetErrorBoundary={resetErrorBoundary}
                            />
                          )}
                        >
                          <Component />
                        </ErrorBoundary>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
              );
            })}

            {/* Rutas CON Layout */}
            <Route element={<Layout />}>
              {layoutRoutes.map((meta) => {
                const filePath = meta.file ?? meta.name;
                const Component = lazyImport(filePath!);

                return (
                  <Route
                    key={meta.path}
                    path={meta.path}
                    element={
                      <ProtectedRoute path={meta.path}>
                        <Suspense fallback={<LoadingFallback />}>
                          <ErrorBoundary
                            onReset={reset}
                            fallbackRender={({ resetErrorBoundary }) => (
                              <ErrorFallback
                                resetErrorBoundary={resetErrorBoundary}
                              />
                            )}
                          >
                            <Component />
                          </ErrorBoundary>
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;