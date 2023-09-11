import React from "react";
import "./index.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes, useParams } from "react-router-dom";
import Register from "./pages/YoussafREG/SignUp";
import Login from "./pages/YoussafREG/Login";
import ForgotPassword from "./pages/YoussafREG/ForgotPassword";
import ResetPassword from "./pages/YoussafREG/ResetPassword";
import LandingPage from "./containers/LandingPage";
import Team from "./scenes/global/Team";
import Contacts from "./scenes/global/Contacts";
import Form from "./scenes/global/Form";
import FAQ from "./scenes/global/Faq";
import HomeDashy from "./scenes/dashboard";
import PredictPage from "./pages/predictionPage/PredictPage";
import Dashy from "./scenes/global/Dashy";
import Layout from "./components/Layout";
import OrientationPage from "./pages/orientationPage/OrientationPage";
import PageNotFound from "./pages/PageNotFound";
import Blog from "./containers/blog/Blog";
import ContactForm from "./pages/ContactUs";
import ProtectedRoute from "./scenes/ProtectedRoute";
import Payment from "../src/pages/Payment";
import FindDoctor from "./components/doctors/FindDoctor";
import ProfilePage from "./pages/profile/UserProfile";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/Privacy";
import About from "./pages/About";
import VerifyEmail from "./pages/YoussafREG/VerifyEmail";
import Appointments from "./scenes/global/Appointments";
import Appointment from "./scenes/global/Appointment";
import AccessDenied from "./pages/YoussafREG/AccessDenied";
import DashboardPatient from "./scenes/dashboard/dashboardPatient";
import Calendar from "./scenes/global/Calendar";

const App = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="unauthorized" element={<AccessDenied />} />
        <Route path="aboutUs" element={<About />} />
        <Route path="terms&conditions" element={<TermsAndConditions />} />

        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="email-verification" Component={<VerifyEmail />} />

        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute roles={"doctor"} />}>
            <Route exact path="/payment" element={<Payment />} />
          </Route>

          <Route exact path="/signUP" element={<Register />} />
          <Route exact path="/signIN" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset_password/:id/:token"
            element={<ResetPassword />}
          ></Route>
          <Route element={<ProtectedRoute roles={["doctor", "visitor"]} />}>
            <Route path="/dashboard" element={<Dashy />}>
              <Route path="/dashboard/doc" element={<HomeDashy />} />
              <Route path="/dashboard/patient" element={<DashboardPatient />} />
              <Route path="/dashboard/calendar" element={<Calendar />} />
              <Route path="/dashboard/team" element={<Team />} />
              <Route path="/dashboard/getPredict" element={<PredictPage />} />
              <Route
                path="/dashboard/orientationDetails/:predictedDisease"
                element={<OrientationPage />}
              />
              <Route path="/dashboard/invoices" element={<FindDoctor />} />
              <Route path="/dashboard/profile/:id" element={<ProfilePage />} />
              <Route
                path="/dashboard/getAppointment"
                element={<Appointment />}
              />
              <Route
                path="/dashboard/My-Appointments"
                element={<Appointments />}
              />
              <Route path="/dashboard/form" element={<Form />} />
              <Route path="/dashboard/faq" element={<FAQ />} />
              <Route path="/dashboard/blog" element={<Blog />} />
              <Route path="/dashboard/contactUs" element={<ContactForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
