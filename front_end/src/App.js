import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';

import EditDetails from './patienComponents/EditDetails';
import MedicalProfile from './patienComponents/MedicalProfile';
import MedicalHistory from './patienComponents/MedicalHistory';
import Favorites from './patienComponents/Favorites';
import ScheduledAppointment from './patienComponents/ScheduledAppointment';
import NewAppoinments from './patienComponents/NewAppoinments';
import BuyMedicines from './patienComponents/BuyMedicines';
import BuyProducts from './patienComponents/BuyProducts';
import BookAService from './patienComponents/BookAService';
import Profile from './doctorComponents/Profile';
import Earnings from './doctorComponents/Earnings';
import Clinic from './doctorComponents/Clinic';
import Appointments from './doctorComponents/Appointments';
import AppointmentRequests from './doctorComponents/AppointmentRequests';
import Patients from './doctorComponents/Patients';
import MailsAlerts from './doctorComponents/MailsAlerts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegistrationForm />
            </AuthLayout>
          }
        />
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {/* patient routes */}
         <Route path="/edit-details" element={ <MainLayout> <EditDetails /> </MainLayout>} />
         <Route path="/medical-profile" element={ <MainLayout> <MedicalProfile /> </MainLayout>} />
         <Route path="/medical-history" element={ <MainLayout> <MedicalHistory /> </MainLayout>} />
         <Route path="/favorites" element={ <MainLayout> <Favorites /> </MainLayout>} />
         <Route path="/scheduled-appointments" element={ <MainLayout> <ScheduledAppointment /> </MainLayout>} />
         <Route path="/new-appointments" element={ <MainLayout> <NewAppoinments /> </MainLayout>} />
         <Route path="/buy-medicines" element={ <MainLayout> <BuyMedicines /> </MainLayout>} />
         <Route path="/buy-products" element={ <MainLayout> <BuyProducts /> </MainLayout>} />
         <Route path="/book-service" element={ <MainLayout> <BookAService /> </MainLayout>} />
 
         {/* doctor routes */}
         <Route path="/my-profile" element={ <MainLayout> <Profile /> </MainLayout>} />
         <Route path="/my-earnings" element={ <MainLayout> <Earnings /> </MainLayout>} />
         <Route path="/my-clinic" element={ <MainLayout> <Clinic /> </MainLayout>} />
         <Route path="//scheduled-appointments" element={ <MainLayout> <Appointments /> </MainLayout>} />
         <Route path="/appointment-requests" element={ <MainLayout> <AppointmentRequests /> </MainLayout>} />
         <Route path="/my-patients" element={ <MainLayout> <Patients /> </MainLayout>} />
         <Route path="/book-service" element={ <MainLayout> <BookAService /> </MainLayout>} />
         <Route path="/mails-alerts" element={ <MainLayout> <MailsAlerts /> </MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
