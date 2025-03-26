import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

interface InputConfig {
  type: string;
  name: string;
  label: string;
  id: string;
  placeholder?: string;
}

interface FormProps {
  title: string;
  inputs: InputConfig[];
  // onSubmit: (data: Record<string, string>) => void;
  submit?: any;
  change?: any;
  buttonText: string;
  forgotPassword?: string;
  actions?: string;
}

function Form({ title, inputs, submit, change, buttonText, forgotPassword, actions }: FormProps) {
  return (
    <form action={`${actions}`} onSubmit={submit} onChange={change} className="flex flex-col">
      {inputs.map((input) => (
        <div key={input.name} className="pb-2">
          <input
            className="w-sm px-1.5 py-2.5 border-2 border-gray-600 rounded-sm  text-sm text-gray-100 focus:border-green-500 focus:outline-none transition-all"
            type={input.type}
            name={input.name}
            id={input.id}
            placeholder={input.placeholder}
            required
          />
        </div>
      ))}
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
