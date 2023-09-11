import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./contactUs.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <div className="mt-8 mx-4 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start">
        <div
          className="p-2 flex flex-col justify-center hover:scale-105 transition duration-700 ease-in-out"
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            height: "100vh",
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 600,
              mx: "auto",
              p: 2,
              border: "2px solid  #000000",
              borderRadius: "12px",
              boxShadow: 1,
            }}
          >
            <Typography variant="h4" align="center" mb={2}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#111",
                  },
                }}
              >
                Submit
              </Button>
            </form>
            <div class="social-container">
              <h3>Social Follow</h3>
              <a
                href="https://www.youtube.com/c/jamesqquick"
                className="youtube social"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100067642477489"
                className="facebook social"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://www.twitter.com/jamesqquick"
                className="twitter social"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/learnbuildteach"
                className="instagram social"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
