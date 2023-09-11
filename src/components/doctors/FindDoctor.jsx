import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./FindDoctor.css";
import specialitiesData from "../../data/specialities.json";
import { AutoComplete } from "rsuite";

const FindDoctor = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setDoctors([]);
    setError(""); // Clear any previous error messages
    const trimmedSpecialization = specialization.trim();
    if (!trimmedSpecialization) {
      setError("Please type in a specialization to check.");
      setDoctors([]); // Clear the doctor list
      return;
    }

    if (!specialitiesData.includes(trimmedSpecialization)) {
      setError("Please enter a valid specialization.");
      setDoctors([]); // Clear the doctor list
      return;
    }
    try {
      setError(""); // Clear any previous error messages

      const response = await axios.get(
        `http://localhost:3001/doctors/specialization/${specialization}`
      );
      if (
        response.data.length === 0 &&
        specialitiesData.includes(trimmedSpecialization)
      ) {
        setError("No doctors found for this specialization.");
        setDoctors([]); // Clear the doctor list
      } else {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("An error occurred while fetching doctors.");
    }
  };

  const handleInputChange = (value) => {
    setSpecialization(value);
    const filteredSuggestions = specialitiesData.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setError("");
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">
        Find a Doctor by Specialization
      </h1>
      <div className="flex gap-4 mb-6">
        <AutoComplete
          placeholder="Enter Specialization (e.g. Cardiologist)"
          type="text"
          className={`border rounded py-2 px-3 w-full text-black ${
            error ? "border-red-500" : ""
          }`}
          onChange={handleInputChange}
          value={specialization}
          data={specialitiesData}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 && !error ? (
          <p></p>
        ) : (
          <TransitionGroup component={null}>
            {doctors.map((doctor) => (
              <CSSTransition key={doctor.id} timeout={300} classNames="fade">
                <div className="bg-white shadow-md rounded-lg p-4 cardx">
                  <img
                    src={doctor.img}
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
