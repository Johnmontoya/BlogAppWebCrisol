import { render, screen } from "@testing-library/react";
import { UserContext } from "../src/contexts/UserContextProvider";
import ProtectedRoute from "../src/components/protected/ProtectedRoute";
import { expect, test, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock para los componentes hijos
const PrivateContent = () => <div>Private Content</div>;
const LoginPage = () => <div>Login Page</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const UserDashboard = () => <div>User Dashboard</div>;

const renderProtectedRoute = (contextValue: any, path: string) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <UserContext.Provider value={contextValue}>
                <Routes>
                    <Route
                        path={path}
                        element={
                            <ProtectedRoute path={path}>
                                <PrivateContent />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/user" element={<UserDashboard />} />
                </Routes>
            </UserContext.Provider>
        </MemoryRouter>
    );
};

test("allows access to public routes without login", () => {
    const context = { isLogin: false, hasValidToken: false };
    renderProtectedRoute(context, "/"); // HomePage es isCommon: true
    expect(screen.getByText("Private Content")).toBeInTheDocument();
});

test("redirects to login if trying to access private route without being logged in", () => {
    const context = { isLogin: false, hasValidToken: false };
    renderProtectedRoute(context, "/profile"); // ProfilePage es isAuth: true
    expect(screen.getByText("Login Page")).toBeInTheDocument();
});

test("allows access to private route if logged in with valid token", () => {
    const context = { isLogin: true, hasValidToken: true, role: "User" };
    renderProtectedRoute(context, "/profile");
    expect(screen.getByText("Private Content")).toBeInTheDocument();
});

test("redirects non-admin user trying to access admin dashboard", () => {
    const context = { isLogin: true, hasValidToken: true, role: "User" };
    renderProtectedRoute(context, "/admin");
    expect(screen.getByText("User Dashboard")).toBeInTheDocument();
});

test("allows admin user to access admin dashboard", () => {
    const context = { isLogin: true, hasValidToken: true, role: "Admin" };
    renderProtectedRoute(context, "/admin");
    expect(screen.getByText("Private Content")).toBeInTheDocument();
});

test("redirects admin user trying to access user dashboard", () => {
    const context = { isLogin: true, hasValidToken: true, role: "Admin" };
    renderProtectedRoute(context, "/user");
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
});
