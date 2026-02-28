import { useContext } from "react";
import Banner from "../components/Banner";
import Blog from "../components/blog/Blog";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { UserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";

const HomePage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`${darkMode ? "bg-brand-dark text-slate-100" : "bg-brand-light text-ink"}`}
    >
      <Banner />
      <Blog />
      <Newsletter />
      <Footer />
    </motion.div>
  );
};

export default HomePage;
