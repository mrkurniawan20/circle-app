import { useState } from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '2000-02-20T15:00:00+07:00',
  });
  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  }
  const formInputs = [
    { label: 'name', change: handleChange, value: formData.name, type: 'text', name: 'name', id: 'name', placeholder: 'Full Name' },
    { label: 'username', change: handleChange, value: formData.username, type: 'text', name: 'username', id: 'username', placeholder: 'Username' },
    { label: 'email', change: handleChange, value: formData.email, type: 'email', name: 'email', id: 'email', placeholder: 'Email' },
    { label: 'password', change: handleChange, value: formData.password, type: 'password', name: 'password', id: 'password', placeholder: 'Password' },
  ];

  async function handleSubmit() {
    try {
      console.log(formData.dateOfBirth);
      const response = await axios.post('https://circle-backend-ecru.vercel.app/user/registerUser', formData);
      navigate('/login');
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Create account Circle" />
      <Form title="login" inputs={formInputs} submit={handleSubmit} buttonText="Register" showDate={true} />
      <p className="text-gray-100 pt-3">
        Already have an account?{' '}
        <NavLink to={'/login'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Login
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
