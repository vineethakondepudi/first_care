import React, { useState } from "react";
import { Form, Input, Button, Steps, message, Select, Typography, Row, Col } from "antd";
import { useNavigate, Link } from 'react-router-dom';
import "./RegistrationForm.css";

const { Step } = Steps;
const { Title } = Typography;

const RegistrationForm = () => {

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    aadharNumber: "",
    spouseName: "",
    EmergencyContactNumber: "",
    height: "",
    weight: "",
    BloodGroup: "",
    role: "",
    educationQualification: "",
    yearOfPassing: "",
    university: "",
    specialization: "",
    registrationNumber: "",
    experienceYears: "",
    placesWorked: ""
  });
  const [imageFile, setImageFile] = useState(null);

  const steps = [
    { title: "Basic Details" },
    { title: "Personal Details" },
    ...(formData.role === "doctor" ? [{ title: "Education & Experience" }] : [])
  ];


  const handleNext = () => {
  const nextStep = currentStep + 1;
  if (formData.role !== "doctor" && nextStep > 1) return;
  setCurrentStep(nextStep);
};

  const handlePrev = () => setCurrentStep(currentStep - 1);

 const handleSubmit = async () => {
  if (!formData.role) {
    message.error("Please select a role.");
    return;
  }

  // Validation for required fields
  const requiredFields = ["firstName", "lastName", "dob", "gender", "phone", "email", "role", "address", "aadharNumber", "height", "weight", "BloodGroup"];
  
  if (formData.role === "doctor") {
    requiredFields.push("educationQualification", "yearOfPassing", "university", "specialization", "registrationNumber", "experienceYears", "placesWorked");
  }

  const missingFields = requiredFields.filter(field => !formData[field]);
  if (missingFields.length > 0) {
    message.error(`Please fill all required fields: ${missingFields.join(", ")}`);
    return;
  }

  try {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    const res = await fetch("https://first-care.onrender.com/register", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Server error");
    }

    message.success(data.message);
    navigate('/');
  } catch (err) {
    console.error("Error submitting form:", err);
    message.error(err.message || "Error submitting form");
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="registration-wrapper">
      <Row className="registration-row">
        <Col span={12} className="logo-section">
          <img src="/fclogo.png" alt="First Care Logo" className="login-logo" />
        </Col>

        <Col span={12} className="form-section">
          <div className="registration-container">
            <Title level={3}>Patient Registration</Title>
            <Steps current={currentStep} className="steps">
              {steps.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>

            <Form className="form-content">
              {currentStep === 0 && (
                <>
                  <Form.Item label="First Name">
                    <Input name="firstName" value={formData.firstName} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Last Name">
                    <Input name="lastName" value={formData.lastName} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="DOB">
                    <Input name="dob" type="date" value={formData.dob} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Gender">
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Phone Number">
                    <Input

                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/^(\+91)?/, ""),
                        })
                      }
                      maxLength={13}
                    />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Upload Image">
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                  </Form.Item>
                  <Form.Item label="Role">
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <Select.Option value="patient">Patient</Select.Option>
                      <Select.Option value="doctor">Doctor</Select.Option>
                      <Select.Option value="dmp">DMP</Select.Option>
                      <Select.Option value="management">Admin</Select.Option>
                    </Select>
                  </Form.Item>

                </>
              )}

              {currentStep === 1 && (
                <>
                  <Form.Item label="Address">
                    <Input name="address" value={formData.address} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Aadhar Number">
                    <Input name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Spouse Name">
                    <Input name="spouseName" value={formData.spouseName} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Emergency Contact Number">
                    <Input
                      name="EmergencyContactNumber"
                      value={formData.EmergencyContactNumber}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Height">
                    <Input name="height" value={formData.height} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Weight">
                    <Input name="weight" value={formData.weight} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Blood Group">
                    <Input name="BloodGroup" value={formData.BloodGroup} onChange={handleChange} />
                  </Form.Item>
                </>
              )}
              {currentStep === 2 && formData.role === "doctor" && (
                <>
                  <Form.Item label="Education Qualification">
                    <Input
                      name="educationQualification"
                      value={formData.educationQualification}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Year of Passing">
                    <Input
                      name="yearOfPassing"
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="University">
                    <Input
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Specialization">
                    <Input
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Medical Council Registration Number">
                    <Input
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Years of Experience">
                    <Input
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Places Worked">
                    <Input
                      name="placesWorked"
                      value={formData.placesWorked}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </>
              )}

              <div className="form-actions">
                {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </div>
              <Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <span>Already signed up? </span>
                  <Link to="/">Go to login</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
