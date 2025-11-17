import Blog from "../components/blog/Blog";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Banner from "../components/Banner";
import { useAuthContext } from "../components/auth/AuthProvider";

const Home = () => {
  const { darkMode } = useAuthContext();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />
      <Banner />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
