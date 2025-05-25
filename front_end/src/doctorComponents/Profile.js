// Profile.jsx
import React, { useEffect, useState } from 'react'; 
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    educationQualification: '',
    yearOfPassing: '',
    university: '',
    specialization: '',
    medicalCouncilNumber: '',
    yearsOfExperience: '',
    placesWorked: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        const birthDate = new Date(parsedUser.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        parsedUser.age = age;
      }

      setUser(parsedUser);
      setFormData({
        educationQualification: parsedUser.educationQualification || '',
        yearOfPassing: parsedUser.yearOfPassing || '',
        university: parsedUser.university || '',
        specialization: parsedUser.specialization || '',
        medicalCouncilNumber: parsedUser.medicalCouncilNumber || '',
        yearsOfExperience: parsedUser.yearsOfExperience || '',
        placesWorked: parsedUser.placesWorked || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://first-care.onrender.com/register/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, aadharNumber: user.aadharNumber, role: 'doctor' })
      });

      const data = await response.json();
      if (response.ok) {
        alert('User details updated successfully');
        localStorage.setItem('loggedInUser', JSON.stringify(data.data));
        setUser(data.data);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      alert('Error updating user details');
      console.error(error);
    }
  };

  return (
    <div className="profile-details-wrapper">
      <div className="back-button-container">
        <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate('/home')}>
          Back
        </Button>
      </div>
      <h2 className="headers">My Profile</h2>
      <div className="content-section">
        <div className="left-panel">
          {user && (
            <>
              <img
                src={user.image ? `https://first-care.onrender.com/${user.image.replace(/\\/g, '/')}` : '/default-user.png'}
                alt="User"
                className="user-photo"
              />
              <p className="user-info">Dr. {`${user.firstName} ${user.phone} ${user.email}`}</p>
            </>
          )}
        </div>
        <div className="details-right">
          <table className="details-table">
            <tbody>
              <tr><td>Education Qualification</td><td><input type="text" name="educationQualification" value={formData.educationQualification} onChange={handleChange} /></td></tr>
              <tr><td>Year of Passing</td><td><input type="text" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} /></td></tr>
              <tr><td>University</td><td><input type="text" name="university" value={formData.university} onChange={handleChange} /></td></tr>
              <tr><td>Specialization</td><td><input type="text" name="specialization" value={formData.specialization} onChange={handleChange} /></td></tr>
              <tr><td>Medical Council Number</td><td><input type="text" name="medicalCouncilNumber" value={formData.medicalCouncilNumber} onChange={handleChange} /></td></tr>
              <tr><td>Years of Experience</td><td><input type="text" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} /></td></tr>
              <tr><td>Places Worked</td><td><input type="text" name="placesWorked" value={formData.placesWorked} onChange={handleChange} /></td></tr>
            </tbody>
          </table>
          <div className="update-button-container">
            <button onClick={handleSubmit} className="submit-button">Update Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
