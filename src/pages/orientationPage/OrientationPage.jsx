import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../../scenes/auth";
import AuthContext from "../../scenes/AuthContext";

export default function OrientationPage() {
  const { predictedDisease } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [noDoctorsAvailable, setNoDoctorsAvailable] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/doctors/disease/${predictedDisease}`)
      .then((response) => {
        if (response.data.length === 0) {
          // If no doctors are available, set the flag
          setNoDoctorsAvailable(true);
        } else {
          setDoctors(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [predictedDisease]);

  // Define a static doctor with empty fields
  const staticDoctor = {
    name: "unavailable",
    specialty: "",
    address: "",
    _id: "staticDoctor", // Use a unique ID to distinguish it from real doctors
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div>
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">
            Doctors Specialized in {predictedDisease}{" "}
          </h2>
        </div>

        {noDoctorsAvailable ? (
          // Render the static doctor when no doctors are available
          <div
            key={staticDoctor._id}
            className="rounded-lg shadow-lg p-4"
            style={{
              background: "linear-gradient(45deg, #334155, #1a2537)",
              color: "white", // Text color
              position: "relative", // Added relative positioning
              display: "flex", // Added to use Flexbox
              flexDirection: "column", // Stack elements vertically
              alignItems: "center", // Center items horizontally
              textAlign: "center", // Center text
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{staticDoctor.name}</h3>
            <p className="text-gray-300 mb-2">{staticDoctor.specialty}</p>
            {/* Additional Information */}
            <p className="text-gray-400 mb-2">{staticDoctor.address}</p>
            {/* "Book Appointment" button */}
            <button>
              <Link
                to={`/dashboard/contactUs`}
                className="block bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 text-center"
                style={{ textDecoration: "none" }}
              >
                Contact Support
              </Link>
            </button>
          </div>
        ) : (
          // Render doctors if available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-lg shadow-lg p-4"
                style={{
                  background: "linear-gradient(45deg, #334155, #1a2537)",
                  color: "white", // Text color
                  position: "relative", // Added relative positioning
                  display: "flex", // Added to use Flexbox
                  flexDirection: "column", // Stack elements vertically
                  alignItems: "center", // Center items horizontally
                  textAlign: "center", // Center text
                }}
              >
                <img
                  src={`http://localhost:3001/${doctor.avatar}`}
                  alt={`${doctor.name}'s Photo`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-300 mb-2">{doctor.specialty}</p>
                {/* Additional Information */}
                <p className="text-gray-400 mb-2">{doctor.address}</p>
                {/* "Book Appointment" button */}
                <button>
                  <Link
                    to={`/dashboard/getAppointment?userId=${doctor._id}&doctorName=${doctor.name}`}
                    className="block bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 text-center"
                    style={{ textDecoration: "none" }}
                  >
                    Book Appointment
                  </Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
