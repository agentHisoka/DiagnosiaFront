import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  const location = useLocation();
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    const status = new URLSearchParams(location.search).get("status");

    if (status === "success") {
      setVerificationStatus("Your email has been verified!");
      navigate("/signIN");
    } else if (status === "failed") {
      setVerificationStatus("Email verification failed. Please try again.");
      navigate("/signUP");
    }
  }, [location.search]);

  return (
    <div className="email-verification">
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
      {verificationStatus === "Your email has been verified!" && (
        <Link to="/login">Go to Login</Link>
      )}
    </div>
  );
}

export default VerifyEmail;
