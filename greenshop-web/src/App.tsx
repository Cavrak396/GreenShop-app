import "./App.css";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import HomePageShop from "./components/homepage-shop/HomePageShop";
import About from "./components/about/About";
import Blogs from "./components/homepage-blogs/Blogs";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <HomePageShop />
      <About />
      <Blogs />
      <Footer />
    </>
  );
}

export default App;
