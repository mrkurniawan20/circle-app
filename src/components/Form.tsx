import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface InputConfig {
  type: string;
  name: string;
  value?: string;
  label: string;
  id: string;
  change(e: any): void;
  placeholder?: string;
}

interface FormProps {
  title: string;
  inputs: InputConfig[];
  submit?: any;
  change?: any;
  buttonText: string;
  forgotPassword?: string;
  actions?: string;
  showDate: boolean;
}

function Form({ inputs, submit, buttonText, forgotPassword, actions, showDate }: FormProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form action={`${actions}`} onSubmit={handleSubmit(submit)} className="flex flex-col" method="POST" encType="multipart/form-data">
      {inputs.map((input, index) => (
        <div key={index} className="pb-2">
          <input
            className="w-sm px-1.5 py-2.5 border-2 border-gray-600 rounded-sm  text-sm text-gray-100 focus:border-green-500 focus:outline-none transition-all"
            {...register(`${input.name}`)}
            type={input.type}
            id={input.id}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.change}
            required
          />
        </div>
      ))}
      {showDate && (
        <div>
          <input name="dateOfBirth" id="dateOfBirth" type="date" className="w-sm px-1.5 py-2.5 border-2 border-gray-600 rounded-sm  text-sm text-gray-100 focus:border-green-500 focus:outline-none transition-all" />
        </div>
      )}
      <NavLink to={'/forgot'} className="py-2 text-gray-100 ml-auto hover:text-green-800 transition-all">
        {forgotPassword}
      </NavLink>
      <Button variant="circle" className="w-sm transition-all p-5" type="submit">
        {buttonText}
      </Button>
    </form>
  );
}

export default Form;
