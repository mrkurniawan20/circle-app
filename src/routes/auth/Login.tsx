import { AuthContext } from '@/assets/contexts/auth';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import { useUserStore } from '@/stores/auth';
import Form from '@/components/Form';
import axios from 'axios';
import { loggedInUser } from '@/stores/loggedInUser';
import { useForm } from 'react-hook-form';

interface LoginFormState {
  email: string;
  password: string;
}

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

  async function handleSubmit(event: React.FormEvent) {
    try {
      const res = await axios.post('http://127.0.0.1:3320/user/loginUser', formData);
      const token = res.data.loggedInUser.token;
      localStorage.setItem('token', token);
      // const user = res.data.loggedInUser.user;
      //user yang di-return semua key
      // localStorage.setItem('user', user);
      // useUser();
      // console.log(`user's name is ${user}`);

      // console.log(token);
    } catch (error) {
    } finally {
      navigate('/home');
    }
    // alert(`Hello, my name is ${formState.username}\nmy age is ${formState.age}`);
  }
  const formInputs = [
    { label: 'email', change: handleChange, value: formData.email, type: 'email', name: 'email', id: 'email', placeholder: 'Email/Username' },
    { label: 'password', change: handleChange, value: formData.password, type: 'password', name: 'password', id: 'password', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Login to Circle" />
      {/* <form action="" className="my-form" onSubmit={handleSubmit}>
        <input className="border-2 p-2 rounded-md border-gray-600" onChange={handleChange} type="email" name="email" id="email" placeholder="email" />
        <input className="border-2 p-2 rounded-md border-gray-600" onChange={handleChange} type="password" name="password" id="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form> */}
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
