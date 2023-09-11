import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrientationPage() {
  const { predictedDisease } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/doctors/disease/${predictedDisease}`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [predictedDisease]);

  return (
    <div>
      <h2>Doctors Specialized in {predictedDisease}</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
}
