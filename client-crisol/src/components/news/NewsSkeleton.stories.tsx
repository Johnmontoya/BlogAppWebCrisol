import type { Meta, StoryObj } from "@storybook/react";
import NewsSkeleton, { HeroNewsSkeleton, BulletNewsSkeleton } from "./NewsSkeleton";

const meta: Meta<typeof NewsSkeleton> = {
    title: "Components/News/NewsSkeleton",
    component: NewsSkeleton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Combined: Story = {};

export const HeroOnly: Story = {
    render: () => <HeroNewsSkeleton />,
};

export const BulletOnly: Story = {
    render: () => <BulletNewsSkeleton />,
};
