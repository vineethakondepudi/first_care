import React, { useEffect, useState } from 'react';
import '../patienComponents/MedicalProfile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Earnings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        const birthDate = new Date(parsedUser.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        parsedUser.age = age;
      }
      setUser(parsedUser);
    }

    // Fetch earnings records
    fetch('https://first-care.onrender.com/patient-records')
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error('Error fetching records:', err));
  }, []);

  return (
    <div className="medical-profile-container">
      <div className="back-button-container">
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate('/home')}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Back
        </Button>
      </div>
      <div className="medical-profile-header">My Earnings</div>

      <div className="medical-profile-content">
        {/* Left: Image and Name */}
        <div className="left-panel">
          {user && (
            <>
              <img
                src={
                  user.image
                    ? `https://first-care.onrender.com/${user.image.replace(/\\/g, '/')}`
                    : '/default-user.png'
                }
                alt="User"
                className="user-photo"
              />
              <p className="user-info">Dr. {`${user.firstName} ${user.phone} ${user.email}`}</p>
            </>
          )}
        </div>

        {/* Right: Earnings Table */}
        <div className="profile-right">
          <table className="medical-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map(record => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>₹{record.amount}</td>
                    <td>{record.records.join(', ')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No records available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
