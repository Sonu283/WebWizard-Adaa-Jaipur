// import { motion, AnimatePresence } from "framer-motion";
// import React from "react";
// import {Link} from "react-router-dom"

// export const ResponsiveMenu = ({ open }) => {
//   return (
//     <AnimatePresence mode="wait">
//       {open && (
//         <motion.div
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -100 }}
//           transition={{ duration: 0.3 }}
//           className="absolute top-20 left-0 w-full h-screen z-20"
//         >
//           <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl">
//             <ul className="flex flex-col justify-center items-center gap-10">
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/collections">Collection</Link></li>
//               <li><Link to="/trending">Trending</Link></li>
//               <li><Link to="/aboutUs">About</Link></li>
//               <li><Link to="/contactUs">Contact</Link></li>
              
//             </ul>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export const ResponsiveMenu = ({ open ,setOpen}) => {
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
              <li><Link to="/collections" onClick={handleLinkClick}>Collection</Link></li>
              <li><Link to="/trending" onClick={handleLinkClick}>Trending</Link></li>
              <li><Link to="/aboutUs" onClick={handleLinkClick}>About</Link></li>
              <li><Link to="/contactUs" onClick={handleLinkClick}>Contact</Link></li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};