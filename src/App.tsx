import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/layout";
import Index from "./module/index/Index";
import Home from "./module/Home/Home";
import Registration from "./module/Registration/Registration";
import WardMgt from "./module/WardMgt/WardMgt";
import Patients from "./module/Patients/Patients";
import Resources from "./module/Resources/Resources";
import Messages from "./module/Messages/Messages";
import Consultation from "./module/Consultation/Consultation";
import Support from "./module/Support/Support";
import Settings from "./module/Settings/Settings";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
