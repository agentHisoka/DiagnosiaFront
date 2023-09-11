import Home from "../containers/Home";

// project imports
import { lazy } from "react";

// project imports

import Loadable from "../ui-component/Loadable";

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import("../pages/authentication/authentication3/Login3")));
const AuthRegister3 = Loadable(
  lazy(() => import("../pages/authentication/authentication3/Register3"))
);

// login option 3 routing

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <Home />,
  children: [
    {
      path: "/pages/login/login3",
      element: <AuthLogin3 />,
    },
    {
      path: "/pages/register/register3",
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
