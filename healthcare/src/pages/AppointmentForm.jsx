  import React, { useState, useRef, useEffect } from "react";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { format } from "date-fns";
  import { IoIosCheckmarkCircle } from "react-icons/io";
  import "./AppointmentForm.css";
  import PatientDetailsForm from "../component/PatientDetailsForm";
  import Summary from "../component/Summary";
  import { useLocation } from "react-router-dom";
  import axios from 'axios';

  const AppointmentForm = () => {
    const [currentStep, setCurrentStep] = useState(1); // 1: Date Picker, 2: Static Data, 3: Summary
    const [startDate, setStartDate] = useState(new Date()); // User-selected date
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [doctorAvailability, setDoctorAvailability] = useState(null); // For storing fetched availability
    const [isDoctorAvailable, setIsDoctorAvailable] = useState(true); // To track doctor's availability
    const [patientDetails, setPatientDetails] = useState({}); 
    const datePickerRef = useRef(null);
    const iconRef = useRef(null);
    const location = useLocation();

    const { doctorId, doctorName, fees } = location.state || {};

    useEffect(() => {
      fetchAvailability();
    }, [startDate]);

    const fetchAvailability = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:2449/api/availability/get/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

   
        const availableDates = response.data.map(item => ({
          date: new Date(item.date),
          startTime: item.startTime,
          endTime: item.endTime,
        }));

   
        const selectedDateWithoutTime = format(new Date(startDate).toISOString(), 'yyyy-MM-dd');
        
        const matchingAvailability = availableDates.find(item => 
          format(item.date.toISOString(), 'yyyy-MM-dd') === selectedDateWithoutTime
        );

        if (matchingAvailability) {
          setDoctorAvailability(matchingAvailability);
          setIsDoctorAvailable(true);
        } else {
          setIsDoctorAvailable(false);
          setDoctorAvailability(null);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        setIsDoctorAvailable(false);
        setDoctorAvailability(null);
      }
    };

    const generateTimeSlots = (startTime, endTime) => {
      let slots = [];
      let currentTime = new Date(startDate);
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      currentTime.setHours(startHour, startMinute, 0, 0); 
      const endTimeDate = new Date(currentTime);
      endTimeDate.setHours(endHour, endMinute, 0, 0);

      while (currentTime < endTimeDate) {
        const slot = format(currentTime, "hh:mm a");
        slots.push(slot);
        currentTime.setMinutes(currentTime.getMinutes() + 15); 
      }

      return slots;
    };

    const generateSessionsFromAvailability = (startTime, endTime) => {
      const session1EndTime = "12:30"; 
      const session2StartTime = "14:00"; 

      // Generate slots for Session 1 (9:00 AM - 12:30 PM)
      const session1Slots = generateTimeSlots(startTime, session1EndTime);
      // Generate slots for Session 2 (2:00 PM - 4:00 PM)
      const session2Slots = generateTimeSlots(session2StartTime, endTime);

      return { session1Slots, session2Slots };
    };

    const formattedDate = format(startDate, "d MMMM, yyyy");

    const handleTimeSlotClick = (time) => {
      setSelectedTimeSlot(time);
      handleNext();
    };

    const handleNext = () => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    };
    const handlePatientDetailsChange = (details) => {
      setPatientDetails(details);
    };

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleDateChange = (date) => {
      setStartDate(date);
      setIsDatePickerVisible(false);
    };

    const formatSessionTime = (startTime, endTime) => {
      const formattedStart = format(new Date(`2024-01-01T${startTime}:00`), "hh:mm a");
      const formattedEnd = format(new Date(`2024-01-01T${endTime}:00`), "hh:mm a");
      return `${formattedStart} - ${formattedEnd}`;
    };

    return (
      <section className="services-page spad min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Step Tracker */}
              <div className="d-flex justify-content-center mb-4">
                <div className="step-icon-wrapper d-flex justify-content-between">
                  <div
                    className={`step-icon ${currentStep >= 1 ? "active" : ""}`}
                  >
                    <IoIosCheckmarkCircle />
                  </div>
                  <div
                    className={`step-icon-line ${
                      currentStep > 1 ? "completed" : ""
                    }`}
                  ></div>
                  <div
                    className={`step-icon ${currentStep >= 2 ? "active" : ""}`}
                  >
                    <IoIosCheckmarkCircle />
                  </div>
                  <div
                    className={`step-icon-line ${
                      currentStep > 2 ? "completed" : ""
                    }`}
                  ></div>
                  <div
                    className={`step-icon ${currentStep >= 3 ? "active" : ""}`}
                  >
                    <IoIosCheckmarkCircle />
                  </div>
                </div>
              </div>

              <div className="services__appoinment">
                {/* Step 1 Content (with DatePicker and Slots) */}
                {currentStep === 1 && (
                  <div className="services__title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                      <img src="img/icons/services-icon.png" alt="" style={{ marginRight: "10px" }} />
                      {formattedDate}
                    </h4>
                    <div className="datepicker__item" style={{ display: "flex", alignItems: "center" }}>
                      <i
                        ref={iconRef}
                        className="fa fa-calendar datepicker-icon"
                        onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
                      />
                      <h5 style={{ marginRight: "10px" }}>Select Date</h5>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="datepicker__item">
                    <div className="date-picker-container">
                      {isDatePickerVisible && (
                        <DatePicker
                          ref={datePickerRef}
                          selected={startDate}
                          onChange={handleDateChange} 
                          dateFormat="MM/dd/yyyy"
                          placeholderText="Select a date"
                          inline
                        />
                      )}
                    </div>

                    {/* Check if Doctor is Available */}
                    {isDoctorAvailable ? (
                      doctorAvailability && (
                        <div className="time-slots-wrapper overflow-auto" style={{ maxHeight: "300px" }}>
                          {/* Session 1 */}
                          <div className="time-slots-container">
                            <h5>Session 1: {formatSessionTime(doctorAvailability.startTime, "12:30")}</h5>
                            <div className="time-slot-list">
                              {generateSessionsFromAvailability(
                                doctorAvailability.startTime,
                                doctorAvailability.endTime
                              ).session1Slots.map((slot, index) => (
                                <button
                                  key={index}
                                  className={`time-slot-btn ${
                                    selectedTimeSlot === slot ? "selected" : ""
                                  }`}
                                  onClick={() => handleTimeSlotClick(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Session 2 */}
                          <div className="time-slots-container">
                            <h5>Session 2: {formatSessionTime("14:00", doctorAvailability.endTime)}</h5>
                            <div className="time-slot-list">
                              {generateSessionsFromAvailability(
                                doctorAvailability.startTime,
                                doctorAvailability.endTime
                              ).session2Slots.map((slot, index) => (
                                <button
                                  key={index}
                                  className={`time-slot-btn ${
                                    selectedTimeSlot === slot ? "selected" : ""
                                  }`}
                                  onClick={() => handleTimeSlotClick(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                      
                    ) : (
                      <div className="no-availability">
                        <h5>Doctor is not available on the selected date.</h5>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Patient Details */}
                {currentStep === 2 && (
                  <PatientDetailsForm
                    formattedDate={formattedDate}
                    selectedTimeSlot={selectedTimeSlot}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    handlePatientDetailsChange={(ppp)=>{handlePatientDetailsChange(ppp)}}
                    doctorId={doctorId}
                    fees={fees}
                  />
                )}

                {/* Step 3: Summary */}
                {currentStep === 3 && (
                  <Summary
                    formattedDate={formattedDate}
                    selectedTimeSlot={selectedTimeSlot}
                    handlePrevious={handlePrevious}
                    patientDetails={patientDetails}
                    fees={fees}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default AppointmentForm;
