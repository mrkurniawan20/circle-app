import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { NavLink } from 'react-router-dom';
import { replies } from '@/stores/replies';
import ThreadList from '../../components/ThreadList';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { ImagePlus, MessageSquareText } from 'lucide-react';
import ThreadLike from '@/components/ThreadLike';

const likes = {
  likeCount: '20',
  likedCount: '21',
};

function ContentPage({ showNavLink = true }: { showNavLink?: boolean }) {
  const [like, setLike] = useState<boolean>(false);

  const toggleLike = () => {
    setLike(!like);
  };
  return (
    <div>
      {showNavLink && (
        <div className="inline-flex">
          <NavLink to={'/home'} className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
              <img src="./src/assets/img/back.png" className="invert w-6 h-6" alt="" />
              <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
            </div>
          </NavLink>
        </div>
      )}

      <div className="flex p-5">
        <Avatar className="my-auto">
          <AvatarImage src="./src/assets/img/rainbow.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-block pl-5">
          <h2 className="text-gray-50">Blackmore</h2>
          <p className="text-slate-400">@CatchTheRainbow</p>
        </div>
      </div>
      <div className="pl-5 pb-2 ">
        <p className="text-gray-100">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptates totam saepe accusantium officiis reprehenderit dignissimos debitis tenetur, deleniti error magni culpa incidunt molestiae? Nam repudiandae deserunt
          corrupti nesciunt cum!
        </p>
      </div>
      <div className="flex pl-5 pb-2">
        <p className="text-slate-400">11:32 PM • March 24, 2025</p>
      </div>
      {/* <div className="flex items-center gap-4 pl-5 pb-5">
        <button onClick={toggleLike} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
          {like ? (
            <>
              <GoHeartFill className="text-red-700 size-6" />
              <span className="text-gray-50">{likes.likedCount}</span>
            </>
          ) : (
            <>
              <GoHeart className=" size-6" />
              <span>{likes.likeCount}</span>
            </>
          )}
        </button>
        <div className="flex gap-2">
          <MessageSquareText className="text-slate-400 size-6" />
          <p className="text-slate-400">{replies.length} Replies</p>
        </div>
      </div> */}
      <div className="-ml-10">
        <ThreadLike likeCount={likes.likeCount} likedCount={likes.likedCount} replyCount={replies.length} />
      </div>

      <form action="" className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5">
        <Avatar className="">
          <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder="Type your reply"></Textarea>
        <label htmlFor="add-image">
          <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 transform-all duration-200" />
        </label>
        <input type="file" name="add-image" id="add-image" className="hidden" />
        <Button variant="circle" className="justify-self-end ">
          Reply
        </Button>
      </form>
      {replies.map(() => (
        <ThreadList threadList={replies} />
      ))}
    </div>
  );
}

export default ContentPage;
