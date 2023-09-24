import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaMale, FaFemale, FaStethoscope } from "react-icons/fa";
import { isAuthenticated } from "../auth";
import AuthContext from "../AuthContext";

const Calendar = () => {
  const { auth } = useContext(AuthContext);
  const decodedToken = isAuthenticated();
  const loggedInDoctorId = decodedToken.userId;
  const DoctorName = decodedToken.name;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/appointments")
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  const hours = [];
  for (let i = 8; i <= 17; i++) {
    hours.push(`${i}:00 AM`);
    hours.push(`${i}:30 AM`);
  }

  const renderAppointment = (date, hour) => {
    const appointment = appointments.find(
      (apt) =>
        new Date(apt.date).toDateString() === date.toDateString() &&
        apt.time === hour &&
        apt.doctor === DoctorName &&
        apt.paid === true
    );

    if (appointment) {
      return (
        <div className="bg-white p-2 rounded shadow transform hover:scale-105 transition-transform duration-300 text-gray-500">
          <div className="flex items-center">
            {appointment.gender === "Male" ? (
              <FaMale className="text-blue-500 mr-2" />
            ) : (
              <FaFemale className="text-pink-500 mr-2" />
            )}
            <p className="text-blue-500 font-semibold">
              {appointment.patientName}
            </p>
          </div>
          <p>At {appointment.time}</p>
          <div className="flex items-center mt-2">
            <FaStethoscope className="text-gray-500 mr-2" />
            <p>{appointment.specialty}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-semibold mb-3">
        Doctor's Appointment Calendar
      </h1>
      <div className="grid grid-cols-8 gap-2 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-1"></div>
        {dates.map((date) => (
          <div className="col-span-1 text-center" key={date.toDateString()}>
            <div className="bg-blue-500 text-white p-2 rounded">
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="col-span-1 text-right pr-2 py-1">{hour}</div>
            {dates.map((date) => (
              <div
                className="col-span-1 md:col-span-2 lg:col-span-1"
                key={`${date}-${hour}`}
              >
                {renderAppointment(date, hour)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
