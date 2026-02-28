import { renderHook, act } from "@testing-library/react";
import useIsLoginContext from "../src/hooks/useIsLoginContext";
import { expect, test, vi, beforeEach } from "vitest";
import token from "../src/lib/token";
import { ACCESS_TOKEN_KEY } from "../src/config/config";
import { jwtDecode } from "jwt-decode";

// Mocks
vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
}));

vi.mock("jwt-decode", () => ({
    jwtDecode: vi.fn(),
}));

vi.mock("../src/lib/token", () => ({
    default: {
        getToken: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

test("should initialize with no login if token is missing", () => {
    vi.mocked(token.getToken).mockReturnValue(null);

    const { result } = renderHook(() => useIsLoginContext());

    expect(result.current.isLogin).toBe(false);
    expect(result.current.hasValidToken).toBe(false);
    expect(result.current.role).toBe(null);
});

test("should initialize with login and role if token exists", () => {
    const mockToken = "fake-jwt-token";
    vi.mocked(token.getToken).mockReturnValue(mockToken);
    vi.mocked(jwtDecode).mockReturnValue({ role: "Admin" } as any);

    const { result } = renderHook(() => useIsLoginContext());

    expect(result.current.isLogin).toBe(true);
    expect(result.current.hasValidToken).toBe(true);
    expect(result.current.role).toBe("Admin");
});

test("should update isLogin state", () => {
    vi.mocked(token.getToken).mockReturnValue(null);
    const { result } = renderHook(() => useIsLoginContext());

    act(() => {
        result.current.setIsLogin(true);
    });

    expect(result.current.isLogin).toBe(true);
});

test("should update darkMode state", () => {
    const { result } = renderHook(() => useIsLoginContext());

    expect(result.current.darkMode).toBe(false);

    act(() => {
        result.current.setDarkMode(true);
    });

    expect(result.current.darkMode).toBe(true);
});

test("should update role state", () => {
    vi.mocked(token.getToken).mockReturnValue(null);
    const { result } = renderHook(() => useIsLoginContext());

    act(() => {
        result.current.setRole("User");
    });

    expect(result.current.role).toBe("User");
});
