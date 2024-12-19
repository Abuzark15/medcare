import React, { useEffect, useState } from 'react';
import ResponsiveTable from '../component/ResponsiveTable';
import { fetchTableData, approvedRequest } from '../services/AdminService'; 
import DetailsForm from '../component/DetailsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye } from '@fortawesome/free-solid-svg-icons';

function DoctorRequest() {
  const [tableData, setTableData] = useState({ headers: [], data: [] });
  const [selectedDoctor, setSelectedDoctor] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTableData();

      if (response && response.doctorsWithUser) {
        const data = response.doctorsWithUser;

        const columns = [
          { Header: 'Name', accessor: 'User.name' },
          { Header: 'Specialization', accessor: 'specialization' },
          { Header: 'Qualifications', accessor: 'qualifications' },
          { Header: 'Experience', accessor: 'experience' },
          { Header: 'Approved', accessor: 'isApproved' },
          { 
            Header: 'Actions', 
            accessor: 'action', 
            Cell: ({ row }) => (
              <FontAwesomeIcon 
                icon={faEye} 
                className="view-icon" 
                onClick={() => handleView(row)} 
              />
            ),
          },
        ];

        setTableData({ headers: columns, data: data });
      } else {
        setError("No data found.");
      }
    } catch (error) {
      console.error('Error fetching table data', error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (row) => {
    setSelectedDoctor(row.original);
  };

  const handleCloseForm = () => {
    setSelectedDoctor(null);
  };

  const handleAccept = async (id) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Accepted doctor with ID:', id);

      const response = await approvedRequest(id); // Pass the id to the approvedRequest function

      if (response.success) {
        // Handle successful acceptance (optional)
        alert("Doctor accepted successfully!");
        getData(); // Refresh the table data after action
      } else {
        setError("Failed to accept doctor.");
      }
    } catch (error) {
      console.error('Error accepting doctor:', error);
      setError("Error occurred while accepting doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (id) => {
    console.log('Rejected doctor with ID:', id);
    // Handle reject logic here
  };

  if (loading) {
    return <div className="loading-state"><p>Loading data...</p></div>;
  }

  if (error) {
    return <div className="error-state"><p>{error}</p></div>;
  }

  return (
    <>
      {selectedDoctor && (
        <DetailsForm 
          doctor={selectedDoctor} 
          onClose={handleCloseForm} 
          onAccept={handleAccept} 
          onReject={handleReject} 
        />
      )}

      {!selectedDoctor && (
        <ResponsiveTable 
          columns={tableData.headers} 
          data={tableData.data} 
        />
      )}
    </>
  );
}

export default DoctorRequest;
