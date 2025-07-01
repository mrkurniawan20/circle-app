import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import axios from 'axios';

export function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) localStorage.removeItem('token');
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError('');
  };

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await api.post(`/user/loginUser`, formData);
      const token = res.data.loggedInUser.token;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }
  const formInputs = [
    { label: 'username', change: handleChange, value: formData.username, type: 'username', name: 'username', id: 'username', placeholder: 'Username' },
    { label: 'password', change: handleChange, value: formData.password, type: 'password', name: 'password', id: 'password', placeholder: 'Password' },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Login to Circle" />
      {error !== '' && <p className="text-center bg-red-500 text-white text-sm p-2 my-5 rounded-md">{error}</p>}
      <Form title="login" inputs={formInputs} change={handleChange} submit={handleSubmit} buttonText={loading ? <Loader2 className="h-10 w-10 animate-spin text-gray-500" /> : 'Login'} forgotPassword="Forgot password?" showDate={false} />
      <p className="text-gray-100 pt-3">
        Don't have an account yet?{' '}
        <NavLink to={'/register'} className={({ isActive }) => `rounded ${isActive ? 'text-blue-500 font-bold' : 'text-green-500'} hover:text-green-800 transition-all`}>
          Create account
        </NavLink>
      </p>
    </div>
  );
}
