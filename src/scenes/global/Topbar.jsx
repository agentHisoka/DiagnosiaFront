import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "rsuite/dist/rsuite.min.css";
import { Dropdown } from "rsuite";
import DetailIcon from "@rsuite/icons/Detail";
import { LogoutSharp } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { isAuthenticated } from "../auth";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const decodedToken = isAuthenticated();

  axios.defaults.withCredentials = true;

  const handleProfileClick = () => {
    // Replace 'userId' with the actual user ID you want to pass
    const userId = auth ? decodedToken.userId : null;
    console.log(decodedToken);
    navigate(`/dashboard/profile/${userId}`);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data.Status === "Succes") {
          navigate("/");
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleProfileClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout} type="button" sx={{ p: 1 }}>
          <LogoutSharp />
        </IconButton>

        <Dropdown icon={<SettingsOutlinedIcon />}>
          <Dropdown.Item icon={<DetailIcon />}> edite profile</Dropdown.Item>
          <Dropdown.Item icon={<DetailIcon style={{ color: "pink" }} />}>
            report issue
          </Dropdown.Item>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Topbar;
