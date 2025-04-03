import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import ThreadList from '../../components/ThreadList';
import { threads } from '@/stores/threads';
import { ImagePlus } from 'lucide-react';
import { loggedInUser } from '@/stores/loggedInUser';

function ContentHome() {
  return (
    <div>
      <h2 className="text-2xl p-10 pb-0 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex gap-5 p-10 border-b-1 border-gray-500">
        <Avatar className="size-12">
          <AvatarImage src={`./src/assets/img/${loggedInUser[0].avatar}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="flex-col">
          <Textarea
            className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base placeholder:text-lg placeholder:font-semibold"
            placeholder="What is happening?"
          ></Textarea>
        </div>
        <label htmlFor="add-image">
          <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
        </label>
        <input type="file" name="add-image" id="add-image" className="hidden" />
        <Button variant="circle" className="justify-self-end ">
          Post
        </Button>
      </form>
      <ThreadList threadList={threads} />
    </div>
  );
}

export default ContentHome;
