import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Avatar,
  TextField,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // Import DataGrid components
import { useParams } from "react-router-dom"; // For extracting user ID from URL
import axios from "axios";
import "./userProfile.css";
import { isAuthenticated } from "../../scenes/auth";

export default function ProfilePage() {
  // Define a state variable to store user data
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    specialty: "",
    address: "",
    avatar: "", // Initialize with an empty string or the default avatar URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    specialty: "",
    address: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const decodedToken = isAuthenticated();
  const avatar = decodedToken.avatar.replace(/uploads\\/g, "");
  console.log("adaefefezfeef" + avatar);
  useEffect(() => {
    // Make an API call to fetch user data based on the ID
    axios
      .get(`http://localhost:3001/api/user/${id}`)
      .then((response) => {
        // Handle fetched user data
        setUserData(response.data);
        setEditedUserData({
          ...response.data,
          // Set the initial specialty based on the user's role
          specialty:
            response.data.role === "visitor"
              ? "patient"
              : response.data.specialty,
        });
        setSelectedAvatar(
          `http://localhost:3001/${response.data.avatar.replace(
            /uploads\\/g,
            ""
          )}`
        ); // Set the avatar URL
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });
  }, [id]);

  const [file, setFile] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State to store the selected avatar

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display the selected avatar when a file is chosen
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedAvatar(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`http://localhost:3001/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        window.location.reload();
        // Handle the response here
        console.log("File uploaded and user avatar updated:", response.data);
        // Update the user's avatar in your UI if needed
      })
      .catch((error) => {
        console.error("Error uploading file and updating user avatar:", error);
      });
  };

  // Dummy user data (replace this with actual data)
  const user = {
    name: "John Doe",
    specialty: "Cardiologist",
    address: "123 Main St, City",
    role: "visitor", // Replace with "doctor" to test the doctor view
    avatar: "https://placekitten.com/200/200", // Replace with the actual avatar URL
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (userData.role === "visitor" && name === "specialty") {
      return;
    }
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  // const handleSaveProfilePicture = () => {
  //   setIsSaving(true);

  //   // Create a FormData object to send the profile picture file to the server
  //   const formData = new FormData();
  //   formData.append("profilePicture", profilePicture);

  //   // Make a POST request to send the profile picture to the server
  //   axios
  //     .post("http://localhost:3001/api/upload-profile-picture", formData)
  //     .then((response) => {
  //       console.log("Profile picture saved successfully:", response.data);

  //       // After successfully saving the profile picture on the server, update the user's avatar field in the state
  //       setUserData((prevUserData) => ({
  //         ...prevUserData,
  //         avatar: response.data.avatarUrl, // Update the avatar URL in the user data
  //       }));

  //       setIsEditingProfilePicture(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving profile picture:", error);
  //     })
  //     .finally(() => {
  //       setIsSaving(false);
  //     });
  // };
  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   setProfilePicture(file);
  // };

  const handleSaveChanges = () => {
    setIsSaving(true);

    // Modify this condition to hide the "Specialty" field for visitors
    if (userData.role === "visitor") {
      // Omit the "specialty" field from the editedUserData for visitors
      const { specialty, ...dataToSend } = editedUserData;
      axios
        .put(`http://localhost:3001/api/user/${id}`, dataToSend)
        .then((response) => {
          console.log("User data updated successfully:", response.data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      // For other roles, send the editedUserData as is
      axios
        .put(`http://localhost:3001/api/user/${id}`, editedUserData)
        .then((response) => {
          console.log("User data updated successfully:", response.data);

          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  // Sample data for the DataGrid
  const mockDataContacts = [
    { id: 1, name: "User 1", appointmentDate: "2023-08-30" },
    { id: 2, name: "User 2", appointmentDate: "2023-09-05" },
    // Add more rows as needed
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "User Name", width: 200, sortable: false },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      width: 200,
      sortable: false,
    },
  ];

  return (
    <div>
      {userData ? (
        <div>
          {/* First Row */}
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Box mt={5} mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    {selectedAvatar && (
                      <Avatar
                        sx={{ width: 150, height: 150 }}
                        src={selectedAvatar}
                        alt="Selected Avatar"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {userData.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {userData.specialty}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userData.address}
                    </Typography>
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                        onClick={handleEditToggle}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Box mt={5} mb={3} pl={2}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Edit Profile
                </Typography>
                <form>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={editedUserData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    name="specialty"
                    label="Specialty"
                    variant="outlined"
                    value={editedUserData.specialty}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={editedUserData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ mt: 2 }}
                  />
                </form>
                <h2>Upload Avatar</h2>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload</button>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ mt: 3, mb: 3 }} />

          {/* Second Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* List of Appointments (For Visitors) */}
              {userData.role === "visitor" && (
                <Box px={2}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Your Appointments
                  </Typography>
                  {/* Render the DataGrid for appointments */}
                  <Box m="40px 0 0 0" height="75vh">
                    <DataGrid
                      rows={mockDataContacts}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {/* List of Users with Appointments (For Doctors) */}
              {userData.role === "doctor" && (
                <Box px={2}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Users with Appointments
                  </Typography>
                  {/* Render the DataGrid for users with appointments */}
                  <Box m="40px 0 0 0" height="75vh">
                    <DataGrid
                      rows={mockDataContacts}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
