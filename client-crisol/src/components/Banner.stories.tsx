import type { Meta, StoryObj } from "@storybook/react";
import Banner from "./Banner";
import { withMockContext } from "../stories/decorators/withMockContext";

const meta: Meta<typeof Banner> = {
    title: "Components/Marketing/Banner",
    component: Banner,
    decorators: [withMockContext],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
