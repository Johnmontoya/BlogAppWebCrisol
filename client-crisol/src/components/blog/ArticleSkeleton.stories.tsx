import type { Meta, StoryObj } from "@storybook/react";
import ArticleSkeleton from "./ArticleSkeleton";

const meta: Meta<typeof ArticleSkeleton> = {
    title: "Components/Blog/ArticleSkeleton",
    component: ArticleSkeleton,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
    decorators: [
        (Story) => (
            <div className="max-w-4xl mx-auto p-6">
                <Story />
            </div>
        ),
    ],
};
