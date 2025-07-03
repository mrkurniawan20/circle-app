import { useState } from 'react';
import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { api } from '@/services/api';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    // dateOfBirth: '2000-02-20T15:00:00+07:00',
  });
  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  }
  const formInputs = [
    { label: 'name', change: handleChange, value: formData.name, type: 'text', name: 'name', id: 'name', placeholder: 'Full Name' },
    { label: 'username', change: handleChange, value: formData.username, type: 'text', name: 'username', id: 'username', placeholder: 'Username' },
    { label: 'email', change: handleChange, value: formData.email, type: 'email', name: 'email', id: 'email', placeholder: 'Email' },
    { label: 'password', change: handleChange, value: formData.password, type: 'password', name: 'password', id: 'password', placeholder: 'Password' },
  ];

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post(`/user/registerUser`, formData);
      navigate('/login');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || error.response?.data.error;
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Create account Circle" />
      {error !== '' && <p className="text-center bg-red-500 text-white text-sm p-2 my-5 rounded-md">{error}</p>}
      <Form title="login" inputs={formInputs} submit={handleSubmit} buttonText={loading ? <Loader2 className="h-10 w-10 animate-spin text-gray-500" /> : 'Register'} />

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
