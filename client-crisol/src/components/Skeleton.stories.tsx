import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
    title: "Components/Primitives/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    argTypes: {
        width: { control: "text" },
        height: { control: "text" },
        borderRadius: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: "200px",
        height: "20px",
    },
};

export const Circle: Story = {
    args: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
    },
};

export const FullWidth: Story = {
    args: {
        width: "100%",
        height: "16px",
    },
};
