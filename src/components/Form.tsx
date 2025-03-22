import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

interface InputConfig {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}

interface FormProps {
  title: string;
  inputs: InputConfig[];
  onSubmit: (data: Record<string, string>) => void;
  buttonText: string;
  forgotPassword?: string;
}

function Form({ title, inputs, onSubmit, buttonText, forgotPassword }: FormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    inputs.forEach((input) => {
      data[input.name] = formData.get(input.name) as string;
    });
    onSubmit(data);
  };

  return (
    <form action="" className="flex flex-col">
      {inputs.map((input) => (
        <div key={input.name} className="pb-2">
          <input className="w-sm p-1.5 border-2 border-gray-600 rounded-sm  text-sm text-gray-300 focus:border-green-500 focus:outline-none transition-all" type={input.type} name={input.name} placeholder={input.placeholder} required />
        </div>
      ))}
      <NavLink to={'/forgot'} className="py-2 text-white ml-auto hover:text-green-500 transition-all">
        {forgotPassword}
      </NavLink>
      <Button variant="circle" className="rounded-full w-sm transition-all">
        {buttonText}
      </Button>
    </form>
  );
}

export default Form;
