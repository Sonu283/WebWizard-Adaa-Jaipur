// import React from "react";

// export default function FashionCategories() {
//   return (
//     <div className="   p-28 mb-7">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex flex-wrap gap-8">
//           {/* Left Section */}
//           <div className="flex-1 space-y-8 min-w-[300px]">
//             <h1 className="text-5xl font-bold tracking-tight">
//               Fashion
//               <br />
//               <span className="text-[#FF6B00]">Categories</span>
//             </h1>
//             <ul className="space-y-4">
//               <li className="flex items-center gap-2 text-lg text-gray-700">
//                 <span className="text-[#FF6B00]">→</span>
//                 Sustainable Fashion for Everyone
//               </li>
//               <li className="flex items-center gap-2 text-lg text-gray-700">
//                 <span className="text-[#FF6B00]">→</span>
//                 Stylish Choices for All Occasions
//               </li>
//               <li className="flex items-center gap-2 text-lg text-gray-700">
//                 <span className="text-[#FF6B00]">→</span>
//                 Quality Fabric, Affordable Price
//               </li>
//             </ul>
//             <button className="primary-btn flex items-center gap-2">
//               {" "}
//               Explore More
//             </button>
//           </div>

//           {/* Right Section - Side by Side Cards */}
//           <div className="flex-[2] grid grid-cols-2 gap-6 min-w-[600px] bg-orange-500 bg-opacity-30 p-4 rounded-bl-[40%] rounded-tr-[40%]">
//             {/* Fashion for Everyone Card */}
//             <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-6 border-r-8 border-primary ">
//               <svg
//                 className="mb-4 h-8 w-8 text-[#FF6B00]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <circle cx="12" cy="12" r="3" />
//                 <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
//               </svg>
//               <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//                 Fashion for Everyone
//               </h2>
//               <p className="text-gray-600">
//                 Browse our versatile clothing options for every occasion and
//                 personal style at Clothify.
//               </p>
//             </div>

//             {/* Premium Materials Card */}
//             <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-6 border  border-r-8 border-primary">
//               <svg
//                 className="mb-4 h-8 w-8 text-[#FF6B00]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//               </svg>
//               <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//                 Premium Materials
//               </h2>
//               <p className="text-gray-600">
//                 Discover our unique fabric collections that elevate your style
//                 today. Shop now and indulge!
//               </p>
//             </div>

//             {/* Stylish Apparel Card */}
//             <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-6 border  border-r-8 border-primary">
//               <svg
//                 className="mb-4 h-8 w-8 text-[#FF6B00]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="9" y1="18" x2="15" y2="18" />
//                 <line x1="10" y1="22" x2="14" y2="22" />
//                 <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
//               </svg>
//               <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//                 Stylish Apparel
//               </h2>
//               <p className="text-gray-600">
//                 Elevate your wardrobe with our curated collection of trendy and
//                 timeless pieces. From casual chic to elegant formal wear, find
//                 your perfect look for any occasion.
//               </p>
//             </div>

//             {/* Exclusive Designs Card */}
//             <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-6 border  border-r-8 border-primary">
//               <svg
//                 className="mb-4 h-8 w-8 text-[#FF6B00]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
//                 <path d="M13 13l6 6" />
//               </svg>
//               <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//                 Exclusive Designs
//               </h2>
//               <p className="text-gray-600">
//                 Stand out with our limited-edition pieces crafted by renowned
//                 designers. These unique, high-quality garments offer
//                 unparalleled style and exclusivity for the fashion-forward
//                 individual.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function FashionCategories() {
  return (
    <div className="p-4 sm:p-8 lg:p-28 mb-7">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full lg:flex-1 space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Fashion
              <br />
              <span className="text-[#FF6B00]">Categories</span>
            </h1>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-base lg:text-lg text-gray-700">
                <span className="text-[#FF6B00]">→</span>
                Sustainable Fashion for Everyone
              </li>
              <li className="flex items-center gap-2 text-base lg:text-lg text-gray-700">
                <span className="text-[#FF6B00]">→</span>
                Stylish Choices for All Occasions
              </li>
              <li className="flex items-center gap-2 text-base lg:text-lg text-gray-700">
                <span className="text-[#FF6B00]">→</span>
                Quality Fabric, Affordable Price
              </li>
            </ul>
            <button className="primary-btn flex items-center gap-2">
              Explore More
            </button>
          </div>

          {/* Right Section - Side by Side Cards */}
          <div className="w-full lg:flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 bg-orange-500 bg-opacity-30 p-4 rounded-bl-[20%] sm:rounded-bl-[40%] rounded-tr-[20%] sm:rounded-tr-[40%]">
            {/* Fashion for Everyone Card */}
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-4 lg:p-6 border-r-8 border-primary">
              <svg
                className="mb-4 h-6 w-6 lg:h-8 lg:w-8 text-[#FF6B00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <h2 className="mb-4 text-xl lg:text-2xl font-semibold text-gray-900">
                Fashion for Everyone
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Browse our versatile clothing options for every occasion and
                personal style at Clothify.
              </p>
            </div>

            {/* Premium Materials Card */}
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-4 lg:p-6 border border-r-8 border-primary">
              <svg
                className="mb-4 h-6 w-6 lg:h-8 lg:w-8 text-[#FF6B00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <h2 className="mb-4 text-xl lg:text-2xl font-semibold text-gray-900">
                Premium Materials
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Discover our unique fabric collections that elevate your style
                today. Shop now and indulge!
              </p>
            </div>

            {/* Stylish Apparel Card */}
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-4 lg:p-6 border border-r-8 border-primary">
              <svg
                className="mb-4 h-6 w-6 lg:h-8 lg:w-8 text-[#FF6B00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="9" y1="18" x2="15" y2="18" />
                <line x1="10" y1="22" x2="14" y2="22" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
              </svg>
              <h2 className="mb-4 text-xl lg:text-2xl font-semibold text-gray-900">
                Stylish Apparel
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Elevate your wardrobe with our curated collection of trendy and
                timeless pieces. From casual chic to elegant formal wear, find
                your perfect look for any occasion.
              </p>
            </div>

            {/* Exclusive Designs Card */}
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(255,107,0,0.2)] p-4 lg:p-6 border border-r-8 border-primary">
              <svg
                className="mb-4 h-6 w-6 lg:h-8 lg:w-8 text-[#FF6B00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="M13 13l6 6" />
              </svg>
              <h2 className="mb-4 text-xl lg:text-2xl font-semibold text-gray-900">
                Exclusive Designs
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Stand out with our limited-edition pieces crafted by renowned
                designers. These unique, high-quality garments offer
                unparalleled style and exclusivity for the fashion-forward
                individual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}