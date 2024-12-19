import React, { useState, useEffect } from 'react';
import './DetailsForm.css'; 

const DetailsForm = ({ doctor, onClose, onAccept, onReject }) => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    if (doctor) {
      const formattedData = {
        ...doctor,
        createdAt: new Date(doctor.createdAt).toLocaleDateString(),
      };
      setDoctorData(formattedData);
    }
  }, [doctor]);

  if (!doctorData) return null;

  return (
    <div className="form-container">
      <h3>Doctor Details</h3>

      <form className="doctor-details-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={doctorData.User?.name} disabled />
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input type="text" value={doctorData.specialization} disabled />
        </div>
        <div className="form-group">
          <label>Qualifications</label>
          <input type="text" value={doctorData.qualifications} disabled />
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input type="text" value={doctorData.experience} disabled />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" value={doctorData.User.gender} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={doctorData.User.email} disabled />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" value={doctorData.User.phone} disabled />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <img src={doctorData.profilePicture} alt="Profile" className="profile-picture" />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" value={doctorData.createdAt} disabled />
        </div>
        <div className="form-group">
          <label>Approved</label>
          <input type="text" value={doctorData.isApproved ? 'Yes' : 'No'} disabled />
        </div>

        <div className="form-buttons">
          <button type="button" className="back-button" onClick={onClose}>Back</button>
          <button type="button" className="accept-button" onClick={() => onAccept(doctorData.User.id)}>Accept</button>
          <button type="button" className="reject-button" onClick={() => onReject(doctorData.id)}>Reject</button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
