import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Summary = ({ formattedDate, selectedTimeSlot,handlePrevious,patientDetails,fees }) => {
  const navigate = useNavigate();
  console.log("ksdhfgkjdf ", patientDetails);
  
  return (
    <div className="summary">
      <div className="d-flex">
      <FaArrowLeft
      onClick={()=>handlePrevious()}/>
     <h4>Summary</h4>
     </div>
      <p>Date: {formattedDate}</p>
      <p>Selected Time: {selectedTimeSlot}</p>
      <p>Patient Name: {patientDetails.patientname}</p>
      <p>Fees/Counsultaion: ₹{fees}</p>
      <p>Gender: {patientDetails.gender}</p>
      <p>Age: {patientDetails.age}</p>
      <p>Description: {patientDetails.description}</p>
      <button type="submit" className="site-btn" onClick={navigate('/')}>
          Book appointment
        </button>
    </div>
  );
};

export default Summary;
