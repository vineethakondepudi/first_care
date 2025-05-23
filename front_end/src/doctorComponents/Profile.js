import React, { useEffect, useState } from 'react'; 
import '../patienComponents/EditDetails.css';
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
    console.log(storedUser,20);
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Calculate age from dob
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
      console.log(parsedUser,41);
      
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
        body: JSON.stringify({ ...formData, aadharNumber: user.aadharNumber })
      });

      const data = await response.json();

      if (response.ok) {
        alert('User details updated successfully');
        localStorage.setItem('loggedInUser', JSON.stringify(data.data)); // Update localStorage
        setUser(data.data); // Refresh local state
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      alert('Error updating user details');
      console.error(error);
    }
  };

  return (
    <div className="edit-details-wrapper">
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
      <h2 className="header">My Profile</h2>

      <div className="content-section">
        {/* Left Side: Profile */}
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

        {/* Right Side: Form Table */}
        <div className="details-right">
          <table className="details-table">
            <tbody>
              <tr>
                <td>Education Qualification</td>
                <td><input type="text" name="phone" value={formData.educationQualification} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Year of Passing</td>
                <td><input type="text" name="address" value={formData.yearOfPassing} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>University</td>
                <td><input type="email" name="email" value={formData.university} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Specialization</td>
                <td><input type="text" name="spouseName" value={formData.specialization} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Medical Council Registration Number</td>
                <td><input type="text" name="spouseName" value={formData.medicalCouncilNumber} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Years 0f Experience</td>
                <td><input type="text" name="EmergencyContactNumber" value={formData.yearsOfExperience} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Places Worked</td>
                <td><input type="text" name="EmergencyContactNumber" value={formData.placesWorked} onChange={handleChange} /></td>
              </tr>
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
