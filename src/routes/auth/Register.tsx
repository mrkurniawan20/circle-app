import React from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink } from 'react-router-dom';

function Register() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log(`Form Data: ${data}`);
  };
  const formInputs = [
    { label: 'fullName', type: 'text', name: 'fullName', placeholder: 'Full Name' },
    { label: 'email', type: 'email', name: 'email', placeholder: 'Email' },
    { label: 'password', type: 'password', name: 'password', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit mt-20">
      <CircleText />
      <SubTitle subTitle="Create account Circle" />
      <Form title="login" inputs={formInputs} onSubmit={handleSubmit} buttonText="Register" />
      <p className="text-gray-300 pt-3">
        Already have an account?{' '}
        <NavLink to={'/login'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Login
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
