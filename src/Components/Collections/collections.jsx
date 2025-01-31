
//Contains all cloth and filters
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "../snackbar";
import { ChevronDown, ChevronUp } from 'lucide-react';

const ToggleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Toggle button - only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white lg:hidden border-b"
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Content - always visible on desktop, toggleable on mobile */}
      <div
        className={`
          lg:block 
          ${isOpen ? 'block' : 'hidden'}
          bg-white p-4
        `}
      >
        {children}
      </div>
    </div>
  );
};

const ClothFilter = ({ updateCartCount }) => {
  const [clothList, setClothList] = useState([]);
  const [nameFilters, setNameFilters] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [subCategoryFilters, setSubCategoryFilters] = useState({});
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const bannerName = "FILTERED RESULTS";

  const subCategories = {
    Kurta: ["A-Line Straight Kurta", "Embroidery Kurta", "Straight Kurta"],
    "Kurtas Sets": [
      "Ethnic Embroidered Sequinned Kurta",
      "Printed Kurtas",
      "Kurta With Trousers & With Dupatta",
    ],
    Gown: ["Ankle Gown", "Gown With Malmal Dupatta", "Gown With Chinon Dupatta"],
    Bottom: ["Pant", "Palazzo"],
    Tops: ["Co-Ords", "Shirt", "Short", "Tunics"],
  };

  const [ratingFilters, setRatingFilters] = useState({
    '4.5+': false,
    '4.0-4.4': false,
    '3.5-3.9': false,
    '3.0-3.4': false,
    'Below 3.0': false
  });

  const [colorFilters, setColorFilters] = useState({
    Orange: false,
    Purple: false,
    Yellow: false,
    Blue: false,
    Black: false,
    Red: false,
    Green: false,
    Pink: false,

  });

  const [sizeFilters, setSizeFilters] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,

  });

  const [priceFilters, setPriceFilters] = useState({
    "0-1500": false,
    "1500-3500": false,
    "3500+": false,
  });

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colorD?.[0] || "");
      setSelectedSize(selectedProduct.sizeD?.[0] || "");
    }
    const fetchCloths = async () => {
      try {
        const response = await axios.get(
          "https://adaa-jaipur-backend.onrender.com/api/cloth/getCloth"
        );
        setClothList(response.data);
      } catch (error) {
        console.error("Error fetching cloths:", error);
      }
    };

    fetchCloths();
  }, [selectedProduct]);

  const handleNameChange = (name) => {
    setNameFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    if (nameFilters[name]) {
      setSubCategoryFilters((prev) => {
        const newFilters = { ...prev };
        subCategories[name].forEach((subCat) => {
          delete newFilters[subCat];
        });
        return newFilters;
      });
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    setSubCategoryFilters((prev) => ({
      ...prev,
      [subCategory]: !prev[subCategory],
    }));
  };

  const handleRatingChange = (range) => {
    setRatingFilters(prev => ({ ...prev, [range]: !prev[range] }));
  };


  const handleSizeChange = (size) => {
    setSizeFilters((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  const handleColorChange = (color) => {
    setColorFilters((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  const handlePriceChange = (range) => {
    setPriceFilters((prev) => ({ ...prev, [range]: !prev[range] }));
  };

  const handleAddToCart = async (item) => {
    const userData = sessionStorage.getItem("user");
    let email;

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

    if (!email) {
      setSnackbarMessage("User email not found in session storage.");
      setSnackbarOpen(true)
      navigate("/login");
      return;
    }

    if (!selectedColor || !selectedSize) {
      setSnackbarMessage("Please select a color and size before adding to cart.");
      setSnackbarOpen(true)
      return;
    }

    try {
      const productData = {
        idD: item.idD,
        nameD: item.nameD,
        selectedColorD: selectedColor,
        selectedSizeD: selectedSize,
        colorD: item.colorD,
        sizeD: item.sizeD,
        selectedQuantityD: quantity,
        quantityD: item.quantityD,
        detailD: item.detailD,
        priceD: item.priceD,
        imageD: item.imageD,
        originalPriceD: item.originalPriceD,
        ratingD: item.ratingD,
      };

      const response = await axios.post(
        "https://adaa-jaipur-backend.onrender.com/api/users/addToCart",
        {
          email,
          product: productData,
        }
      );

      if (response.data && response.data.message) {
        setSnackbarMessage(response.data.message);

        if (response.data.message === "Product added to cart successfully") {
          updateCartCount((cartCount) => cartCount + 1);
          setSnackbarMessage("Product added to cart");
          setSnackbarOpen(true)
        } else if (response.data.message === "Item already exists in cart") {
          setSnackbarMessage(
            "This item is already in your cart with the same size and color."
          );
          setSnackbarOpen(true)
        }
      } else {
        setSnackbarMessage("Unexpected response format.");
        setSnackbarOpen(true)
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSnackbarMessage(err.response?.data?.message || "Error adding to cart");
      setSnackbarOpen(true)
    }
    finally {
      setSelectedProduct(null)
      setSelectedThumbnail(0)
    }
  };

  const generateThumbnails = (images) => {
    return images.length ? images : ['/placeholder.svg']; // Fallback to placeholder if no images
  };
  const filteredCloths = clothList.filter((cloth) => {
    const matchesName =
      Object.values(nameFilters).every((val) => !val) ||
      Object.keys(nameFilters).some(
        (name) =>
          nameFilters[name] &&
          cloth.nameD.toLowerCase().includes(name.toLowerCase())
      );

    const matchesSubCategory =
      Object.values(subCategoryFilters).every((val) => !val) ||
      Object.keys(subCategoryFilters).some(
        (subCat) =>
          subCategoryFilters[subCat] &&
          cloth.nameD.toLowerCase().includes(subCat.toLowerCase())
      );

    // const matchesBrand =
    //   Object.values(brandFilters).every((val) => !val) ||
    //   Object.keys(brandFilters).some(
    //     (brand) =>
    //       brandFilters[brand] &&
    //       cloth.brandD.toLowerCase().includes(brand.toLowerCase())
    //   );

    // const matchesCategory =
    //   Object.values(categoryFilters).every((val) => !val) ||
    //   Object.keys(categoryFilters).some(
    //     (category) =>
    //       categoryFilters[category] &&
    //       cloth.categoryD.toLowerCase().includes(category.toLowerCase())
    //   );

    const matchesColor =
      Object.values(colorFilters).every((val) => !val) ||
      (cloth.colorD.length > 0 &&
        cloth.colorD.some((color) => colorFilters[color]));

    const matchesSize =
      Object.values(sizeFilters).every((val) => !val) ||
      (cloth.sizeD.length > 0 && cloth.sizeD.some((size) => sizeFilters[size]));

    const matchesPrice =
      Object.values(priceFilters).every((val) => !val) ||
      (priceFilters["0-1500"] && cloth.priceD >= 0 && cloth.priceD <= 1500) ||
      (priceFilters["1500-3500"] &&
        cloth.priceD > 1500 &&
        cloth.priceD <= 3500) ||
      (priceFilters["3500+"] && cloth.priceD > 3500);

    const matchesRating =
      Object.values(ratingFilters).every(val => !val) ||
      (ratingFilters['4.5+'] && cloth.ratingD >= 4.5) ||
      (ratingFilters['4.0-4.4'] && cloth.ratingD >= 4.0 && cloth.ratingD < 4.5) ||
      (ratingFilters['3.5-3.9'] && cloth.ratingD >= 3.5 && cloth.ratingD < 4.0) ||
      (ratingFilters['3.0-3.4'] && cloth.ratingD >= 3.0 && cloth.ratingD < 3.5) ||
      (ratingFilters['Below 3.0'] && cloth.ratingD < 3.0);

    return (
      matchesName &&
      matchesSubCategory &&
      matchesColor &&
      matchesSize &&
      matchesPrice &&
      matchesRating
    );
  });

  const sortedCloths = filteredCloths.sort((a, b) => {
    return sortOrder === "asc" ? a.priceD - b.priceD : b.priceD - a.priceD;
  });

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

  const splitName = bannerName.split(" ");

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-10 gap-6">
      {/* Filters Section */}
      <div className="w-full lg:w-[20%] bg-white p-4 lg:p-8 rounded-lg shadow-md border-primary border-l-8 mb-6 lg:mb-0">
        <ToggleSection title="Filter Options">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Filters</h2>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Sort by Price:</h3>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full text-sm text-gray-700 focus:ring-2 focus:ring-orange-500"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Select Names:</h3>
            {["Kurta", "Kurtas Sets", "Gown", "Bottom", "Tops"].map((name) => (
              <div key={name}>
                <label className="flex items-center mb-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={nameFilters[name]}
                    onChange={() => handleNameChange(name)}
                    className="mr-2 rounded accent-orange-500"
                  />
                  {name}
                </label>

                {nameFilters[name] && subCategories[name] && (
                  <div className="pl-6 mb-2">
                    {subCategories[name].map((subCat) => (
                      <label
                        key={subCat}
                        className="flex items-center mb-1 text-xs text-gray-500"
                      >
                        <input
                          type="checkbox"
                          checked={subCategoryFilters[subCat]}
                          onChange={() => handleSubCategoryChange(subCat)}
                          className="mr-2 rounded accent-orange-500"
                        />
                        {subCat}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Select Colors:</h3>
            {Object.keys(colorFilters).map((color) => (
              <label
                key={color}
                className="flex items-center mb-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={colorFilters[color]}
                  onChange={() => handleColorChange(color)}
                  className="mr-2 rounded accent-orange-500"
                />
                {color}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Select Sizes:</h3>
            {Object.keys(sizeFilters).map((size) => (
              <label
                key={size}
                className="flex items-center mb-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={sizeFilters[size]}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2 rounded accent-orange-500"
                />
                {size}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Price Range:</h3>
            {Object.keys(priceFilters).map((range) => (
              <label
                key={range}
                className="flex items-center mb-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={priceFilters[range]}
                  onChange={() => handlePriceChange(range)}
                  className="mr-2 rounded accent-orange-500"
                />
                {range}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Select Rating:</h3>
            <div className="space-y-2">
              {Object.entries(ratingFilters).map(([range, checked]) => (
                <label key={range} className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleRatingChange(range)}
                    className="mr-2 rounded accent-orange-500"
                  />
                  <div className="flex items-center">
                    {range}
                    {range !== 'Below 3.0' && (
                      <div className="flex ml-2">
                        {[...Array(Math.floor(parseFloat(range)))].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-orange-500 fill-orange-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          
        </ToggleSection>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-0 m-0">
        {sortedCloths.length === 0 ? (
          <p>No items found matching your criteria.</p>
        ) : (
          <div>
            <div className="container space-y-4 p-0 m-0 ">
              <h1 className="text-4xl font-bold tracking-tight mb-7">
                <span className="text-[#FF6B00]">{splitName[0]} </span>
                <span className="mr-4">{splitName[1]}</span>
                <span className="text-[#FF6B00]">FASH</span>
                IONS
              </h1>
              <div className="relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {sortedCloths.map((product, index) => {
                    const {
                      idD,
                      imageD,
                      priceD,
                      detailD,
                      nameD,
                      quantityD,
                      ratingD,
                      originalPriceD,
                    } = product;
                    return (
                      <div
                        key={idD}
                        className="min-w-[232px] max-w-[220px] bg-white rounded-lg border-primary border-b-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-0 relative border-orange-300 border-b-2">
                          <div className="flex justify-center items-center h-[200px]">
                            <img
                              src={imageD}
                              alt={nameD}
                              className="object-fit rounded-t-lg h-full"
                            />
                          </div>

                          <span className="absolute top-2 right-2 bg-black/75 text-white text-xs font-bold px-2 py-1 rounded">
                            {Math.round(
                              ((parseFloat(
                                originalPriceD

                              ) -
                                parseFloat(
                                  priceD

                                )) /
                                parseFloat(
                                  originalPriceD

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
                              {originalPriceD}
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
                    );
                  })}
                  <div className="min-w-[220px] flex items-center justify-center">
                    <a
                      href="/"
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
                    </a>
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
                            src={generateThumbnails(selectedProduct.imageD)[selectedThumbnail] || "/placeholder.jpg"}
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
            <style>{`
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
        )}
      </div>
    </div>

  );
};

export default ClothFilter;
