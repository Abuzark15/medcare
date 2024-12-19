import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaRegAddressCard, FaCamera, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { getCurrentUser } from '../services/authService'; // Import the service for getting user data
import axios from 'axios'; // Import axios for API calls

const Doctorform = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: "",
    qualifications: "",
    experience: "",
    fees:""
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Prefill user data from localStorage (using getCurrentUser from your service)
  useEffect(() => {
    const currentUser = getCurrentUser();  // Get the current user from localStorage
    if (currentUser) {
      setUserInfo({
        userId: currentUser.id || "",
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        gender: currentUser.gender || "",
      });
    }
  }, []);

  // Handlers for form changes
  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleChangeDoctorDetails = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // API call to submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("userId", userInfo.userId);
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("phone", userInfo.phone);
    formData.append("gender", userInfo.gender);
    formData.append("specialization", doctorDetails.specialization);
    formData.append("qualifications", doctorDetails.qualifications);
    formData.append("experience", doctorDetails.experience);
    formData.append("profilePicture", profilePicture);
    formData.append("fees", doctorDetails.fees);

    // Set loading state to true
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2449/api/user/request-for-doctor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setSuccess("Form submitted successfully! its Safe to close this page now"); // Success feedback
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError("There was an error submitting the form. Please try again.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: '600px' }}>
      <h2 className="text-center mb-4">Doctor Registration Wizard</h2>

      {/* Progress Bar with Live Tracker */}
      <div className="d-flex justify-content-center mb-4">
        <div className="step-icon-wrapper d-flex justify-content-between">
          <div className={`step-icon ${step >= 1 ? "active" : ""}`}>
            <FaUser />
          </div>
          <div className={`step-icon-line ${step > 1 ? "completed" : ""}`}></div>
          <div className={`step-icon ${step >= 2 ? "active" : ""}`}>
            <FaRegAddressCard />
          </div>
          <div className={`step-icon-line ${step > 2 ? "completed" : ""}`}></div>
          <div className={`step-icon ${step >= 3 ? "active" : ""}`}>
            <FaCamera />
          </div>
        </div>
      </div>

      {/* Step 1: Basic User Information */}
      {step === 1 && (
        <div className="wizard-step active">
          <h4>Step 1: Basic User Information</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userInfo.name}
                onChange={handleChangeUserInfo}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userInfo.email}
                onChange={handleChangeUserInfo}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={userInfo.phone}
                onChange={handleChangeUserInfo}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={userInfo.gender}
                onChange={handleChangeUserInfo}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <FaArrowRight
                className="text-primary"
                onClick={nextStep}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Doctor-Specific Details */}
      {step === 2 && (
        <div className="wizard-step active">
          <h4>Step 2: Doctor-Specific Details</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Specialization</label>
              <input
                type="text"
                className="form-control"
                name="specialization"
                value={doctorDetails.specialization}
                onChange={handleChangeDoctorDetails}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Qualifications</label>
              <input
                type="text"
                className="form-control"
                name="qualifications"
                value={doctorDetails.qualifications}
                onChange={handleChangeDoctorDetails}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Experience (years)</label>
              <input
                type="number"
                className="form-control"
                name="experience"
                value={doctorDetails.experience}
                onChange={handleChangeDoctorDetails}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fee per Counsultaion</label>
              <input
                type="number"
                className="form-control"
                name="fees"
                value={doctorDetails.fees}
                onChange={handleChangeDoctorDetails}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <FaArrowLeft
                className="text-secondary"
                onClick={prevStep}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
              <FaArrowRight
                className="text-primary"
                onClick={nextStep}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Profile Picture Upload and Submit */}
      {step === 3 && (
        <div className="wizard-step active">
          <h4>Step 3: Profile Picture Upload</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Upload Profile Picture</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <FaArrowLeft
                className="text-secondary"
                onClick={prevStep}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
              <div className="d-flex justify-content-center w-100">
                <button
                  type="submit"
                  className="btn btn-info btn-lg"
                  style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "none",
                    color: "black",
                    cursor: "pointer",
                  }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Success/Error Message */}
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Doctorform;
