import React from 'react';
import { RiChatNewLine } from "react-icons/ri";
import { Link } from 'react-router-dom';  
import './UserList.css';

const UserList = ({ appointments }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'label-warning';
      case 'Accepted':
        return 'label-success';
      case 'Completed':
        return 'label-success';
      case 'Rejected':
        return 'label-danger';
      default:
        return 'label-default';
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="main-box clearfix">
            <div className="table-responsive">
              <table className="table user-list">
                <thead>
                  <tr>
                    <th><span>Patient</span></th>
                    <th><span>Doctor</span></th>
                    <th><span>Date</span></th>
                    <th><span>TimeSlot</span></th>
                    <th className="text-center"><span>Status</span></th>
                    <th><span>Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.patientname}</td>
                      <td>Dr. {appointment.Doctor.User.name} ({appointment.Doctor.specialization})</td>
                      <td>{new Date(appointment.date).toLocaleString()}</td>
                      <td>{appointment.timeSlot}</td>
                      <td className="text-center">
                        <span className={`label ${getStatusClass(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td style={{ width: '20%' }}>
                        <a href="#" className="table-link">
                          <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-eye fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
 
                        {appointment.status === 'Accepted' ? (
                          <Link to={`/inbox?id=${appointment.doctorId}`} className="table-link">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa-stack-1x fa-inverse"><RiChatNewLine /></i>
                            </span>
                          </Link>
                        ) : (
                          <a href="#" className="table-link" style={{ pointerEvents: 'none', opacity: 0.5 }}>
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x"></i>
                              <i className="fa-stack-1x fa-inverse"><RiChatNewLine /></i>
                            </span>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
