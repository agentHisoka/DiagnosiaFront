import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
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
        <h4 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Reset Password
        </h4>
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
              // onChange={(e) => setPassword(e.target.value)}
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
