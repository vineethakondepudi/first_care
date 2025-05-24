import React, { useEffect, useState } from 'react';
import '../patienComponents/MedicalProfile.css';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const Earnings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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
      .then(data => {
        setRecords(data);
        setFilteredRecords(data);
      })
      .catch(err => console.error('Error fetching records:', err));
  }, []);

  const handleFilter = () => {
    if (fromDate && toDate) {
      const filtered = records.filter(record => {
        const recordDate = dayjs(record.date);
        return recordDate.isAfter(dayjs(fromDate).subtract(1, 'day')) &&
               recordDate.isBefore(dayjs(toDate).add(1, 'day'));
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records); // No date filter
    }
  };

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

      {/* Date Range Buttons */}
      <div style={{ marginBottom: 20 }}>
        <Space>
          <DatePicker
            placeholder="From"
            onChange={(date) => setFromDate(date)}
            style={{ width: 150 }}
          />
          <DatePicker
            placeholder="To"
            onChange={(date) => setToDate(date)}
            style={{ width: 150 }}
          />
          <Button type="primary" onClick={handleFilter}>OK</Button>
        </Space>
      </div>

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
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>₹{record.amount}</td>
                    <td>{record.records.join(', ')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No records found</td>
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
