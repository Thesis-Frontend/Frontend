import React from "react";
import "./Loading.css"; // Import CSS for loading animation

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
