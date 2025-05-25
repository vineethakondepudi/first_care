import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      // setUser(JSON.parse(storedUser)); // Calculate age from dob
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
      console.log(parsedUser,30);
      

      setUser(parsedUser);
    }
  }, []);

  return (
    <div className="home-container">
     
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
            <p className="user-info">{`${user.firstName} ${user.lastName} ${user.age} ${user.gender}`}</p>
          </>
        )}
      </div>
<div className="right-panel">
  <div className="back-button-container">
    <Button
      type="primary"
      icon={<ArrowRightOutlined />}
      onClick={() => navigate('/')}
      style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
    >
      Back
    </Button>
  </div>

  <div className="home-title">{user?.role === 'doctor' ? 'Doctor Home Screen' : 'Patient Home Screen'}</div>

  <div className="button-grid">
    {user?.role === 'patient' && (
      <>
        <button className="btn btn-primary" onClick={() => navigate('/edit-details')}>Edit Details</button>
        <button className="btn btn-info" onClick={() => navigate('/medical-profile')}>Medical Profile</button>
        <button className="btn btn-calm" onClick={() => navigate('/medical-history')}>Medical History</button>
        <button className="btn btn-secondary" onClick={() => navigate('/favorites')}>Favorites</button>
        <button className="btn btn-success" onClick={() => navigate('/scheduled-appointments')}>Scheduled Appointments</button>
        <button className="btn btn-warning" onClick={() => navigate('/new-appointments')}>New Appointments</button>
        <button className="btn btn-danger" onClick={() => navigate('/buy-medicines')}>Buy Medicines</button>
        <button className="btn btn-light" onClick={() => navigate('/buy-products')}>Buy Products</button>
        <button className="btn btn-calm" onClick={() => navigate('/book-service')}>Book a Service</button>
      </>
    )}

    {user?.role === 'doctor' && (
      <>
        <button className="btn btn-primary" onClick={() => navigate('/my-profile')}>My Profile</button>
        <button className="btn btn-info" onClick={() => navigate('/my-earnings')}>My Earnings</button>
        <button className="btn btn-secondary" onClick={() => navigate('/my-clinic')}>My Clinic</button>
        <button className="btn btn-success" onClick={() => navigate('/schedule-appointments')}>Scheduled Appointments</button>
        <button className="btn btn-warning" onClick={() => navigate('/appointment-requests')}>Appointment Requests</button>
        <button className="btn btn-light" onClick={() => navigate('/my-patients')}>My Patients</button>
        <button className="btn btn-calm" onClick={() => navigate('/book-service')}>Book a Service</button>
        <button className="btn btn-danger" onClick={() => navigate('/mails-alerts')}>Mails/Alerts</button>
      </>
    )}

    {/* Add another block for DMP role if needed */}
    {user?.role === 'dmp' && (
      <>
        {/* Example: Add DMP-specific buttons here */}
        <button className="btn btn-primary" onClick={() => navigate('/dmp-dashboard')}>DMP Dashboard</button>
      </>
    )}
  </div>
</div>

    </div>
  );
};

export default Home;
