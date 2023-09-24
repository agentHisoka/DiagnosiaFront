import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete } from "rsuite";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FontAwesome eye icons
import addr from "../../data/address.json";
import specialities from "../../data/specialities.json";
import "./signUP.css";
import zxcvbn from "zxcvbn"; // Import the password strength library

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [gender, setGender] = useState(""); // New state variable for gender
  const [genderError, setGenderError] = useState(""); // Define genderError as a constant

  const [isDoctor, setIsDoctor] = useState(false);
  /// validation consts
  const [passwordStrength, setPasswordStrength] = useState(0); // Store password strength score
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [specialtyError, setSpecialtyError] = useState(""); // Define specialty error state

  const navigate = useNavigate();

  const handleSpecialtyChange = (value) => {
    setSelectedSpecialty(value);
    setSpecialtyInput(value);
    // Clear the specialty error message
    setSpecialtyError("");
    // Validate if the entered specialty exists in the specialties JSON
    if (!specialities.includes(value)) {
      setSpecialtyError("Specialty not found in the list.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (passwordStrength < 3) {
      setPasswordError("Password is too weak");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!address || !addr.some((location) => location.ar_name === address)) {
      setAddressError("Address not found");
      isValid = false;
    } else {
      setAddressError("");
    }
    if (!gender) {
      setGenderError("Gender is required"); // Add this line to set the error message
      isValid = false;
    } else {
      setGenderError(""); // Clear the gender error if it's valid
    }

    // Validate Specialty (if applicable)
    if (isDoctor && !selectedSpecialty) {
      setSpecialtyError("Specialty is required for doctors");
      isValid = false;
    } else if (specialtyError) {
      // An invalid specialty was entered
      isValid = false;
    } else {
      setSpecialtyError(""); // Clear the specialty error if it was previously set
    }

    if (isValid) {
      axios
        .post("http://localhost:3001/register", {
          name,
          email,
          password,
          address,
          specialty: isDoctor ? selectedSpecialty : "",
          gender,
        })
        .then((res) => {
          navigate("/signIN");
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Clear the password error message
    setPasswordError("");
    const result = zxcvbn(newPassword);
    setPasswordStrength(result.score);
    // Define a regular expression pattern for password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false); // State variable to show/hide password

  // Function to handle the "Show Password" checkbox
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 h-screen">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-96 transform transition-transform hover:scale-105 transition duration-700 ease-in-out">
        <div className="mb-4">
          <label htmlFor="isDoctor" className="block font-medium text-black">
            Are you a doctor?
          </label>
          <div className="ml-2 relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={isDoctor}
              onChange={() => setIsDoctor(!isDoctor)}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-black ">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>
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
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-black">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                placeholder="Enter Password"
                name="password"
                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                onChange={handlePasswordChange}
              />
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleShowPasswordChange}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icons */}
              </span>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block font-medium text-black">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {genderError && <p className="text-red-500">{genderError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium text-black">
              Address
            </label>
            <AutoComplete
              data={addr.map((location) => location.ar_name)}
              onChange={(value) => setAddress(value)}
              placeholder="Enter Address"
              value={address}
            />
            {addressError && <p className="text-red-500">{addressError}</p>}
          </div>
          {isDoctor && (
            <div className="mb-4">
              <label
                htmlFor="specialty"
                className="block font-medium text-black"
              >
                Medical Specialty
              </label>
              <AutoComplete
                data={specialities}
                onChange={(value) => handleSpecialtyChange(value)}
                placeholder="Select Medical Specialty"
                value={specialtyInput}
              />
              {specialtyError && (
                <p className="text-red-500">{specialtyError}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 px-4 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 transform transition-transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signIN" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
