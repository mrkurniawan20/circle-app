import { MessageSquareText } from 'lucide-react';
import React, { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface ThreadsLike {
  likeCount: string | number;
  likedCount: string | number;
  replyCount: string | number;
}

function ThreadLike({ likedCount, likeCount, replyCount }: ThreadsLike) {
  const [like, setLike] = useState<boolean>(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // e.preventDefault();
    setLike(!like);
  };
  return (
    <div className="flex items-center gap-4 ml-15 pb-5">
      <button onClick={toggleLike} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
        {like ? (
          <>
            <GoHeartFill className="text-red-700 size-6" />
            <span className="text-gray-50">{likedCount}</span>
          </>
        ) : (
          <>
            <GoHeart className=" size-6" />
            <span>{likeCount}</span>
          </>
        )}
      </button>
      <div className="flex gap-2">
        <MessageSquareText className="text-slate-400 size-6" />
        <p className="text-slate-400">{replyCount} Replies</p>
      </div>
    </div>
  );
}

export default ThreadLike;
