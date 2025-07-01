import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { api } from '@/services/api';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

function ForgotPassword() {
  const [forgotLoading, setForgotLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<{ email: string }>({ email: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  }
  async function handleSubmit(e: React.FormEvent) {
    console.log(e);
    try {
      setForgotLoading(true);
      const res = await api.post('/user/forgotpassword', formData);
      setSuccess(res.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    } finally {
      setForgotLoading(false);
    }
  }
  const formInputs = [{ change: handleChange, label: 'email', type: 'email', name: 'email', id: 'id', placeholder: 'Email/Username' }];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Forgot password" />
      {error !== '' && <p className="text-center bg-red-500 text-white text-sm p-2 my-5 rounded-md">{error}</p>}
      {success !== '' && <div className="text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-3 my-5 w-full text-center">{success}</div>}
      <Form title="forgot" inputs={formInputs} submit={handleSubmit} buttonText={forgotLoading ? <Loader2 className="h-10 w-10 animate-spin text-gray-500" /> : 'Send Instruction'} showDate={false} />
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
