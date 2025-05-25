import React, { useEffect, useState } from 'react';
import '../patienComponents/MedicalProfile.css';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const ConsultationRecords = () => {
   
  const navigate = useNavigate();
  const [user, setUser] = useState(null);





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

      <div className="medical-profile-header">Consultation Records - Patient Name</div>
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
               {/* Date Range Buttons */}
            
      <div style={{ marginBottom: 20 }}>
        <Space>
              <iframe
  src="https://meet.jit.si/DoctorPatientRoom123"
  allow="camera; microphone; fullscreen"
  width="100%"
  height="500px"
/>
          <Button type="primary" 
          style={{ backgroundColor: '#34d399', borderColor: '#34d399', marginBottom: 20, marginRight: 10  }}>Start</Button>
          <Button
            type="primary"
            danger
            style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', marginBottom: 20 }}
          >End</Button>
        </Space>
      </div>
        <div style={{ marginBottom: 20 }}>
        <Space>
          <p>Initial Assessment</p>
          <input
          />
          <Button type="primary" >OK</Button>
        </Space>
      </div>
            <div style={{ marginBottom: 20 }}>
        <Space>
          <p>Recommended Test</p>
          <input
          />
          <Button type="primary" >OK</Button>
        </Space>
      </div>
        <div style={{ marginBottom: 20 }}>
        <Space>
          <p>Medicine</p>
          <input
          />
          <Button type="primary" >OK</Button>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Space>
          <p>Medical Advise</p>
          <input
          />
          <Button type="primary" >OK</Button>
        </Space>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationRecords;

