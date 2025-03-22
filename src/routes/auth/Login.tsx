import React from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink } from 'react-router-dom';

function Login() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log(`Form Data: ${data}`);
  };
  const formInputs = [
    { label: 'email', type: 'email', name: 'email', placeholder: 'Email/Username' },
    { label: 'password', type: 'password', name: 'password', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Login to Circle" />
      <Form title="login" inputs={formInputs} onSubmit={handleSubmit} buttonText="Login" forgotPassword="Forgot password?" />
      <p className="text-gray-300 pt-3">
        Don't have an account yet?{' '}
        <NavLink to={'/register'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Create account
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
