import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => (
  <div>
    <div className="gradient__bg">
      <Header />
      
    </div>
  </div>
);

export default Home;
