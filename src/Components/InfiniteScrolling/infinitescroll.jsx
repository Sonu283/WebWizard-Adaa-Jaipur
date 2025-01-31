"use client";

import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const brands = [
  "A-LINE KURTA",
  "EMBROIDERY KURTA",
  "STRAIGHT KURTA",
  "FESTIVE SUIT SETS",
  "KURTA PENTS",
  "KURTA PENTS AND DUPATTA",
  "ANKLE GOWN",
  "FESTIVE MAL GOWN",
  "GOWN WITH DUPATTA",
  "PANTS",
  "PLAZZO",
  "SKIRT",
  "CO-ORDS",
  "SHIRT",
  "SHORT TOP",
  "TUNICS",
  "KURTA SETS",
  "TOPS",
  "KURTAS",
];


const Scroller = ({ direction }) => (
  <div className="scroller-container">
    <div className={`scroller-content animate-scroll-${direction}`}>
      {brands.concat(brands).map((item, index) => (
        <p
          key={index}
          className="px-4 py-2 text-lg font-bold text-white uppercase bg-gray-800 rounded-tl-[18%] rounded-br-[18%] shadow-md transition-transform hover:scale-110"
        >
          {item}
        </p>
      ))}
    </div>
  </div>
);

const InfiniteScrolling = () => {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .scroller-container {
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .scroller-content {
          display: flex;
          gap: 1rem;
          white-space: nowrap;
          min-width: 100%;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center mt-9">
        <div className="w-full overflow-hidden">
          <div className="mb-5">
            <Scroller direction="left"  onClick={()=>navigate("/collections")} />
          </div>
          <div>
            <Scroller direction="right" onClick={()=>navigate("/collections")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfiniteScrolling;
