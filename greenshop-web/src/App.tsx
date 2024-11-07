import "./App.css";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import HomePageShop from "./components/homepage-shop/HomePageShop";
import About from "./components/about/About";
import Blogs from "./components/homepage-blogs/Blogs";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";
import UserBar from "./components/responsive-userbar/UserBar";

function App() {
  return (
    <CartProvider>
      <Header />
      <Banner />
      <HomePageShop />
      <About />
      <Blogs />
      <Footer />
      <UserBar />
    </CartProvider>
  );
}

export default App;
