import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import Tasks from "./pages/dashboard/nurse/Tasks";
import NurseNotifications from "./pages/dashboard/nurse/Notifications";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes with Layout */}
        <Route path="/" element={<Layout />}>
          {/* Default redirect - adjust based on your auth logic */}
          <Route index element={<Navigate to="/login" replace />} />

          {/* Super Admin Routes */}
          <Route path="super-admin" element={<SuperAdminHome />} />

          {/* Admin Routes */}
          <Route path="admin">
            <Route index element={<AdminHome />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients">
              <Route index element={<Patients />} />
              <Route path="new" element={<NewPatient />} />
              <Route path=":id" element={<Patient />} />
            </Route>
            <Route path="register-patient" element={<Registration />} />
            <Route path="activity" element={<PlatformActivity />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="reports" element={<ReportAndLogs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="billing" element={<BillingAndPayment />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Doctor Routes */}
          <Route path="doctor" element={<DoctorHome />} />

          {/* Nurse Routes */}
          <Route path="nurse">
            <Route index element={<NurseHome />} />
            <Route path="patients">
              <Route index element={<Patients />} />
              <Route path="new" element={<NewPatient />} />
              <Route path=":id" element={<Patient />} />
            </Route>
            <Route path="tasks" element={<Tasks />} />
            <Route path="notifications" element={<NurseNotifications />} />
          </Route>

          {/* Patient Routes */}
          <Route path="patient" element={<PatientHome />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
