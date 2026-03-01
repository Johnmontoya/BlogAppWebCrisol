import type { Meta, StoryObj } from "@storybook/react";
import BlogCardSkeleton from "./BlogCardSkeleton";

const meta: Meta<typeof BlogCardSkeleton> = {
    title: "Components/Blog/BlogCardSkeleton",
    component: BlogCardSkeleton,
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
    decorators: [
        (Story) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Story />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        ),
    ],
};
