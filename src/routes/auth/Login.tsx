import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import axios from 'axios';

export function LoginForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit() {
    try {
      const res = await axios.post('http://localhost:3320/user/loginUser', formData);
      const token = res.data.loggedInUser.token;
      localStorage.setItem('token', token);
    } catch (error) {
    } finally {
      navigate('/home');
    }
  }
  const formInputs = [
    { label: 'email', change: handleChange, value: formData.email, type: 'email', name: 'email', id: 'email', placeholder: 'Email/Username' },
    { label: 'password', change: handleChange, value: formData.password, type: 'password', name: 'password', id: 'password', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Login to Circle" />

      <Form title="login" inputs={formInputs} change={handleChange} submit={handleSubmit} buttonText="Login" forgotPassword="Forgot password?" showDate={false} />
      <p className="text-gray-100 pt-3">
        Don't have an account yet?{' '}
        <NavLink to={'/register'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Create account
        </NavLink>
      </p>
    </div>
  );
}
