
import React, { useState, useRef, useEffect } from "react";
import { Home } from "lucide-react";
import { NavbarMenu } from "../mockdata/data";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { GiClothes } from "react-icons/gi";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Please enter a search query!");
      return;
    }
    navigate("/searchResult", { state: { searchText: searchTerm } });
    setSearchTerm("");
    setIsSearchVisible(!isSearchVisible);
  };

  const handleAuth = () => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      sessionStorage.removeItem("user");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const userSessionExists = !!sessionStorage.getItem("user");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo section */}
            <div className="flex items-center gap-1 sm:gap-2">
              <GiClothes className="text-xl sm:text-2xl" />
              <p className="text-secondary text-lg sm:text-2xl font-bold">ADAA</p>
              <p className="text-lg sm:text-2xl font-bold">Jaipur</p>
            </div>

            {/* Desktop Menu */}
            {/* <div className="hidden lg:block flex-1 px-8">
              <ul className="flex justify-center items-center gap-4 text-gray-700">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>

                    <NavLink
                      className={({ isActive }) =>
                        `inline-block py-1 px-2 font-semibold transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'
                        }`
                      }
                      to={item.link}
                    >
                      <item.icon size={20}  className="flex-shrink-0"/>
                      <span className="flex-shrink-0">{item.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="hidden lg:block flex-1 px-8">
  <ul className="flex justify-center items-center gap-4 text-gray-700">
    {NavbarMenu.map((item) => (
      <li key={item.id}>
        <NavLink
          className={({ isActive }) =>
            `inline-flex items-center justify-center gap-2 py-2 px-3 font-semibold transition-colors ${
              isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'
            }`
          }
          to={item.link}
        >
          <item.icon 
            size={18} 
            className="flex-shrink-0"
          />
          <span className="flex-shrink-0">{item.title}</span>
        </NavLink>
      </li>
    ))}
  </ul>
</div>

            {/* Icons & Search section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <div className="relative">
                {!isSearchVisible ? (
                  <button
                    className="p-2 hover:bg-primary hover:text-white rounded-full transition-colors"
                    onClick={handleSearchToggle}
                    aria-label="Search"
                  >
                    <CiSearch className="text-xl sm:text-2xl" />
                  </button>
                ) : (
                  <form
                    className="flex items-center gap-2 sm:gap-4"
                    onSubmit={handleSearchSubmit}
                    ref={formRef}
                  >
                    <div className="flex items-center p-2">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="border rounded px-3 py-1 w-48 sm:w-64"
                      />
                      <button
                        type="submit"
                        className="ml-2 px-4 py-1 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Cart */}
              <button
                className="relative p-2 hover:bg-primary hover:text-white rounded-full transition-colors"
                onClick={() => navigate("/cart")}
                aria-label="Shopping Cart"
              >
                <CiShoppingCart className="text-xl sm:text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Login/Logout Button - Desktop */}
              <button
                onClick={handleAuth}
                className="sm:block hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-4 sm:px-6 py-1.5 sm:py-2 transition-colors"
              >
                {userSessionExists ? "Logout" : "Login"}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                <IoMdMenu className="text-2xl sm:text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ResponsiveMenu open={open} setOpen={setOpen}/>
    </>
  );
};

export default Navbar;