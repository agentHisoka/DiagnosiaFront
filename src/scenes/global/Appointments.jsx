import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. John Doe",
      specialization: "Cardiologist",
      date: "2023-09-15",
      time: "10:00 AM",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
      doctorAddress: "123 Main St, City, Country",
    },
    {
      id: 2,
      doctor: "Dr. Jane Smith",
      specialization: "Dermatologist",
      date: "2023-09-20",
      time: "2:30 PM",
      image:
        "https://www.moffitt.org/globalassets/images/providers_bio/GreeneJohn_902.jpg",
      doctorAddress: "456 Elm St, Town, Country",
    },
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white shadow-md rounded-lg p-4 transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleCardClick(appointment)}
          >
            <img
              src={appointment.image}
              alt={`${appointment.doctor}`}
              className="w-64 h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              {appointment.doctor}
            </h2>
            <p className="text-gray-600">{appointment.specialization}</p>
            <p className="text-gray-600">
              Date: {appointment.date}, Time: {appointment.time}
            </p>
          </div>
        ))}
      </div>

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
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
