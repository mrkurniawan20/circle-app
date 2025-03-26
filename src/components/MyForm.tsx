import { AuthContext } from '@/assets/contexts/auth';
import React, { useContext, useState } from 'react';

interface MyFormState {
  username: string;
  phone: string;
  email: string;
}

function MyForm() {
  const { user, setUser } = useContext(AuthContext);

  const [formState, setFormState] = useState<MyFormState>({
    username: '',
    email: '',
    phone: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Halo berikut data saya`, formState);
    setUser(formState);
    // alert(`Hello, my name is ${formState.username}\nmy age is ${formState.age}`);
  };
  return (
    <form action="" className="my-form" onSubmit={handleSubmit}>
      <input className="border-2 p-2 rounded-md border-gray-600" onChange={handleChange} type="text" name="username" id="username" placeholder="username" />
      <input className="border-2 p-2 rounded-md border-gray-600" onChange={handleChange} type="email" name="email" id="email" placeholder="email" />
      <input className="border-2 p-2 rounded-md border-gray-600" onChange={handleChange} type="tel" name="phone" id="phone" placeholder="phone" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
