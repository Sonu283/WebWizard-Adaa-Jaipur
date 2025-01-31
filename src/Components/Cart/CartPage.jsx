import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "../snackbar";

export default function CartPage({ updateCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const handleColorChange = (id, newColor) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueIdD === id ? { ...item, selectedColorD: newColor } : item
      )
    );
  };

  const handleSizeChange = (id, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueIdD === id ? { ...item, selectedSizeD: newSize } : item
      )
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.uniqueIdD === id
            ? { ...item, selectedQuantityD: newQuantity }
            : item
        )
      );
    }
  };

  // Function to fetch cart items
  const fetchCartItems = async () => {
    // Retrieve user data from session storage
    const userData = sessionStorage.getItem("user");

    // Check if userData exists and parse it
    let email;
    if (userData) {
      try {
        const user = JSON.parse(userData);
        email = user.email; // Get email from parsed user object
      } catch (error) {
        console.error("Error parsing user data:", error);
        setSnackbarMessage("Invalid user data in session storage.");
    setSnackbarOpen(true);
        navigate("/login");
        return;
      }
    }

    // Check if email was retrieved successfully
    if (!email) {
      setSnackbarMessage("User email not found in session storage.");
      setSnackbarOpen(true);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "https://adaa-jaipur-backend.onrender.com/api/users/getCart",
        { email }
      );
      setCartItems(response.data.cart); // Set cart items from response
      setSnackbarMessage(response.data.message);
      updateCartCount(response.data.cart.length); // Update count
      console.log(response);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Error fetching cart items"
      );
      setSnackbarOpen(true);
    }
  };



  const handleRemoveFromCart = async (uniqueId) => {
    // Retrieve user data from session storage
    const userData = sessionStorage.getItem("user");

    // Check if userData exists and parse it
    let email;
    if (userData) {
      try {
        const user = JSON.parse(userData);
        email = user.email; // Get email from parsed user object
      } catch (error) {
        console.error("Error parsing user data:", error);
        setSnackbarMessage("Invalid user data in session storage.");
        setSnackbarOpen(true);
        navigate("/login");
        return;
      }
    }

    // Check if email was retrieved successfully
    if (!email) {
      setSnackbarMessage("User email not found in session storage.");
      setSnackbarOpen(true);
      navigate("/login");
      return;
    }

    // Validate inputs
    if (!uniqueId) {
      setSnackbarMessage("Missing unique product ID.");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Make the API call to remove the product from the cart
      const response = await axios.post(
        "https://adaa-jaipur-backend.onrender.com/api/users/deleteFromCart",
        {
          email,
          uniqueId,
        }
      );

      setSnackbarMessage(response.data.message);
      setSnackbarMessage("Product is Removed");
      setSnackbarOpen(true);

      // Remove the product from the cartItems state
      const updatedCart = cartItems.filter(
        (item) => item.uniqueIdD !== uniqueId
      );

      setCartItems(updatedCart); // Update state with filtered cart
      updateCartCount(updatedCart.length); // Update the global cart count
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Error removing product from cart"
      );
      setSnackbarOpen(true);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceD * item.selectedQuantityD,
      0
    );
  };

  // Handle proceeding to checkout
  const handleCheckout = () => {
    // Assuming you have a way to get all products in cart or available for purchase
    const allProducts = cartItems; // Replace this with your actual logic to get all products
    setSnackbarMessage("Order Placed Succefully");
    setSnackbarOpen(true);
    navigate('/order', { state: { products: allProducts } });
  };

  // Effect to fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">←</span>
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/order")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">←</span>
              Your Orders
            </button>
            <h1 className="text-2xl font-bold text-center flex items-center">
              <span className="mr-2">🛍️</span>
              Shopping Cart
            </h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">🛍️</div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B00] hover:bg-[#ff8533] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div key={index} className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 flex-shrink-0">
                          <img
                            src={item.imageD || "/placeholder.svg"}
                            alt={item.nameD}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.nameD}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brandD}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleRemoveFromCart(
                                  item.uniqueIdD,
                                  item.selectedColorD,
                                  item.selectedSizeD
                                )
                              }
                              className="text-gray-400 hover:text-gray-500"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {/* Size Selection */}
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                Size
                              </label>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.sizeD.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() =>
                                      handleSizeChange(item.uniqueIdD, size)
                                    }
                                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${item.selectedSizeD === size
                                        ? "border-[#FF6B00] bg-[#FF6B00] text-white font-semibold"
                                        : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                Color
                              </label>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.colorD.map((color) => (
                                  <button
                                    key={color}
                                    onClick={() =>
                                      handleColorChange(item.uniqueIdD, color)
                                    }
                                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${item.selectedColorD === color
                                        ? "ring-2 ring-[#FF6B00] ring-offset-2"
                                        : "border-gray-300 hover:border-gray-400"
                                      }`}
                                    style={{ backgroundColor: color }}
                                  >
                                    {item.selectedColorD === color && (
                                      <span className="text-xs font-bold">
                                        {color === "white" ? "✓" : "✓"}
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.uniqueIdD,
                                    item.selectedQuantityD - 1
                                  )
                                }
                                disabled={item.selectedQuantityD <= 1}
                                className="p-2 hover:bg-gray-50"
                              >
                                −
                              </button>
                              <span className="px-4 py-2 text-sm font-medium">
                                {item.selectedQuantityD}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.uniqueIdD,
                                    item.selectedQuantityD + 1
                                  )
                                }
                                className="p-2 hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Price</p>
                              <p className="text-lg font-semibold text-gray-900">
                                ₹{item.priceD}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    {cartItems.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">
                          ₹{calculateTotal().toFixed(2)}
                        </span>{" "}
                        {/* Format total to 2 decimal places */}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#FF6B00] text-white py-3 px-4 rounded-md hover:bg-[#ff8533] transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
    </div>
  );
}
