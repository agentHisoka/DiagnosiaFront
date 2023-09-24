import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import specialitiesData from "../../data/specialities.json";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import { isAuthenticated } from "../auth";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [appointments, setAppointments] = useState([]);
  const { auth } = useContext(AuthContext);
  const decodedToken = isAuthenticated();
  const userId = decodedToken.userId;
  const patientName = decodedToken.name;

  useEffect(() => {
    axios
      .get("http://localhost:3001/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  const handlePayment = (e) => {
    const appointment = {
      doctor: selectedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      specialty: selectedDoctor.specialty,
      doctorAddress: selectedDoctor.address,
      patient: userId,
      patientName: patientName,
    };
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/appointments", appointment)
      .then((response) => {
        if (response.status === 201) {
          setAppointmentConfirmed(true);
        }
      })
      .catch((error) => {
        console.log(appointment);
        console.error("Error creating appointment:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-black">
        <h1 className="text-2xl font-semibold mb-4">Book an Appointment</h1>
        <div>
          <h2 className="text-lg font-semibold mb-2">Select a Specialty</h2>
          <select
            value={selectedSpecialty}
            onChange={(e) => handleSpecialtySelect(e.target.value)}
            className="border rounded py-2 px-3 mb-4"
          >
            <option value="">All</option>
            {specialitiesData.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
        <div
          className="doctors-scroll-container"
          style={{ overflowX: "auto", whiteSpace: "nowrap", width: "100%" }}
        >
          <div className="doctors-container" style={{ display: "flex" }}>
            <TransitionGroup component={null}>
              {filteredDoctors.map((doctor) => (
                <CSSTransition key={doctor._id} timeout={300} classNames="fade">
                  <div
                    className={`doctor-card ${
                      selectedDoctor?._id === doctor._id
                        ? "selected-doctor"
                        : ""
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                    style={{ flex: "0 0 auto", marginRight: "16px" }}
                  >
                    <img
                      src={`http://localhost:3001/${doctor.avatar}`}
                      alt={`${doctor.name}'s Photo`}
                      className="w-full h-32 object-cover rounded-md mb-2 text-black"
                    />
                    <h3 className="doctor-name">{doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Select a Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="border rounded py-2 px-3 mb-4"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Select a Time</h2>
          <select
            value={selectedTime}
            onChange={(e) => handleTimeSelect(e.target.value)}
            className="border rounded py-2 px-3 mb-4"
          >
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            {/* Add more time slots */}
          </select>
        </div>
        {!appointmentConfirmed && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment</h2>
            <button onClick={handlePayment}>Confirm Appointment</button>
          </div>
        )}
        {appointmentConfirmed && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Appointment Confirmed
            </h2>
            <div className="bg-green-100 p-4 rounded">
              <p>
                You have an appointment with{" "}
                <span className="font-semibold">{selectedDoctor.name}</span> on{" "}
                <span className="font-semibold">{selectedDate}</span> at{" "}
                <span className="font-semibold">{selectedTime}</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
