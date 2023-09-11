import React from "react";
import logo from "../../assets/progpan.png";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <div className="diag__footer section__padding">
    <div className="diag__footer-heading">
      <h1 className="gradient__text">
        Do you want to step in to the future before others
      </h1>
    </div>

    <div className="diag__footer-btn">
      <Link to="/payment" style={{ textDecoration: "none" }}>
        <p>Request Early Access</p>
      </Link>
    </div>

    <div className="diag__footer-links">
      <div className="diag__footer-links_logo">
        <img src={logo} alt="diag_logo" />
        <p>
          Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved
        </p>
      </div>
      <div className="diag__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="diag__footer-links_div">
        <h4>Company</h4>
        <a href="/terms&conditions" style={{ textDecoration: "none" }}>
          {" "}
          <p>Terms & Conditions </p>
        </a>
        <a href="/privacyPolicy" style={{ textDecoration: "none" }}>
          {" "}
          <p>Privacy Policy</p>
        </a>
        <p>Contact</p>
      </div>
      <div className="diag__footer-links_div">
        <h4>Get in touch</h4>
        <p>Crechterwoord K12 182 DK Alknjkcb</p>
        <p>085-132567</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className="diag__footer-copyright">
      <p>@2023 ProgPAL. All rights reserved.</p>
    </div>
  </div>
);
export default Footer;
