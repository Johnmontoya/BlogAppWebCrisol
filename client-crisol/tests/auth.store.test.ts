import { expect, test, beforeEach } from "vitest";
import { useAuthStore } from "../src/store/auth";

// Limpiar el estado antes de cada test
beforeEach(() => {
    useAuthStore.getState().logout();
});

test("should start with empty state", () => {
    const state = useAuthStore.getState();
    expect(state.userId).toBe("");
    expect(state.token).toBe("");
});

test("setUserData should update userId and token", () => {
    const { setUserData } = useAuthStore.getState();

    setUserData("user123", "fake-token");

    const state = useAuthStore.getState();
    expect(state.userId).toBe("user123");
    expect(state.token).toBe("fake-token");
});

test("logout should clear userId and token", () => {
    const { setUserData, logout } = useAuthStore.getState();

    // Primero seteamos datos
    setUserData("user123", "fake-token");

    // Luego cerramos sesión
    logout();

    const state = useAuthStore.getState();
    expect(state.userId).toBe("");
    expect(state.token).toBe("");
});

test("should persist data in localStorage (smoke test)", () => {
    const { setUserData } = useAuthStore.getState();
    setUserData("persistent-user", "persistent-token");

    const authData = localStorage.getItem("auth");
    expect(authData).toBeDefined();

    const parsedData = JSON.parse(authData!);
    expect(parsedData.state.userId).toBe("persistent-user");
    expect(parsedData.state.token).toBe("persistent-token");
});
