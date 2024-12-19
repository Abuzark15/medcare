import React, { useState, useEffect } from "react";
import { fetchDoctors } from "../services/userServices"; // Assuming this function fetches the doctor data
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors when the component mounts
  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    try {
      const response = await fetchDoctors();

      // Check if the response contains doctorsWithUser array
      if (
        response &&
        response.doctorsWithUser &&
        Array.isArray(response.doctorsWithUser)
      ) {
        setDoctors(response.doctorsWithUser); // Set the doctors array to the state
      } else {
        console.error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  if (doctors.length === 0) {
    return <div>No doctors available</div>;
  }

  return (
    <section className="pricing spad">
      <div className="container">
        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
              <div className="pricing__item">
                <div className="pricing__item__title d-flex align-items-center justify-content-between">
                  {/* Doctor's profile image */}
                  {doctor.profilePicture && (
                    <div className="doctor-profile-img-container">
                      <img
                        src={`http://localhost:2449/${doctor.profilePicture}`}
                        alt="Doctor Profile"
                        className="doctor-profile-img"
                      />
                    </div>
                  )}

                  {/* Doctor's specialization and name */}
                  <div>
                    <p>
                      {doctor.specialization || "Specialization Not Available"}
                    </p>
                    <h3>
                      {doctor.User?.name || "Doctor Name"}
                      <span>
                        {doctor.specialization ||
                          "Specialization Not Available"}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Doctor's qualifications, gender, and experience */}
                <ul>
                  <li>
                    <h6>Qualifications:</h6>
                    <span>
                      {doctor.qualifications || "Qualifications Not Available"}
                    </span>
                  </li>
                  <li>
                    <h6>Gender:</h6>
                    <span>{doctor.User?.gender || "Gender Not Available"}</span>
                  </li>
                  <li>
                    <h6>Experience(years):</h6>
                    <span>
                      {doctor.experience || "Experience Not Available"}
                    </span>
                  </li>
                  <li>
                    <h6>Fees/Cousultaion:</h6>
                    <span>₹{doctor.fees || "fees Not Available"}</span>
                  </li>
                </ul>

                {/* Add a Book Now button */}
                <Link
                  to="/appointment-form"
                  state={{
                    doctorId: doctor.id,
                    doctorName: doctor.User?.name,
                    fees: doctor?.fees,
                  }}
                  className="primary-btn"
                >
                  Book now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
