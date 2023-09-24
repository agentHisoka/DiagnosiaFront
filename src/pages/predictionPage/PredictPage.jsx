import React, { useState } from "react";
import { AutoComplete } from "rsuite";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent } from "@mui/material";
import "./predictPage.css";
import data from "./dataSource.json";
import { useSpring, animated } from "react-spring"; // Import react-spring

export default function PredictPage() {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [diagnosisResult, setDiagnosisResult] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Keep track of selected symptoms
  const [requiredMeasurement, setRequiredMeasurement] = useState(""); // Measurement state
  const [isResultVisible, setResultVisible] = useState(false); // Track result visibility

  const springProps = useSpring({
    transform: isResultVisible ? "scale(1)" : "scale(0)", // Scale effect for pop-out
    opacity: isResultVisible ? 1 : 0, // Opacity for fading in/out
  });
  const handleSymptomChange = (value, index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleDiagnoseClick = async () => {
    const selectedSymptomsWithoutDuplicates = selectedSymptoms.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    if (selectedSymptomsWithoutDuplicates.length < 3) {
      setShowError(true);
      setErrorMessage("Please enter at least 3 unique symptoms.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/predict/", {
        symptoms: selectedSymptomsWithoutDuplicates,
      });

      const { predicted_disease, required_measurement } = response.data;

      setDiagnosisResult(predicted_disease);
      setRequiredMeasurement(required_measurement);
      setShowError(false);
      setResultVisible(true); // Show the result container with animation
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const addSymptom = (value) => {
    if (value.trim() === "") {
      return;
    }

    if (selectedSymptoms.includes(value)) {
      // Symptom already exists in the selected symptoms
      setShowError(true);
      setErrorMessage("Symptom already selected.");
      return;
    }

    const updatedSelectedSymptoms = [...selectedSymptoms, value];
    setSelectedSymptoms(updatedSelectedSymptoms);

    // Clear the error message and input field
    setShowError(false);
    setSymptoms((prevSymptoms) => {
      const updatedSymptoms = [...prevSymptoms];
      updatedSymptoms[selectedSymptoms.length] = "";
      return updatedSymptoms;
    });
  };

  return (
    <div className="container">
      <Typography variant="h4" className="title">
        Please enter the symptoms you are experiencing below, and we will
        provide a diagnosis.
      </Typography>
      <div className="symptom-inputs">
        {symptoms.map((symptom, index) => (
          <div key={index}>
            <AutoComplete
              className="styled-auto-complete"
              placeholder={`Enter symptom ${index + 1}`}
              data={data.symptoms}
              onSelect={(value) => addSymptom(value)}
            />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        className="diagnose-button"
        onClick={handleDiagnoseClick}
      >
        Diagnose
      </Button>

      {showError && (
        <div className="error-message">
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </div>
      )}

      {diagnosisResult && !showError && (
        <animated.div style={springProps} className="result-container">
          <div className="result-content">
            <div className="diagnosis-card">
              <Card>
                <CardContent>
                  <div className="diagnosis-result">
                    <Typography variant="h6">Diagnosis Result</Typography>
                    <Typography variant="body1">{diagnosisResult}</Typography>
                  </div>
                  <Link to={`/dashboard/orientationDetails/${diagnosisResult}`}>
                    <Button variant="contained" className="details-button">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}
// export default function PredictPage() {
//   const [symptom1, setSymptom1] = useState("");
//   const [symptom2, setSymptom2] = useState("");
//   const [symptom3, setSymptom3] = useState("");
//   const [symptom4, setSymptom4] = useState("");
//   const [symptom5, setSymptom5] = useState("");
//   const [diagnosisResult, setDiagnosisResult] = useState("");
//   const [showResult, setShowResult] = useState(false);

//   // Define separate state variables for each input field

//   const handleDiagnoseClick = async () => {
//     try {
//       const selectedSymptoms = [
//         symptom1,
//         symptom2,
//         symptom3,
//         symptom4,
//         symptom5,
//       ];

//       // Send the selectedSymptoms array to the backend
//       const response = await axios.post(
//         "http://localhost:8000/predict/",
//         { symptoms: selectedSymptoms }, // Wrap the data in an object with a key named "symptoms"
//         {
//           headers: {
//             "Content-Type": "application/json", // Set the content type to JSON
//           },
//         }
//       );
//       setDiagnosisResult(response.data.predicted_disease); // Update the diagnosis result
//       setShowResult(true);
//       // Pass selected symptoms to the ViewDetails page
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h4 className="title">
//         Can you input the symtoms you feel in order to get specific diagnosis{" "}
//       </h4>
//       <div className="auto-complete-container">
//         <AutoComplete
//           className="styled-auto-complete"
//           placeholder="Enter symptom 1"
//           data={data.symptoms}
//           onSelect={(value) => setSymptom1(value)}
//         />
//         <AutoComplete
//           className="styled-auto-complete"
//           placeholder="Enter symptom 2"
//           data={data.symptoms}
//           onSelect={(value) => setSymptom2(value)}
//         />
//         <AutoComplete
//           className="styled-auto-complete"
//           placeholder="Enter symptom 3"
//           data={data.symptoms}
//           onSelect={(value) => setSymptom3(value)}
//         />
//         <AutoComplete
//           className="styled-auto-complete"
//           placeholder="Enter symptom 4"
//           data={data.symptoms}
//           onSelect={(value) => setSymptom4(value)}
//         />
//         <AutoComplete
//           className="styled-auto-complete"
//           placeholder="Enter symptom 5"
//           data={data.symptoms}
//           onSelect={(value) => setSymptom5(value)}
//         />

//         <button className="diagnose-button" onClick={handleDiagnoseClick}>
//           Diagnose
//         </button>
//         {showResult && (
//           <div className="result-container">
//             {/* ... Display diagnosis result */}
//             <div className="diagnosis-result">
//               <h3>Diagnosis Result</h3>
//               <p>{diagnosisResult}</p>
//             </div>
//             {/* Button to link to the detailed page */}
//             <Link to={`/dashboard/orientationDetails/${diagnosisResult}`}>
//               <button className="details-button">View Details</button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
