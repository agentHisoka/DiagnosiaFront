import React, { useState } from "react";
import { FaMale, FaFemale, FaStethoscope } from "react-icons/fa"; // Import icons from react-icons
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Import DnD components

const Calendar = () => {
  const [appointments, setAppointments] = useState([
    // Sample appointment data
    {
      date: new Date(),
      hour: "10:00 AM",
      patientName: "John Doe",
      age: 30,
      gender: "Male",
      appointmentType: "Follow-up",
    },
    {
      date: new Date(),
      hour: "10:30 AM",
      patientName: "John Doe",
      age: 30,
      gender: "Male",
      appointmentType: "Follow-up",
    },
    // Add more appointments here
  ]);

  // Create an array of dates for the next 7 days
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  // Create an array of hours from 8 AM to 5 PM
  const hours = [];
  for (let i = 8; i <= 17; i++) {
    hours.push(`${i}:00 AM`);
    hours.push(`${i}:30 AM`);
  }

  // Function to render appointment cards
  const renderAppointment = (date, hour) => {
    const appointment = appointments.find(
      (apt) =>
        apt.date.toDateString() === date.toDateString() && apt.hour === hour
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
          <p>Age: {appointment.age}</p>
          <div className="flex items-center mt-2">
            <FaStethoscope className="text-gray-500 mr-2" />
            <p>{appointment.appointmentType}</p>
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
      <div className="grid grid-cols-8 gap-2">
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
              <div className="col-span-1" key={`${date}-${hour}`}>
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
