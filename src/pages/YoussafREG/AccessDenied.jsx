import "./accessDenied.scss";
import React from "react";

function AccessDenied() {
  const handleGoBack = () => {
    // Implement your navigation logic here, e.g., using react-router or window.history
    window.history.back();
  };
  return (
    <div id="app">
      <div>403</div>
      <div className="txt">
        Forbidden<span className="blink">_</span>
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}
export default AccessDenied;
