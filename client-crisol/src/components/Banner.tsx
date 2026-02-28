import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";

const Banner = () => {
  const { darkMode } = useContext(UserContext);

  const containerVars: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVars: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full border-b border-black dark:border-zinc-800 overflow-hidden">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-screen-2xl mx-auto px-6 py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center"
      >
        <motion.h1
          variants={itemVars}
          className="font-serif font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-8"
        >
          El Arte de <br />
          <span className="italic font-light text-accent">Reflexión.</span>
        </motion.h1>

        <motion.p
          variants={itemVars}
          className={`text-xl md:text-2xl font-light max-w-2xl leading-relaxed ${darkMode ? "text-slate-300" : "text-ink-light"}`}
        >
          Narrativas seleccionadas sobre amor, pérdida y la arquitectura del crecimiento.
          Un santuario para la mente moderna.
        </motion.p>

        <motion.div
          variants={itemVars}
          className="mt-12 w-[1px] h-24 bg-black dark:bg-zinc-800"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
