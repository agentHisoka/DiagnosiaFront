import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/appointments")
      .then((response) => {
        setAppointments(response.data);
        setIsLoading(false); // Data has been fetched
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setIsLoading(false); // Data fetch failed
      });
  }, []);

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation();
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">My Appointments</h1>
      {isLoading ? (
        // Display a loading spinner or message while fetching data
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment, index) => (
            <div
              key={appointment._id} // Assuming '_id' is the unique identifier of the appointment
              className="bg-white shadow-md rounded-lg p-4 transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleCardClick(appointment)}
            >
              <p className="text-gray-500">Appointment {index + 1}</p>
              {/* Render appointment details here */}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={handleCloseModal} // Close modal when clicking outside of it
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl text-black w-4/5 md:w-1/3 lg:w-1/3 max-h-96 overflow-y-auto"
            onClick={handleModalClick} // Prevent clicks inside the modal from closing it
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <img
              src={selectedAppointment.image}
              alt={`${selectedAppointment.doctor}`}
              className="w-80 h-80 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              {selectedAppointment.doctor}
            </h2>
            <p className="text-gray-600">
              {selectedAppointment.specialization}
            </p>
            <p className="text-gray-600">
              Date: {selectedAppointment.date}, Time: {selectedAppointment.time}
            </p>
            <div className="my-4">
              <h2 className="text-xl font-semibold mb-2">Doctor's Address</h2>
              <p>{selectedAppointment.doctorAddress}</p>
            </div>
            {isModalOpen && (
              <LoadScript googleMapsApiKey="AIzaSyCeXCqFCSC2SBT_Sf2s3NfFnTLfLuyTCP8">
                <GoogleMap
                  id="map"
                  mapContainerStyle={{ width: "100%", height: "300px" }}
                  center={{
                    lat: 35.20982360839844,
                    lng: -0.6331860423088074,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: 35.20982360839844,
                      lng: -0.6331860423088074,
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            )}
            <div className="flex justify-between mt-3">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Edit
              </button>
              <button
                className={`${
                  selectedAppointment.paid
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white py-2 px-4 rounded transition duration-300`}
              >
                {selectedAppointment.paid ? "Paid" : "Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
