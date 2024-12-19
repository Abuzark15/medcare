import axios from 'axios';


export const fetchTableData = async () => {
  try {
    const response = await axios.get('http://localhost:2449/api/admin/getrequest'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching table data', error);
    return { headers: [], data: [] };
  }
};

export const approvedRequest = async (id) => {
  try {
    const response = await fetch(`http://localhost:2449/api/admin/accept-request/${id}`, {
      method: 'POST', // or PUT depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve doctor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error approving doctor:', error);
    throw error;
  }
};