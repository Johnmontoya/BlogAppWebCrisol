import type { Meta, StoryObj } from '@storybook/react';

const DesignSystem = () => {
    const colors = [
        { name: 'Brand Light', class: 'bg-brand-light', hex: '#f9f9f6', text: 'text-ink' },
        { name: 'Paper', class: 'bg-paper', hex: '#ffffff', text: 'text-ink' },
        { name: 'Ink', class: 'bg-ink', hex: '#1a1a1a', text: 'text-white' },
        { name: 'Ink Light', class: 'bg-ink-light', hex: '#444444', text: 'text-white' },
        { name: 'Accent', class: 'bg-accent', hex: '#d35400', text: 'text-white' },
        { name: 'Brand Dark', class: 'bg-brand-dark', hex: '#121212', text: 'text-slate-200' },
    ];

    return (
        <div className="p-8 space-y-16 max-w-4xl mx-auto">
            <section>
                <h1 className="font-serif text-4xl font-black mb-8 border-b border-black dark:border-zinc-800 pb-4">
                    Neo-Editorial Design System 🧊
                </h1>
                <p className="font-sans text-lg opacity-70 mb-12">
                    Fundamentos visuales para "Crisol de Ideas": Una mezcla de elegancia tipográfica clásica y minimalismo moderno.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl font-bold mb-6 tracking-widest uppercase text-accent">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {colors.map((color) => (
                        <div key={color.name} className="space-y-2 group">
                            <div className={`h-24 w-full rounded-none border border-black/10 dark:border-white/10 ${color.class} flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-sm`}>
                                <span className={`font-mono text-xs font-bold uppercase ${color.text}`}>{color.hex}</span>
                            </div>
                            <p className="font-sans text-sm font-bold tracking-wider uppercase opacity-80">{color.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="font-serif text-2xl font-bold mb-6 tracking-widest uppercase text-accent">Typography</h2>

                <div className="space-y-6">
                    <div className="pb-4 border-b border-black/5 dark:border-white/5">
                        <p className="text-xs font-mono opacity-50 mb-2">Display Serif / Playfair Display</p>
                        <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter leading-none">
                            The Art of Reflection.
                        </h1>
                        <h2 className="font-serif text-4xl md:text-5xl italic font-light mt-4">
                            Italic Weight for emphasis.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <p className="text-xs font-mono opacity-50 mb-2">Sans Serif / Outfit</p>
                            <p className="font-sans text-3xl font-black tracking-tight uppercase">Headline Sans Bold</p>
                            <p className="font-sans text-xl font-light leading-relaxed">
                                Body text legibility is key. Curated narratives for the modern mind.
                                Architecture of growth and deep analysis.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-mono opacity-50 mb-2">Editorial Blocks</p>
                            <blockquote className="border-l-4 border-accent pl-6 py-2 italic font-serif text-2xl opacity-90">
                                "Design is not just what it looks like and feels like. Design is how it works."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const meta: Meta = {
    title: "Design System/Foundations",
    component: DesignSystem,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
export const VisualIdentity: StoryObj = {};
