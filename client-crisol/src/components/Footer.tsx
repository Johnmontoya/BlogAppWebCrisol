import { useContext } from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { UserContext } from "../contexts/UserContextProvider";

const Footer = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <footer
      className={`border-t border-black dark:border-zinc-800 ${darkMode ? "bg-brand-dark text-slate-300" : "bg-brand-light text-ink"
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 flex items-center justify-center font-serif text-2xl border ${darkMode ? 'border-zinc-800' : 'border-ink bg-ink text-white'}`}>
                CI
              </div>
              <span className="font-serif font-black text-2xl tracking-tighter">CRISOL DE IDEAS</span>
            </div>
            <p className="max-w-md text-lg leading-relaxed mb-8 font-light">
              Un espacio para el pensamiento crítico y la reflexión. Aquí encontrarás análisis profundos, perspectivas diversas y contenido que inspira y desafía.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`w-10 h-10 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
                <FaFacebook size={18} />
              </a>
              <a href="#" className={`w-10 h-10 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
                <BsTwitter size={18} />
              </a>
              <a href="#" className={`w-10 h-10 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
                <BsInstagram size={18} />
              </a>
              <a href="#" className={`w-10 h-10 flex items-center justify-center border rounded-full transition-colors ${darkMode ? 'border-zinc-800 hover:bg-zinc-800 hover:text-white' : 'border-ink hover:bg-ink hover:text-white'}`}>
                <BsLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest mb-6 border-b border-black dark:border-zinc-800 pb-2 inline-block">Directory</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Lista Clásica</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Mis Cuentas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Inversiones</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Información</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest mb-6 border-b border-black dark:border-zinc-800 pb-2 inline-block">Categories</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Tecnología</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Viajes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Deportes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Negocios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest mb-6 border-b border-black dark:border-zinc-800 pb-2 inline-block">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Nosotros</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Categorías</a></li>
              <li><a href="#" className="hover:text-accent transition-colors font-medium">Contactos</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-black dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-none text-black/5 dark:text-white/5 uppercase select-none mb-6 md:mb-0 text-center w-full md:text-left">
            Crisol
          </h1>
          <p className="text-sm tracking-wider uppercase opacity-60 font-medium md:whitespace-nowrap">
            © 2025 — Crisol de ideas.<br className="hidden md:block" /> Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
