import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetBlogIdQueries, useCreateBlogMutation } from "../src/queries/blog.query";
import { getBlogsId, addBlog } from "../src/repositories/blog/blog_repository";
import { expect, test, vi, beforeEach } from "vitest";
import React from "react";

// Mock del repositorio
vi.mock("../src/repositories/blog/blog_repository", () => ({
    getBlogsId: vi.fn(),
    addBlog: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

beforeEach(() => {
    vi.clearAllMocks();
});

test("useGetBlogIdQueries should fetch blog data by ID", async () => {
    const mockBlog = { _id: "123", title: "Test Blog" };
    vi.mocked(getBlogsId).mockResolvedValue({ data: { blog: mockBlog } } as any);

    const { result } = renderHook(() => useGetBlogIdQueries("123"), {
        wrapper: createWrapper(),
    });

    // Inicialmente debería estar cargando
    expect(result.current.isLoading).toBe(true);

    // Esperar a que la data llegue
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.blog).toEqual(mockBlog);
    expect(getBlogsId).toHaveBeenCalledWith("123");
});

test("useCreateBlogMutation should call addBlog repository", async () => {
    const mockResponse = { data: { message: "Created" } };
    vi.mocked(addBlog).mockResolvedValue(mockResponse as any);

    const { result } = renderHook(() => useCreateBlogMutation(), {
        wrapper: createWrapper(),
    });

    const formData = new FormData();
    formData.append("title", "New Blog");

    await result.current.mutateAsync(formData);

    expect(addBlog).toHaveBeenCalled();
});

test("useGetBlogIdQueries should not run if ID is missing", () => {
    const { result } = renderHook(() => useGetBlogIdQueries(""), {
        wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(getBlogsId).not.toHaveBeenCalled();
});
