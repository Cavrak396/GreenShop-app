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
import { AuthProvider } from "./context/AuthContext";
import { CommentsProvider } from "./context/ReviewsContext";
import { ToastContainer } from "react-toastify";
import { SubscriberProvider } from "./context/SubscribersContext";
import { PaginationProvider } from "./context/PaginationContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <PlantsProvider>
      <AuthProvider>
        <SubscriberProvider>
          <CartProvider>
            <Router>
              <CommentsProvider>
                <PaginationProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                    <Route path="/developers" element={<DevelopersPage />} />
                  </Routes>
                  <Footer />
                  <UserBar />
                  <ToastContainer position="top-right" autoClose={3000} />
                </PaginationProvider>
              </CommentsProvider>
            </Router>
          </CartProvider>
        </SubscriberProvider>
      </AuthProvider>
    </PlantsProvider>
  );
}

export default App;
