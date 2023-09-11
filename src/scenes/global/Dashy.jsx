import { useState } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import HomeDashy from "../dashboard";
import "./dashy.css";

function Dashy() {
  const { id } = useParams();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar isSidebar={isSidebar} userId={id} />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashy;
