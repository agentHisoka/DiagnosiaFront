import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { isAuthenticated } from "../../scenes/auth"; // Import the isAuthenticated function

function Login() {
  const auth = isAuthenticated();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signIN";
  const [loginMessage, setLoginMessage] = useState(""); // New state for login message
  const decodedToken = isAuthenticated();
  const userRole = decodedToken.role;

  useEffect(() => {
    // Check if user is authenticated, and redirect to dashboard if true
    if (auth) {
      if (userRole === "doctor") {
        navigate("/dashboard/doc");
      } else {
        navigate("/dashboard/patient");
      }
    }
  }, [auth, navigate]);

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        console.log("login: " + res.data);
        if (res.data.Status === "Success") {
          navigate(from, { replace: true });
        } else {
          setLoginMessage(res.data); // Display the error message
          setPassword("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 h-screen">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-96 transform transition-transform hover:scale-105 transition duration-700 ease-in-out">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Welcome Back
        </h2>
        {loginMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
            {loginMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 px-4 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 transform transition-transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signUP" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-xs text-center text-gray-500">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
