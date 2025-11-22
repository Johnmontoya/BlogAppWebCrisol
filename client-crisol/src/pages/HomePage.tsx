import { useContext } from "react";
import Banner from "../components/Banner";
import Blog from "../components/blog/Blog";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { UserContext } from "../contexts/UserContextProvider";

const HomePage = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Banner />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
