import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";
import { withMockContext } from "../stories/decorators/withMockContext";

const meta: Meta<typeof Footer> = {
    title: "Components/Navigation/Footer",
    component: Footer,
    decorators: [withMockContext],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
