import type { Meta, StoryObj } from "@storybook/react";
import ProfileSkeleton from "./ProfileSkeleton";

const meta: Meta<typeof ProfileSkeleton> = {
    title: "Components/User/ProfileSkeleton",
    component: ProfileSkeleton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
