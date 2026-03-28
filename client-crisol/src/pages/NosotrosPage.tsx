import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";

const NosotrosPage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-[70vh] py-24 px-6 ${darkMode ? "bg-brand-dark text-slate-100" : "bg-brand-light text-ink"}`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 border-b-2 border-accent pb-4 inline-block">Nosotros</h1>
          <p className="text-xl leading-relaxed mb-6">En Crisol de Ideas, creemos en el poder de la creatividad y la innovación. Nuestro objetivo es proporcionar un espacio donde las mentes brillantes puedan compartir sus pensamientos e inspirar a otros.</p>
          <p className="text-xl leading-relaxed">Únete a nuestra vibrante comunidad de pensadores y creadores.</p>
        </div>
        <div className="flex-1">
          {/* Simple aesthetic placeholder for Nosotros */}
          <div className={`w-full aspect-square md:aspect-[4/3] rounded overflow-hidden shadow-2xl relative ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
             <div className="absolute inset-0 bg-gradient-to-tr from-accent to-transparent opacity-50 mix-blend-multiply"></div>
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NosotrosPage;
