import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/signIN");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 h-screen">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-96 transform transition-transform hover:scale-105 transition duration-700 ease-in-out">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 px-4 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 transform transition-transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
