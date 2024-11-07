import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <CartProvider>
      <Header />
      <HomePage />
      <Footer />
    </CartProvider>
  );
}

export default App;
