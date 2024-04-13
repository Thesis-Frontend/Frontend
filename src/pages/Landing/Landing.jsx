import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bg from "../../assets/First_screen_picture.jpg";
import Login from "../Login/Login";

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar setLoginModal={handleLoginClick} setIsUserLogin={setIsUserLogin} />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})`, height: "100vh" }}
      >
        <p
          className="absolute p-4 text-3xl font-bold tracking-wide"
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
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
      <Login isOpen={showModal} onClose={handleCloseModal} isUserLogin={isUserLogin} />
    </div>
  );
}
