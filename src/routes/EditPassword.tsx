import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { useUser } from '@/utils/useUser';
import { api } from '@/services/api';

const EditPassword = () => {
  const token = localStorage.getItem('token');
  const [showNew, setShowNew] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const [formData, setFormData] = useState<{ password: string }>({
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsEditing(true);
      const data = new FormData();
      if (formData.password) data.append('password', formData.password);
      await api.patch(`/user/editprofile/${user.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`Password changed successfully!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#213547' }}>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[213547] rounded-2xl  p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <Lock className="text-green-500" />
          <h2 className="text-2xl font-semibold text-white">Edit Password</h2>
        </div>

        {message && <p className="text-sm text-green-400 text-center">{message}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">New Password</label>
          <div className="relative">
            <input
              name="password"
              id="password"
              type={showNew ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#1e2d3d] text-white border border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200">
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all">
          {isEditing ? <Loader2 className="h-8 w-8 animate-spin text-gray-500 mx-auto" /> : `Save Password`}
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
