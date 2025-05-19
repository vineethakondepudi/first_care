import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const response = await fetch('https://first-care.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadharNumber: values.aadhar,
          phone: values.mobile,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        navigate('/home');
      } else {
        message.error(data.message || 'Invalid Aadhaar or mobile number');
      }
    } catch (err) {
      console.error('Login error:', err);
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Row className="login-row">
        <Col span={12} className="logo-section">
          <img src="/fclogo.png" alt="First Care Logo" className="login-logo" />
        </Col>

        <Col span={12} className="form-section">
          <Title level={4}>Patient Log In</Title>
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="aadhar"
              rules={[{ required: true, message: 'Please enter your Aadhar ID' }]}
            >
              <Input placeholder="User ID (Aadhar number)" />
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[{ required: true, message: 'Please enter your mobile number' }]}
            >
              <Input placeholder="Registered Mobile Number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>

            <Form.Item>
              <div style={{ textAlign: 'center' }}>
                <span>New user? </span>
                <Link to="/register">Go to Signup</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
