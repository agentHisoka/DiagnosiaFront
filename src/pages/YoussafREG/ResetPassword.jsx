import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState();
  const [resetStatus, setResetStatus] = useState(null);
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === "Success") {
          setResetStatus("Password reset successfully.");
          // Redirect after a delay or provide a link to redirect
          setTimeout(() => navigate("/signIN"), 2000);
        } else {
          setResetStatus("Password reset failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setResetStatus("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 h-screen">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-96 transform transition-transform hover:scale-105 transition duration-700 ease-in-out">
        <h4 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Reset Password
        </h4>
        {resetStatus && (
          <div className="mb-4 text-center text-red-500">{resetStatus}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-black"
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 px-4 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 transform transition-transform hover:scale-105"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
