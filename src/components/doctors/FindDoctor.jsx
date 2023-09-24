import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./FindDoctor.css";
import specialitiesData from "../../data/specialities.json";
import addressesData from "../../data/villes.json"; // Import the addresses data
import { AutoComplete } from "rsuite";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("specialization"); // Default to specialization
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (value) => {
    setFilterValue(value); // Update filterValue when user types
    let filteredSuggestions;
    if (filterType === "specialization") {
      filteredSuggestions = specialitiesData.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
    } else if (filterType === "address") {
      filteredSuggestions = addressesData.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
    }
    setSuggestions(filteredSuggestions);
    setError("");
  };

  const handleSearch = async () => {
    setDoctors([]);
    setError(""); // Clear any previous error messages
    const trimmedFilterValue = filterValue.trim();
    if (!trimmedFilterValue) {
      setError(
        `Please enter a ${
          filterType === "specialization" ? "specialization" : "valid address"
        } to check.`
      );
      setDoctors([]); // Clear the doctor list
      return;
    }

    try {
      setError(""); // Clear any previous error messages

      const response = await axios.get("http://localhost:3001/doctor", {
        params: {
          filterType, // Use the selected filter type
          filterValue: trimmedFilterValue,
        },
      });

      if (response.data.length === 0) {
        setError(
          `No doctors found for this ${
            filterType === "specialization" ? "specialization" : "address"
          }.`
        );
        setDoctors([]); // Clear the doctor list
      } else {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("An error occurred while fetching doctors.");
    }
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); // Clear the input field when switching filter types
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">
        Find a Doctor by{" "}
        {filterType === "specialization" ? "Specialty" : "Address"}
      </h1>
      <div className="flex gap-4 mb-6">
        <AutoComplete
          placeholder={`Enter ${
            filterType === "specialization" ? "Specialty" : "Address"
          } (e.g. Cardiologist)`}
          type="text"
          className={`border rounded py-2 px-3 w-full text-black ${
            error ? "border-red-500" : ""
          }`}
          onChange={handleInputChange}
          value={filterValue} // Update from specialization to filterValue
          data={
            filterType === "specialization" ? specialitiesData : addressesData
          }
          // Use different data sources based on the filter type
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="border rounded py-2 px-3 text-black"
        >
          <option value="specialization">Specialization</option>
          <option value="address">Address</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 && !error ? (
          <p>No doctors found.</p>
        ) : (
          <TransitionGroup component={null}>
            {doctors.map((doctor) => (
              <CSSTransition key={doctor.id} timeout={300} classNames="fade">
                <div className="bg-white shadow-md rounded-lg p-4 cardx">
                  <img
                    src={`http://localhost:3001/${doctor.avatar}`}
                    alt={`${doctor.name}'s Photo`}
                    className="w-full h-32 object-cover rounded-md mb-2 text-black"
                  />
                  <h2 className="text-lg font-semibold text-blue-500 mb-2">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.address}</p>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
