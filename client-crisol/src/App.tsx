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

const assignRouter = Object.keys(routerMeta).map((key) => {
  const meta = routerMeta[key];
  const filePath = meta.file ?? key; // si no tiene "file", usa el nombre de la página

  return {
    Component: lazyImport(filePath),
    props: meta,
  };
});

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Routes>
            <Route element={<Layout />}>
              {assignRouter.map(({ Component, props }) => (
                <Route
                  key={props.path}
                  path={props.path}
                  element={
                    <ProtectedRoute path={props.path}>
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
              ))}
            </Route>
          </Routes>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
