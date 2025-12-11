import React from "react";
import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      {" "}
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>

    // Main wrapper div with a class for styling the entire loading page
    // <div className="loading-page">
    //   {/* Container for the loading content (GIF + text) */}
    //   <div className="loading-content">
    //     {/* Loading GIF to indicate loading progress */}
    //     <img src="/loading.gif" alt="Loading..." className="loading-gif" />
    //     {/* Optional text shown under the loading animation */}
    //     <p className="loading-text">Loading...</p>
    //   </div>
    // </div>
  );
};

export default LoadingPage;
