import { render, screen } from "@testing-library/react";
import { UserContext } from "../src/contexts/UserContextProvider";
import BlogCard from "../src/components/blog/BlogCard";
import { expect, test, vi } from "vitest";

const mockBlog = {
    _id: "1",
    title: "Test Blog Title",
    description: "This is a test description for the blog card component.",
    category: "Technology",
    image: "test-image.jpg",
    createdAt: "2024-02-28T10:00:00Z",
};

const mockAuthor = {
    username: "TestAuthor",
} as any;

test("renders BlogCard with blog data", () => {
    const mockNavigate = vi.fn();

    render(
        <UserContext.Provider value={{ darkMode: false, navigate: mockNavigate } as any}>
            <BlogCard blog={mockBlog as any} author={mockAuthor} />
        </UserContext.Provider>
    );

    // Check Title
    expect(screen.getByText("Test Blog Title")).toBeInTheDocument();

    // Check Author
    expect(screen.getByText(/By TestAuthor/i)).toBeInTheDocument();

    // Check Category
    expect(screen.getByText("Technology")).toBeInTheDocument();

    // Check Read More link/text
    expect(screen.getByText(/Read Article/i)).toBeInTheDocument();
});

test("navigates when clicked", async () => {
    const mockNavigate = vi.fn();
    const { userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    render(
        <UserContext.Provider value={{ darkMode: false, navigate: mockNavigate } as any}>
            <BlogCard blog={mockBlog as any} author={mockAuthor} />
        </UserContext.Provider>
    );

    const article = screen.getByRole("article");
    await user.click(article);

    expect(mockNavigate).toHaveBeenCalledWith("/blog?id=1");
});
