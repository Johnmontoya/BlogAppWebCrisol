import type { Meta, StoryObj } from "@storybook/react";
import Newsletter from "./Newsletter";
import { withMockContext } from "../stories/decorators/withMockContext";

const meta: Meta<typeof Newsletter> = {
    title: "Components/Marketing/Newsletter",
    component: Newsletter,
    decorators: [withMockContext],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};