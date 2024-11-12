import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";
import HomePage from "./components/pages/HomePage";
import DetailsPage from "./components/pages/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserBar from "./components/responsive-userbar/UserBar";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:label" element={<DetailsPage />} />
        </Routes>
        <Footer />
        <UserBar />
      </Router>
    </CartProvider>
  );
}

export default App;