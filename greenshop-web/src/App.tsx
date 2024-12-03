import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";
import HomePage from "./components/pages/HomePage";
import DetailsPage from "./components/pages/DetailsPage";
import DevelopersPage from "./components/pages/DevelopersPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserBar from "./components/responsive-userbar/UserBar";
import { PlantsProvider } from "./context/PlantsContext";

function App() {
  return (
    <PlantsProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:label" element={<DetailsPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
          </Routes>
          <Footer />
          <UserBar />
        </Router>
      </CartProvider>
    </PlantsProvider>
  );
}

export default App;
