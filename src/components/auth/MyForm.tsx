import React, { useState } from 'react';
import CircleText from '../CircleText';
import SubTitle from '../SubTitle';
import { NavLink } from 'react-router-dom';
import Form from '../Form';
import { useUserStore } from '@/stores/auth';

interface LoginFormState {
  email: string;
  password: string;
}

function LoginForm() {
  // const { user, setUser } = useContext(AuthContext);
  const { user, setUser } = useUserStore();

  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Halo berikut data saya`, formState);
    setUser(formState);
  };
  const formInputs = [
    { label: 'email', type: 'email', name: 'email', id: 'email', placeholder: 'Email/Username', value: formState.email, change: handleChange },
    { label: 'password', type: 'password', name: 'password', id: 'password', placeholder: 'Password', value: formState.password, change: handleChange },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Login to Circle" />
      <Form showDate={false} title="login" inputs={formInputs} change={handleChange} submit={handleSubmit} buttonText="Login" forgotPassword="Forgot password?" />
      <p className="text-gray-100 pt-3">
        Don't have an account yet?{' '}
        <NavLink to={'/register'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Create account
        </NavLink>
      </p>
    </div>
  );
}

export default LoginForm;
