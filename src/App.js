import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navigation";
import Home from "./Components/Homepage/homePage";
import Footer from "./Components/Footer/footer";
import CollectionPage from "./Components/Collections/collections";
import { Route, Routes, Link } from "react-router-dom";
import Signup from "../src/Components/signup-login/signup";
import Login from "../src/Components/signup-login/login";
import Loading from "./Components/Loading/Loading";
import Cart from './Components/Cart/CartPage';
import SearchResults from './Components/searchItems/SearchResult'
import ContactPage from "./Components/ContactUs/contactUs";
import AboutUs from "./Components/AboutUs/aboutPage"
import Chatbot from "./Chatbot/chatbot";
import Order from "./Components/Order/Order"
import Trending from "./Components/Trending/Trending";
import axios from "axios";
import Snackbar from "./Components/snackbar";
import { useLocation } from "react-router-dom";
import ShoppingPolicies from "./Components/Order/ShippingPolicy";
import Exchange from "./Components/Order/Exchange";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]); // Trigger effect on pathname change

  return null; // This component doesn't render anything
};

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        Go Back To Home
      </Link>
    </div>
  );
}


function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track login state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

  // Fetch the cart items and update the count
  const fetchCartItems = async () => {
    const userData = sessionStorage.getItem("user");
    let email;

    if (userData) {
      try {
        const user = JSON.parse(userData);
        email = user.email;
      } catch (error) {
        console.error("Error parsing user data:", error);
        setSnackbarMessage("Invalid user data in session storage.");
        return;
      }
    }

    if (!email) {
      setSnackbarMessage("User email not found in session storage.");
      return;
    }

    try {
      const response = await axios.post(
        "https://adaa-jaipur-backend.onrender.com/api/users/getCart",
        { email }
      );
      const fetchedCart = response.data.cart;
      setCartItems(fetchedCart);
      setSnackbarMessage(response.data.message);

      // Only update cart count if it differs from the state value
      if (fetchedCart.length !== cartCount) {
        setCartCount(fetchedCart.length);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setSnackbarMessage(err.response?.data?.message || "Error fetching cart items");
      setSnackbarOpen(true)
    }
  };

  useEffect(() => {
      fetchCartItems();
  }, []); 

  const updateCartCount = (newCount) => {
    if (newCount !== cartCount) {
      setCartCount(newCount);
    }
  };

  return (
    <div className="overflow-x-hidden">
    <ScrollToTop/>
      <Loading />
      
      <Navbar cartCount={cartCount} setUserLoggedIn={setUserLoggedIn} />
      <Routes>
        <Route path="/" element={<Home updateCartCount={updateCartCount} cartCount={cartCount} />} />
        <Route path="/trending" element={<Trending updateCartCount={updateCartCount} cartCount={cartCount} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/collections" element={<CollectionPage updateCartCount={updateCartCount} cartCount={cartCount} />} />
        <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
        <Route path="/contactUs" element={<ContactPage/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/shoppingPolicy" element={<ShoppingPolicies/>} />
        <Route path="/exchange" element={<Exchange/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/searchResult" element={<SearchResults updateCartCount={updateCartCount} cartCount={cartCount} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
      <Chatbot className="-z-50"/>
    </div>
  );
}

export default App;

