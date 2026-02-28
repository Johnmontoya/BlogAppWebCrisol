import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const Newsletter = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <section className="border-t border-b border-black dark:border-zinc-800 py-24 relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-5xl md:text-6xl font-black tracking-tight mb-6">
          El boletín del Editor
        </h2>
        <p className={`font-light text-xl mb-10 ${darkMode ? 'text-slate-400' : 'text-ink-light'}`}>
          Únete a nuestra comunidad global. Recibe las mejores noticias directamente en tu correo electrónico.
        </p>

        <div className="flex flex-col sm:flex-row max-w-xl mx-auto border border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(211,84,0,1)] transition-transform focus-within:translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[4px_4px_0px_0px_rgba(211,84,0,1)]">
          <input
            type="email"
            placeholder="Enter your email address"
            className={`flex-1 px-6 py-4 outline-none font-medium bg-transparent ${darkMode ? 'placeholder-zinc-600 text-white' : 'placeholder-gray-400 text-ink'
              }`}
          />
          <button className="bg-accent text-white px-8 py-4 font-bold tracking-wider uppercase border-l border-black dark:border-zinc-700 hover:bg-accent-hover transition-colors">
            Suscríbete
          </button>
        </div>

        <p className="text-xs font-medium tracking-widest uppercase mt-8 opacity-60">
          * Estrictamente sin spam. Puedes cancelar la suscripción en cualquier momento.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;