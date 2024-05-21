import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Login from "../Login/Login";
import "./Landing.css";

import leftImage from "../../assets/left.jpg";
import rightImage1 from "../../assets/Shape1.jpg";
import rightImage2 from "../../assets/Shape2.jpg";

export default function Landing() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex items-center justify-centers pb-20">
        <img
          src={leftImage}
          alt="Left Image"
          className="absolute left-0 h-auto w-2/5"
          style={{ top: "11%" }}
        />
        <img
          src={rightImage1}
          alt="Right Image 1"
          className="absolute bottom-0 right right-image"
        />
        <img
          src={rightImage2}
          alt="Right Image 2"
          className="absolute"
          style={{ right: "0", width: "17%", top: "20%" }}
        />
        <p
          className="absolute p-4 text-3xl font-bold tracking-wide text-white"
          style={{
            right: "15%",
            lineHeight: "2",
            top: "40%",
            background: "-webkit-linear-gradient(180deg, #6CB2EB, #000000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Empowering Businesses, <br />
          Elevating Success.
        </p>
      </div>
      {/* <div className="absolute bottom-0 w-full">
        <Footer />
      </div> */}
    </div>
  );
}
