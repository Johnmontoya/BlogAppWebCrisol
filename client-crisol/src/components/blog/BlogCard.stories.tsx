import type { Meta, StoryObj } from "@storybook/react";
import BlogCard from "./BlogCard";
import { withMockContext } from "../../stories/decorators/withMockContext";

const meta: Meta<typeof BlogCard> = {
    title: "Components/Blog/BlogCard",
    component: BlogCard,
    decorators: [withMockContext],
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
    _id: "1",
    username: "John Doe",
    email: "john@example.com",
    role: "admin",
    accountVerified: true,
    createdAt: "2023-01-01T00:00:00.000Z",
};

const mockBlog = {
    _id: "1",
    author: mockUser,
    title: "The Future of Neo-Editorial Design",
    subTitle: "Exploring the intersection of typography and digital experience",
    description: "In the rapidly evolving landscape of digital media, the return to classical typographic principles has become a hallmark of quality...",
    category: "Design",
    image: new File([], "image.jpg") as any, // Mocking File for display purposes
    isPublished: true,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
};

// In a real Storybook, we might use a real image URL for the 'image' prop
const mockBlogWithImageUrl = {
    ...mockBlog,
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000&auto=format&fit=crop" as any,
};

export const Default: Story = {
    args: {
        blog: mockBlogWithImageUrl,
        author: mockUser,
    },
};

export const LongTitle: Story = {
    args: {
        blog: {
            ...mockBlogWithImageUrl,
            title: "This is a very long title for a blog post to test how the editorial grid handles multiple lines of typographic weight",
        },
        author: mockUser,
    },
};
