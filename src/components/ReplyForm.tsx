// ReplyForm.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import type { User } from '@/utils/useUser';

interface ReplyFormProps {
  loggedInUser: User;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ loggedInUser }) => {
  return (
    <form action="" className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5 bg-gray-800">
      <Avatar className="size-10">
        <AvatarImage src={`${loggedInUser.avatar}`} alt={loggedInUser.username} className="size-10 p-0 object-cover" />
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>

      <Textarea className="ml-2 resize-none w-xl max-w-xl border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder={`${loggedInUser.name}`} />

      <label htmlFor="add-image">
        <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
      </label>
      <input type="file" name="add-image" id="add-image" className="hidden" />

      <Button variant="circle" className="justify-self-end">
        Reply
      </Button>
    </form>
  );
};

export default ReplyForm;
