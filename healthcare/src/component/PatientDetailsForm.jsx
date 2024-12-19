import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const PatientDetailsForm = ({ formattedDate, selectedTimeSlot, handlePrevious, handleNext, handlePatientDetailsChange ,doctorId, fees}) => {
  const [patientName, setPatientName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather patient details
    const patientDetails = {
      patientname: patientName,
      image: images,
      description :description,
      age:age,
      gender:gender,
    };

    // Pass the details to the parent component via the callback function
    handlePatientDetailsChange(patientDetails);
    handleBookAppointment();
    // Call the next step function
    handleNext();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
        setImages(files); // Convert FileList to Array
  };


  const handleBookAppointment = async () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    // Ensure user and patientId are available
    if (!userString) {
      console.log("User data is not available in localStorage.");
      return; // Exit early if user data is not available
    }
  
    const user = JSON.parse(userString);
    const patientId = user?.id;
  
    if (!patientId) {
      console.log("Patient ID is missing.");
      return; // Exit early if patientId is not available
    }
  
    console.log("Patient ID:", patientId);  // Log the patientId for debugging
  
    // Create FormData to handle file upload
    const formData = new FormData();
    
    // Append required data to formData
    formData.append('patientId', patientId);
    formData.append('doctorId', doctorId);  // Ensure doctorId is available in your scope
    formData.append('timeSlot', selectedTimeSlot);  // Ensure selectedTimeSlot is available
    formData.append('date', formattedDate);  // Ensure formattedDate is available
    formData.append('description', description);  // Ensure description is available
    formData.append('age', age);  // Ensure age is available
    formData.append('patientname', patientName);  // Ensure patientName is available
    formData.append('gender', gender);  // Ensure gender is available
  
    // Check if images are available and append them
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('imagePath', image);
      });
    } else {
      console.log("No images selected for upload.");
    }
  
    try {
      // Send the POST request with FormData
      const response = await axios.post('http://localhost:2449/api/consultations/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      // Log the response data
      console.log('Appointment booked:', response.data);
  
    } catch (error) {
      // Handle errors and log them
      console.error('Error booking appointment:', error);
    }
  };
  

  return (
    <div className="static-data">
      <div className="d-flex">
        <FaArrowLeft onClick={handlePrevious} />
        <h4>Enter Patient Details</h4>
      </div>
      <p>Selected Date: {formattedDate}</p>
      <p>Selected Time: {selectedTimeSlot}</p>
      <p>Fees/Counsultaion: ₹{fees}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div className="mb-3">
    
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          placeholder="Upload Images"
          onChange={handleImageChange}
          multiple 
        />
        <button type="submit" className="site-btn">
          Book appointment
        </button>
      </form>
    </div>
  );
};

export default PatientDetailsForm;
