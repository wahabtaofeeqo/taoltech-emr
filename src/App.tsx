import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/layout";
import Home from "./module/Home/Home";
import Registration from "./module/Registration/Registration";
import WardMgt from "./module/WardMgt/doctor/WardMgt";
import Patients from "./module/Patients/doctor/Patients";
import Resources from "./module/Resources/Resources";
import Messages from "./module/Messages/Messages";
import Consultation from "./module/Consultation/Consultation";
import Support from "./module/Support/Support";
import Settings from "./module/Settings/Settings";
import LayoutLanding from './LandingPage/Layout';
import LandingHome from './LandingPage/component/Home';
import About from './LandingPage/component/about';
import PatientsEntry from "./module/Patients/PatientsEntry";

import PatientDetails from "./module/Patients/doctor/PatientsData"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="registration" element={<Registration />} />
              <Route path="consultation" element={<Consultation />} />
              <Route path="ward-management" element={<WardMgt />} />
              <Route path="patients" element={<Patients />} />
              <Route path="resources" element={<Resources />} />
              <Route path="messages" element={<Messages />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
              <Route path="patients/:id" element={<PatientsEntry />} />
            </Route>
            <Route path="/" element={<LayoutLanding />}>
              <Route index element={<LandingHome />} />
              <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
