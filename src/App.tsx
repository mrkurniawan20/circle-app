import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import CircleText from './components/CircleText';
import SubTitle from './components/SubTitle';
import Form from './components/Form';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  // const handleSubmit = (data: Record<string, string>) => {
  //   console.log(`Form Data: ${data}`);
  // };
  // const formInputs = [
  //   { label: 'username', type: 'text', name: 'username', placeholder: 'username' },
  //   { label: 'username', type: 'text', name: 'username', placeholder: 'username' },
  // ];
  return (
    <>
      {/* <CircleText />
      <SubTitle subTitle="Create account Circle" />
      <Form title="login" inputs={formInputs} onSubmit={handleSubmit} /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
