import React from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="diag__header section__padding" id="home">
    <div className="diag__header-content">
      <h1 className="gradient__text">
        Get personalized health recommendations with just a few clicks
      </h1>
      <p>
        we believe that everyone deserves access to quality healthcare. With our
        user-friendly interface and cutting-edge technology, we strive to make
        healthcare accessible to all, no matter where they are in the world.
        Join us on our mission to revolutionize the healthcare industry and
        improve the lives of millions.
      </p>

      <div className="diag__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <Link to="/dashboard/main">
          <button type="button">Get started</button>
        </Link>
      </div>

      <div className="diag__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="diag__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
