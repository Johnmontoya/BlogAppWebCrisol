import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";

const ContactPage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-[70vh] py-24 px-6 ${darkMode ? "bg-brand-dark text-slate-100" : "bg-brand-light text-ink"}`}
    >
      <div className="max-w-screen-md mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 border-b-2 border-accent pb-4 inline-block text-center w-full">Contactanos</h1>
        <p className={`text-xl leading-relaxed mb-12 text-center ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>¿Tienes alguna pregunta o propuesta? Escríbenos.</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium uppercase tracking-wider mb-2" htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name" 
              className={`w-full p-4 border focus:outline-none focus:border-accent transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'}`} 
              placeholder="Tu nombre" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium uppercase tracking-wider mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className={`w-full p-4 border focus:outline-none focus:border-accent transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'}`} 
              placeholder="Tu dirección de correo" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium uppercase tracking-wider mb-2" htmlFor="message">Mensaje</label>
            <textarea 
              id="message" 
              rows={5} 
              className={`w-full p-4 border focus:outline-none focus:border-accent transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'}`} 
              placeholder="¿Qué tienes en mente?"
            ></textarea>
          </div>
          <button type="submit" className={`w-full p-4 text-white font-bold uppercase tracking-wider bg-accent hover:opacity-90 transition-opacity`}>Enviar Mensaje</button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
