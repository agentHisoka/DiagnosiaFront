import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

// project imports
import Home from "../containers/Home";
import Header from "../containers/header/Header";
import Navbar from "../components/navbar/Navbar";
// dashboard routing

// utilities routing
const AboutUs = Loadable(lazy(() => import("../pages/About")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
element: <Home />,
  children: [
    {
      path: "/header",
      element: <Header />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <Navbar />,
        },
      ],
    },

    {
      path: "about",
      children: [
        {
          path: "about-us",
          element: <AboutUs />,
        },
      ],
    } /*
    {
      path: "utils",
      children: [
        {
          path: "util-color",
          element: <UtilsColor />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-shadow",
          element: <UtilsShadow />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "tabler-icons",
          element: <UtilsTablerIcons />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "material-icons",
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },*/,
  ],
};

export default MainRoutes;
