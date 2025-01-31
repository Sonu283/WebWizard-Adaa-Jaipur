// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./Loading.css";

// export default function Loading() {
//     const [isLoading, setIsLoading] = useState(false);
//     const location = useLocation();

//     useEffect(() => {
//         // Show the loading spinner on route change
//         setIsLoading(true);

//         // Simulate loading delay (adjust as needed)
//         const timer = setTimeout(() => setIsLoading(false), 850);

//         return () => clearTimeout(timer); // Cleanup the timer
//     }, [location]);

//     return (
//         isLoading && (
//             <div className="loading-container">
//                 <div className="loader">ADAA JAIPUR...</div>
//             </div>
//         )
//     );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the loading spinner on route change
    setIsLoading(true);
    setIsExiting(false);

    const minLoadingTime = 500; // Minimum time to show loader
    const startTime = Date.now();

    const handleLoadComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Start exit animation
      setTimeout(() => {
        setIsExiting(true);
        // Hide loader after exit animation
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Match this with CSS transition time
      }, remainingTime);
    };

    // Start handling the loading state
    handleLoadComplete();

    return () => {
      setIsLoading(false);
      setIsExiting(false);
    };
  }, [location]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <div className="inline-block relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="mt-4 text-lg font-semibold text-primary animate-pulse">
            ADAA JAIPUR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;