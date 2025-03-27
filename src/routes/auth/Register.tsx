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
    { label: 'fullName', type: 'text', name: 'fullName', id: 'id', placeholder: 'Full Name' },
    { label: 'email', type: 'email', name: 'email', id: 'id', placeholder: 'Email' },
    { label: 'password', type: 'password', name: 'password', id: 'id', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Create account Circle" />
      <Form title="login" inputs={formInputs} submit={handleSubmit} buttonText="Register" />
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
