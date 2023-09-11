import React from "react";
import { Route } from "react-router-dom";
import Home from "./containers/Home";
import Register from "./pages/registerHekto/Register";
import Login from "./pages/registerHekto/Login";

function Routes() {
  return (
    <Routes>
      <Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signUP" element={<Register />} />
        <Route exact path="/signIN" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default Routes;

// <Route exact path="/about" element={<About />} />
//         <Route exact path="/blogs" element={<Blog />} />
//         <Route exact path="/docs" element={<Possibility />} />
//         <Route exact path="/srvcs" element={<WhatDiag />} />
