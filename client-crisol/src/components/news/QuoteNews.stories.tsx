import type { Meta, StoryObj } from "@storybook/react";
import QuoteNews from "./home/QuoteNews";
import { withMockContext } from "../../stories/decorators/withMockContext";

const meta: Meta<typeof QuoteNews> = {
    title: "Components/News/QuoteNews",
    component: QuoteNews,
    decorators: [withMockContext],
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuote = {
    _id: "q1",
    title: "Marcus Aurelius",
    category: "Filosofía",
    contentQuote: {
        quoteText: "La fragilidad es el punto de partida de toda fuerza real.",
        context: "Meditaciones, Libro IV"
    },
    isPublished: true,
    createdAt: "2024-02-15T08:30:00Z"
};

export const Default: Story = {
    args: {
        news: mockQuote as any,
    },
};

export const LongQuote: Story = {
    args: {
        news: {
            ...mockQuote,
            contentQuote: {
                ...mockQuote.contentQuote,
                quoteText: "El diseño no es solo lo que se ve y lo que se siente. El diseño es cómo funciona en la mente del lector crítico y cómo perdura en el tiempo."
            }
        } as any,
    },
};
