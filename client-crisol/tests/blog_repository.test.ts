import { getBlogs, getBlogsId, addBlog } from "../src/repositories/blog/blog_repository";
import apiClient from "../src/repositories/apiClient";
import { expect, test, vi, beforeEach } from "vitest";

// Mock del apiClient de axios
vi.mock("../src/repositories/apiClient", () => ({
    default: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

test("getBlogs should call apiClient with correct parameters", async () => {
    const mockData = [{ _id: "1", title: "Blog 1" }];
    vi.mocked(apiClient).mockResolvedValue({ data: mockData });

    const result = await getBlogs();

    expect(apiClient).toHaveBeenCalledWith({
        method: "get",
        url: "/api/v1/blog/all",
    });
    expect(result.data).toEqual(mockData);
});

test("getBlogsId should call apiClient with the correct ID", async () => {
    const mockBlog = { data: { _id: "123", title: "Specific Blog" } };
    vi.mocked(apiClient).mockResolvedValue(mockBlog);

    const result = await getBlogsId("123");

    expect(apiClient).toHaveBeenCalledWith({
        method: "get",
        url: "/api/v1/blog/123",
    });
    expect(result).toEqual(mockBlog);
});

test("addBlog should use multipart/form-data headers", async () => {
    const mockResponse = { data: { message: "Success" } };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append("title", "New Blog");

    const result = await addBlog(formData);

    expect(apiClient).toHaveBeenCalledWith({
        method: "post",
        url: "/api/v1/blog/add",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formData,
    });
    expect(result).toEqual(mockResponse);
});

test("should handle API errors", async () => {
    const error = new Error("Network Error");
    vi.mocked(apiClient).mockRejectedValue(error);

    await expect(getBlogs()).rejects.toThrow("Network Error");
});
