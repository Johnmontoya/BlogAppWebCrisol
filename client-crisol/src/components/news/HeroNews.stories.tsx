import type { Meta, StoryObj } from "@storybook/react";
import HeroNews from "./home/HeroNews";
import { withMockContext } from "../../stories/decorators/withMockContext";

const meta: Meta<typeof HeroNews> = {
    title: "Components/News/HeroNews",
    component: HeroNews,
    decorators: [withMockContext],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockNews = {
    _id: "1",
    title: "La Estética de la Soledad en la Era Digital",
    category: "Cultura",
    contentHero: {
        imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop",
        description: "Analizamos cómo la hiperconexión moderna ha transformado nuestra percepción del aislamiento y la introspección personal."
    },
    isPublished: true,
    createdAt: "2024-03-01T10:00:00Z"
};

export const Default: Story = {
    args: {
        news: mockNews as any,
    },
};

export const WithoutImage: Story = {
    args: {
        news: {
            ...mockNews,
            contentHero: {
                ...mockNews.contentHero,
                imageUrl: ""
            }
        } as any,
    },
};
