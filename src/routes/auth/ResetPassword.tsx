import '@/App.css';
import CircleText from '@/components/CircleText';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';

function ResetPassword() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log(`Form Data: ${data}`);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.name}: ${e.target.value}`);
  };

  const formInputs = [
    {
      label: 'password',
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'New Password',
      change: handleChange,
    },
    {
      label: 'confirmPassword',
      type: 'password', // ← this should not be `confirmPassword`, just `password`
      name: 'confirmPassword',
      id: 'confirmPassword',
      placeholder: 'Confirm New Password',
      change: handleChange,
    },
  ];
  return (
    <div className="flex flex-col mx-auto w-fit pt-20">
      <CircleText textSize="text-3xl" />
      <SubTitle subTitle="Reset your password" />
      <Form showDate={false} title="login" inputs={formInputs} submit={handleSubmit} buttonText="Create New Password" />
    </div>
  );
}

export default ResetPassword;
