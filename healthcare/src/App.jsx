import './App.css';
import Login from './pages/Login';
import Lyaout from './component/Lyaout';
import Home from './Home';
import ProtectedRoute from './utils/protectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctorform from './pages/Doctorform';
import Register from './pages/Register';
import AdminLayout from './pages/admin/AdminLayout';
import PrivateRoute from './utils/PrivateRoute';
import DocotorRequest from './pages/admin/pages/DocotorRequest';
import Dashboard from './pages/admin/component/Dashboard';
import Doctors from './pages/Doctors';
import Messaging from './pages/Messaging';
import AppointmentForm from './pages/AppointmentForm';
import PatientAppointmnets from './pages/PatientAppointmnets';

function App() {
  return (
    <Router>
      <Routes>
        
          
          <Route path="/admin" element={
            <PrivateRoute>
            <AdminLayout />
            </PrivateRoute>}>
            <Route path='Dashboard' index element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='Requests' element={<PrivateRoute><DocotorRequest/></PrivateRoute>}/>
            </Route> 
            

        <Route path="/" element={<Lyaout />}>
          <Route  index element={<Home />} />  
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="doctors" element={<Doctors/>} />
          <Route path="request-doctor" element={
            <ProtectedRoute>
              <Doctorform />
            </ProtectedRoute>
          } />
          <Route path="inbox" element={
            <ProtectedRoute>
              <Messaging />
            </ProtectedRoute>
          } />
          <Route path="appointment-form" element={
            <ProtectedRoute>
              <AppointmentForm />
            </ProtectedRoute>
          } />
          <Route path="appointment-list" element={
            <ProtectedRoute>
            <PatientAppointmnets/>
            </ProtectedRoute>
          } />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
