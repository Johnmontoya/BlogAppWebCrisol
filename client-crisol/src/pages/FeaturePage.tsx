import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";

const FeaturePage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-[70vh] py-24 px-6 ${darkMode ? "bg-brand-dark text-slate-100" : "bg-brand-light text-ink"}`}
    >
      <div className="max-w-screen-xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tight mb-12 border-b-2 border-accent pb-4 inline-block">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Mock Feature Cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className={`p-8 border transition-all duration-300 ${darkMode ? 'border-zinc-800 hover:border-accent' : 'border-ink hover:border-accent hover:shadow-lg'}`}>
              <h2 className="text-2xl font-bold mb-4">Característica {item}</h2>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Descubre cómo nuestra plataforma puede ayudarte a gestionar tus ideas de manera más efectiva.</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturePage;
