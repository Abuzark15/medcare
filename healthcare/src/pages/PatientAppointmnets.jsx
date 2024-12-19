import React, { useEffect, useState } from 'react';
import { fetchCounsultationByPatient } from '../services/userServices';  // Adjust the import as needed
import UserList from '../component/UserList';

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
   

    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await fetchCounsultationByPatient();
    if (data) {
      setAppointments(data);
    }
  };

  return (
    <>
      <UserList appointments={appointments} />
    </>
  );
}
