import React from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink } from 'react-router-dom';

function ResetPassword() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log(`Form Data: ${data}`);
  };
  const formInputs = [
    { label: 'password', type: 'password', name: 'password', placeholder: 'New Password' },
    { label: 'confirmPassword', type: 'confirmPassword', name: 'confirmPassword', placeholder: 'Confirm New Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Reset your password" />
      <Form title="login" inputs={formInputs} onSubmit={handleSubmit} buttonText="Create New Password" />
    </div>
  );
}

export default ResetPassword;
