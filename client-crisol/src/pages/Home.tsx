import Blog from '../components/blog/Blog'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home