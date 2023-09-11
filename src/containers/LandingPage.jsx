import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Possibility from "./possibility/Possibility";
import CTA from "../components/cta/CTA";
import Brand from "../components/brand/Brand";
import ProtectedRoute from "../scenes/ProtectedRoute";

const LandingPage = () => (
  <div>
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Possibility />
    <CTA element={<ProtectedRoute />} />
    <Brand />
    <Footer />
  </div>
);

export default LandingPage;
