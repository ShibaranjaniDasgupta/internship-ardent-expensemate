import { Form, message } from 'antd';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components1/Spinner';
import MoneyImage from '../assets/money.jpg';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', values);
      localStorage.setItem('expense-app', JSON.stringify({ ...response.data, password: '' }));
      setLoading(false);
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      message.error('Login failed');
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const googleResponse = await axios.post('/api/users/google-login', { credential });
      localStorage.setItem('expense-app', JSON.stringify({ ...googleResponse.data, password: '' }));
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      message.error('Google login failed');
    }
  };

  return (
    <div
      style={{
        background: '#0a192f',
        display: 'flex',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        width: '500px',
        height: '85vh',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {loading && <Spinner />}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
        <img src={MoneyImage} alt="money_app" style={{ width: '250px', height: 'auto' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <h1 style={{ textAlign: 'center', color: '#fff' }}>LOGIN</h1>
          <hr />
          <Form.Item label="Email" name="email" label={<span style={{ color: '#64ffda' }}>Email</span>}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" label={<span style={{ color: '#64ffda' }}>Password</span>}>
            <Input type="password" />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/register" style={{ color: '#64ffda' }}>Not registered yet? Click here to register</Link>
            <button
              type="submit"
              style={{
                backgroundColor: '#64ffda',
                color: '#020c1b',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              LOGIN
            </button>
          </div>
        </Form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => message.error('Google login failed')}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
