import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrolling from "../InfiniteScrolling/infinitescroll";
import FashionCategories from "../FashionCategory/Fashioncategory";
import ProductScroll from "../ProductCards/Product";
import Winter from "../../assets/winter_offer.jpg";
import Summer from "../../assets/summer.webp";
import Festive from "../../assets/festive.webp";
// import Discover from "../../assets/Dicover.jpg";
import DiscoverSectiob from "../DiscoverSection/discoverSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const products = [
  {
    id: 1,
    image: Winter,
    title: "Winter Essentials",
    price: "Rs. 2999/-",
  },
  {
    id: 2,
    image: Summer,
    title: "Summer Collection",
    price: "Rs. 3400/-",
  },
  {
    id: 3,
    image: Festive,
    title: "Festive Specials",
    price: "Rs. 7450/-",
  },
];

export default function Home({ updateCartCount, cartCount }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const sliderTransition = {
    x: { type: "spring", stiffness: 200, damping: 30 },
    opacity: { duration: 0.5 },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-white">
        <div className="container mx-auto min-h-[76vh] relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Brand Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col justify-center py-20 mt-12 md:py-0 font-playfair relative z-10"
            >
              <div className="space-y-8 max-w-xl">
                <motion.span
                  variants={fadeInUp}
                  className="inline-block px-4 py-1 rounded-full bg-orange-200 text-orange-600 text-sm font-medium"
                >
                  New Collection 2024
                </motion.span>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-bold leading-tight text-gray-800"
                >
                  Elevate Your{" "}
                  <span className="text-orange-500 relative">
                    Everyday Style
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 358 8"
                      fill="none"
                    >
                      <path
                        d="M2 5.5C59.3333 2.5 174.5 -0.5 356 6"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Discover our curated collection of premium fashion pieces
                  designed to enhance your personal style. Shop the latest
                  trends and timeless classics.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <button className="group flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-medium  hover:!scale-110 duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Shop Now
                  </button>
                  <button className="group flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-medium border-2 border-orange-500   hover:!scale-110 duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Watch Video
                  </button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                  variants={fadeInUp}
                  className="flex gap-8 pt-8 border-t"
                >
                  <div className="bg-white p-4 rounded-[15%] border-t-8  border-primary  hover:!scale-110 duration-300">
                    <p className="text-3xl font-bold text-gray-900">50k+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-white p-4 rounded-[15%] border-t-8 px-10 border-primary  hover:!scale-110 duration-300">
                    <p className="text-3xl font-bold text-gray-900">4.9</p>
                    <div className="flex items-center gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-full aspect-[4/3] bg-[#F8F8F8] rounded-3xl overflow-hidden border-r-8  border-primary ">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={sliderTransition}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={products[currentSlide].image || "/placeholder.svg"}
                      alt={products[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Product Card */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute top-0 right-4 bg-white p-4 rounded-b-xl shadow-lg z-20"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {products[currentSlide].title}
                      </p>
                      <p className="text-orange-500 font-bold">
                        {products[currentSlide].price}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-6 left-4 bg-white p-8 rounded-xl shadow-lg z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Free Shipping
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        Worldwide
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <InfiniteScrolling />
      <ProductScroll updateCartCount={updateCartCount} cartCount={cartCount} />
      <FashionCategories />
      <DiscoverSectiob />
    </>
  );
}
