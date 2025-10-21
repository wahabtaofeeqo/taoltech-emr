import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Layout from "@/components/common/Layout";
import SuperAdminHome from "@/pages/dashboard/super-admin/Home";
import AdminHome from "@/pages/dashboard/admin/Home";
import DoctorHome from "@/pages/dashboard/doctor/Home";
import NurseHome from "./pages/dashboard/nurse/Home";
import PatientHome from "@/pages/dashboard/patient/Home";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "@/pages/auth/VerifyCode";
import ResetPassword from "@/pages/auth/ResetPassword";
import Doctors from "@/pages/dashboard/admin/Doctors";
import Patients from "@/pages/dashboard/admin/Patients/Patients";
import NewPatient from "@/pages/dashboard/admin/Patients/NewPatient";
import Patient from "@/pages/dashboard/admin/Patients/Patient";
import Registration from "@/pages/dashboard/admin/Registration";
import PlatformActivity from "./pages/dashboard/admin/PlatformActivity";
import StaffManagement from "./pages/dashboard/admin/StaffManagement";
import ReportAndLogs from "./pages/dashboard/admin/ReportAndLogs";
import Notifications from "./pages/dashboard/admin/Notifications";
import BillingAndPayment from "./pages/dashboard/admin/BillingAndPayment";
import Pharmacy from "./pages/dashboard/admin/Pharmacy";
import Settings from "./pages/dashboard/admin/Settings";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route index path="/forgot-password" element={<ForgotPassword />} />
        <Route index path="/verify-code" element={<VerifyCode />} />
        <Route index path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          {/* Super Admin Routes */}
          <Route path="super-admin" element={<SuperAdminHome />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/doctors" element={<Doctors />} />
          <Route path="admin/patients" element={<Patients />} />
          <Route path="admin/patients/new" element={<NewPatient />} />
          <Route path={`admin/patients/:id`} element={<Patient />} />
          <Route path={`admin/register-patient`} element={<Registration />} />
          <Route path={`admin/activity`} element={<PlatformActivity />} />
          <Route path={`admin/staff`} element={<StaffManagement />} />
          <Route path={`admin/reports`} element={<ReportAndLogs />} />
          <Route path={`admin/notifications`} element={<Notifications />} />
          <Route path={`admin/billing`} element={<BillingAndPayment />} />
          <Route path={`admin/pharmacy`} element={<Pharmacy />} />
          <Route path={`admin/settings`} element={<Settings />} />

          {/* Doctor Routes */}
          <Route path="doctor" element={<DoctorHome />} />

          {/* Nurse Routes */}
          <Route path="nurse" element={<NurseHome />} />

          {/* Patient Routes */}
          <Route path="patient" element={<PatientHome />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
