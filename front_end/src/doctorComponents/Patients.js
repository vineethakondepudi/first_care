import React, { useEffect, useState } from 'react';
import '../patienComponents/MedicalProfile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Patients = () => {

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
            <div className="medical-profile-header">Medical Profile</div>

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
                            <p className="user-info">Dr.{`${user.firstName} ${user.phone} ${user.email}`}</p>
                        </>
                    )}
                </div>
                {/* Right: Description and Table */}
                <div className="profile-right">

                    <table className="medical-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Patient Summery</th>
                                <th>Records/Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                 <td></td>
                                  <td></td>
                                <td></td>
                                </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Patients;
