import "./App.css";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import HomePageShop from "./components/homepage-shop/HomePageShop";
import About from "./components/about/About";
import Blogs from "./components/homepage-blogs/Blogs";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <Banner />
      <HomePageShop />
      <About />
      <Blogs />
      <Footer />
    </CartProvider>
  );
}

export default App;
