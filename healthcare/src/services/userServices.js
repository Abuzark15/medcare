import axios from "axios";
const API_URL = "http://localhost:2449/api";
import {getCurrentUser, getToken} from "./authService"


export const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/doctors`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching table data', error);
      return { headers: [], data: [] };
    }
  };
  export const fetchCounsultationByPatient = async () => {
    const token = getToken();
    const user = getCurrentUser();
  
    const patientId = user?.id;
  
    if (!patientId) {
      console.log("Patient ID is missing.");
      return;
    }
  
    console.log("Patient ID:", patientId); 
    try {
      const response = await axios.get(`${API_URL}/consultations/all/request/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // No need to call JSON.parse here, axios automatically parses the response.
      return response.data;  // Return the response directly
  
    } catch (error) {
      console.error('Error fetching appointment:', error);
      return;
    }
  }
  