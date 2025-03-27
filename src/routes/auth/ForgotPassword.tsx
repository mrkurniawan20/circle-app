import React from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log(`Form Data: ${data}`);
  };
  const formInputs = [{ label: 'email', type: 'email', name: 'email', id: 'id', placeholder: 'Email/Username' }];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Forgot password" />
      <Form title="login" inputs={formInputs} submit={handleSubmit} buttonText="Send Instruction" />
      <p className="text-gray-100 pt-2">
        Already have an account?{' '}
        <NavLink to={'/register'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Login
        </NavLink>
      </p>
    </div>
  );
}

export default ForgotPassword;
