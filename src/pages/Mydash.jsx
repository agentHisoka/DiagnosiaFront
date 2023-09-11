import { useState } from "react";
import "./myDash.css";
import Header from "../containers/dashboard/HeaderDash";
import Sidebar from "../containers/dashboard/SideBarDash";
import Home from "../containers/dashboard/HomeDash";
function Mydash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Home />
    </div>
  );
}

export default Mydash;
