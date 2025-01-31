
import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Snackbar from "../snackbar";

export default function Trending({ updateCartCount }) {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Ensure quantity doesn't go below 1

  // Fetch search results
  const fetchSearchResults = async () => {
    try {
      const response = await axios.get("https://adaa-jaipur-backend.onrender.com/api/cloth/getCloth");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching cloths:", error);
      setError("Failed to fetch products.");
    }
  };

  // Filter results by rating
  const filterByRating = (results) => {
    return results.filter(item => item.ratingD > 4.2);
  };

  // Effect to fetch results and filter them
  useEffect(() => {
    fetchSearchResults(); // Fetch results on mount
  }, []);

  // Effect to filter results whenever searchResults change
  useEffect(() => {
    if (searchResults.length > 0) {
      const filtered = filterByRating(searchResults);
      setFilteredResults(filtered);
    }
  }, [searchResults]);

  // Effect to handle selected product
  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colorD?.[0] || "");
      setSelectedSize(selectedProduct.sizeD?.[0] || "");
      setQuantity(1);
    }
  }, [selectedProduct]);

  // Rendering stars for ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-3 h-3 ${index < Math.floor(rating)
              ? "fill-orange-500 text-orange-500"
              : index < rating
                ? "fill-orange-500 text-orange-500 opacity-50"
                : "text-gray-300"
              }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    );
  };

  // Generate thumbnails for images
  const generateThumbnails = (images) => {
    return images.length ? images : ['/placeholder.svg'];
  };
  const handleAddToCart = async (item) => {
    const userData = sessionStorage.getItem("user");
    let email;

    // Retrieve user email from session storage
    if (userData) {
      try {
        const user = JSON.parse(userData);
        email = user.email;
      } catch (error) {
        console.error("Error parsing user data:", error);
        setSnackbarMessage("Invalid user data in session storage.");
        setSnackbarOpen(true)
        navigate("/login");
        return;
      }
    }

    // Redirect to login if email is missing
    if (!email) {
      setSnackbarMessage("User email not found in session storage.");
      setSnackbarOpen(true)
      navigate("/login");
      return;
    }

    // Ensure color and size are selected
    if (!selectedColor || !selectedSize) {
      setSnackbarMessage("Please select a color and size before adding to cart.");
      setSnackbarOpen(true)
      return;
    }

    try {
      // Prepare product data with selected options and additional information
      const productData = {
        idD: item.idD, // Product ID
        nameD: item.nameD, // Product Name
        selectedColorD: selectedColor, // User-selected color
        selectedSizeD: selectedSize, // User-selected size
        colorD: item.colorD, // Available colors
        sizeD: item.sizeD, // Available sizes
        selectedQuantityD: quantity, // User-selected quantity
        quantityD: item.quantityD, // Total available quantity
        detailD: item.detailD, // Product details
        priceD: item.priceD, // Product price
        imageD: item.imageD, // Product image URL
        originalPriceD: item.originalPriceD, // Original product price
        ratingD: item.ratingD, // Product rating
      };

      // Make API call to add product to the cart
      const response = await axios.post("https://adaa-jaipur-backend.onrender.com/api/users/addToCart", {
        email,
        product: productData,
      });

      // Handle the backend response
      if (response.data && response.data.message) {
        setSnackbarMessage(response.data.message);

        // Product successfully added
        if (response.data.message === "Product added to cart successfully") {
          updateCartCount((cartCount) => cartCount + 1); // Update cart count
          setSnackbarMessage("Product added to cart");
          setSnackbarOpen(true)
        } else if (response.data.message === "Item already exists in cart") {
          // Product already exists in cart
          setSnackbarMessage("This item is already in your cart with the same size and color.");
          setSnackbarOpen(true)
        }
      } else {
        setSnackbarMessage("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSnackbarMessage(err.response?.data?.message || "Error adding to cart");
    } finally {
      setSelectedProduct(null)
      setSelectedThumbnail(0)
    }
  };

  const bannerName = "BEST CLOTH";
  const splitName = bannerName.split(" "); // Splitting by space

  return (
    <div className="product-container mt-4">
      <h2 className="text-center text-2xl font-bold bg-custom-orange text-white mt-3">Search Results</h2>

      {error && <p className="text-red-500">{error}</p>}

      {filteredResults.length > 0 ? (
        <div >


          <div className="container  ">
            <h1 className="text-4xl font-bold tracking-tight mb-7">

              <span className="text-[#FF6B00]">{splitName[0]} </span>
              <span className="mr-4">{splitName[1]}</span>
              <span className="text-[#FF6B00]">FASH</span>
              IONS
            </h1>
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 ">
                {filteredResults.map((product, index) => {
                  const { idD, priceD, detailD, nameD, quantityD, ratingD, originalPriceD, imageD } = product;
                  return (
                    <div
                      key={idD}
                      className="min-w-[232px] max-w-[220px] bg-white rounded-lg border-primary border-b-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-0 relative border-orange-300 border-b-2">

                        <div className="flex justify-center items-center h-[200px]">
                          <img src={imageD || "/placeholder.svg"} alt={nameD} className="object-fit rounded-t-lg h-full" />
                        </div>


                        <span className="absolute top-2 right-2 bg-black/75 text-white text-xs font-bold px-2 py-1 rounded">
                          {Math.round(
                            ((parseFloat(
                              originalPriceD
                              // .replace("₹", "").replace(",", "")
                            ) -
                              parseFloat(
                                priceD
                                // .replace("₹", "").replace(",", "")
                              )) /
                              parseFloat(
                                originalPriceD
                                // .replace("₹", "")
                                // .replace(",", "")
                              )) *
                            100
                          )}
                          % OFF
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-1 p-3 flex-grow">
                        <h3 className="font-semibold text-sm">{nameD}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {detailD}
                        </p>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-sm font-bold text-orange-500">
                            {priceD}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            {product.originalPriceD}
                          </span>
                        </div>
                        {renderStars(ratingD)}
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`${quantityD < 5
                              ? "text-red-500"
                              : quantityD < 10
                                ? "text-orange-500"
                                : "text-green-500"
                              }`}
                          >
                            {quantityD < 5
                              ? "Only " + quantityD + " left!"
                              : quantityD < 10
                                ? "Limited stock"
                                : "In stock"}
                          </span>
                        </div>
                        <button
                          className="mt-2 w-full px-4 py-2 bg-orange-500 bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500 rounded-md transition-all duration-300 text-sm"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  )
                })}
                <div className="min-w-[220px] flex items-center justify-center">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500 rounded-md transition-all duration-300 flex items-center gap-2 group text-sm shadow-sm hover:shadow-md"
                  >
                    Explore More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}

          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-end mb-4">
                    <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8">


                    <div className="flex gap-4 lg:w-2/3">
                      {/* Thumbnails */}
                      <div className="flex flex-col gap-3">
                        {generateThumbnails(selectedProduct.imageD).map((img, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedThumbnail(index)}
                            className={`w-20 h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedThumbnail === index
                              ? "border-orange-500 shadow-md"
                              : "border-gray-200 hover:border-orange-300"
                              }`}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`View ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      {/* Main image */}
                      <div className="flex-1 border rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={generateThumbnails(selectedProduct.imageD)[selectedThumbnail] || "/placeholder.svg"}
                          alt={selectedProduct.nameD}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right side - Product details */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedProduct.nameD}</h2>
                        <p className="text-gray-600">{selectedProduct.detailD}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-orange-500">{selectedProduct.priceD}</span>
                        <span className="text-lg text-gray-500 line-through">{selectedProduct.originalPriceD}</span>
                        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {Math.round(
                            ((Number.parseFloat(selectedProduct.originalPriceD) - Number.parseFloat(selectedProduct.priceD)) /
                              Number.parseFloat(selectedProduct.originalPriceD)) *
                            100,
                          )}
                          % OFF
                        </span>
                      </div>

                      <div className="space-y-4">
                        {/* Color Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color:</label>
                          <div className="flex gap-2">
                            {selectedProduct.colorD?.map((color, index) => (
                              <label
                                key={index}
                                className={`cursor-pointer w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-orange-500 ring-2 ring-orange-500" : "border-gray-300"
                                  }`}
                                style={{ backgroundColor: color }}
                              >
                                <input
                                  type="radio"
                                  name="color"
                                  value={color}
                                  className="sr-only"
                                  onChange={() => setSelectedColor(color)}
                                  checked={selectedColor === color}
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.sizeD?.map((size, index) => (
                              <label
                                key={index}
                                className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${selectedSize === size
                                  ? "border-orange-500 text-orange-500 bg-orange-100"
                                  : "border-gray-300 text-gray-700"
                                  }`}
                              >
                                <input
                                  type="radio"
                                  name="size"
                                  value={size}
                                  className="sr-only"
                                  onChange={() => setSelectedSize(size)}
                                  checked={selectedSize === size}
                                />
                                {size}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Quantity Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                          <div className="flex items-center gap-3">
                            <button
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              onClick={decreaseQuantity}
                            >
                              -
                            </button>
                            <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                            <button
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              onClick={increaseQuantity}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span
                            className={`${selectedProduct.quantityD < 5
                              ? "text-red-500"
                              : selectedProduct.quantityD < 10
                                ? "text-orange-500"
                                : "text-green-500"
                              }`}
                          >
                            {selectedProduct.quantityD < 5
                              ? "Only " + selectedProduct.quantityD + " left!"
                              : selectedProduct.quantityD < 10
                                ? "Limited stock"
                                : "In stock"}
                          </span>
                        </div>
                        {renderStars(selectedProduct.ratingD)}
                      </div>

                      <button
                        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart
                      </button>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Snackbar
            message={snackbarMessage}
            isOpen={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            duration={2000}
          />
          <style >{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
      }
    `}</style>
        </div>
      ) : (
        <p className="no-products-found">No products found matching your query.</p>
      )}
    </div>
  );
}
