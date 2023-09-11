import React from "react";
import "./cta.css";
import { Link } from "react-router-dom";
const CTA = () => (
  <div className="diag__cta">
    <div className="diag__cta-content">
      <p>Request Early Access to Get most benefits</p>
      <h3>Take care of your health, know what's going on in your body.</h3>
    </div>
    <div className="diag__cta-btn">
      <Link to="/signUP">
        <button type="button">Examine it !</button>
      </Link>
    </div>
  </div>
);
export default CTA;
