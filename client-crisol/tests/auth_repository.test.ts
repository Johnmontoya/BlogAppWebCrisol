import { postLogin, registerUser, forgotPassword, resetPassword } from "../src/repositories/auth/auth_repository";
import apiClient from "../src/repositories/apiClient";
import { expect, test, vi, beforeEach } from "vitest";

// Mock del apiClient de axios
vi.mock("../src/repositories/apiClient", () => ({
    default: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

test("postLogin should call apiClient with correct parameters", async () => {
    const loginData = { email: "test@example.com", password: "password123" };
    const mockResponse = { data: { token: "fake-jwt-token", userId: "123" } };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);

    const result = await postLogin(loginData);

    expect(apiClient).toHaveBeenCalledWith({
        method: "post",
        url: "/api/v1/user/login",
        data: loginData,
    });
    expect(result.data).toEqual(mockResponse.data);
});

test("registerUser should call apiClient with registration data", async () => {
    const registerData = { username: "newuser", email: "new@example.com", password: "password123" };
    const mockResponse = { data: { message: "User registered successfully" } };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);

    const result = await registerUser(registerData as any);

    expect(apiClient).toHaveBeenCalledWith({
        method: "post",
        url: "/api/v1/user/register",
        data: registerData,
    });
    expect(result.data.message).toBe("User registered successfully");
});

test("forgotPassword should call apiClient with email", async () => {
    const forgotData = { email: "test@example.com" };
    const mockResponse = { data: { message: "Email sent" } };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);

    const result = await forgotPassword(forgotData);

    expect(apiClient).toHaveBeenCalledWith({
        method: "post",
        url: "/api/v1/user/forgot",
        data: forgotData,
    });
    expect(result.data.message).toBe("Email sent");
});

test("resetPassword should call apiClient with new password data", async () => {
    const resetData = { password: "newpassword123", token: "reset-token" };
    const mockResponse = { data: { message: "Password reset correctly" } };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);

    const result = await resetPassword(resetData as any);

    expect(apiClient).toHaveBeenCalledWith({
        method: "put",
        url: "/api/v1/user/reset",
        data: resetData,
    });
    expect(result.data.message).toBe("Password reset correctly");
});

test("should handle auth API errors", async () => {
    const error = { response: { data: { message: "Invalid credentials" }, status: 401 } };
    vi.mocked(apiClient).mockRejectedValue(error);

    await expect(postLogin({ email: "wrong@test.com", password: "123" })).rejects.toEqual(error);
});
