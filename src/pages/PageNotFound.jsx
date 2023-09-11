import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  const handleGoBack = () => {
    // Implement your navigation logic here, e.g., using react-router or window.history
    window.history.back();
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container>
        <section className="page_404 centered">
          <div className="col-sm-12 centered">
            {/* Use the centered class */}
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for is not available!</p>
                <button onClick={handleGoBack}>
                  <p className="link_404">Go to Home</p>{" "}
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  );
}
