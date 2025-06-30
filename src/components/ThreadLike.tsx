import axios from 'axios';
import { MessageSquareText } from 'lucide-react';
import React, { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface ThreadsLike {
  likeCount: string | number;
  replyCount: string | number;
  isLiked: boolean;
  id: number;
}

export function ThreadLike({ likeCount, replyCount, isLiked, id }: ThreadsLike) {
  const [like, setLike] = useState<boolean>(isLiked);
  const [likes, setLikes] = useState<number>(Number(likeCount));
  const token = localStorage.getItem('token');
  function likeTweet(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      axios.get(`http://localhost:3320/post/liketweet/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLike(true);
      setLikes((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }
  function unlikeTweet(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      axios.get(`http://localhost:3320/post/unliketweet/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLike(false);
      setLikes((prev) => prev - 1);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center gap-4 pb-5">
      {like ? (
        <button onClick={unlikeTweet} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
          <GoHeartFill className="text-red-400 size-6" />
          <span className="text-gray-50">{likes}</span>
        </button>
      ) : (
        <button onClick={likeTweet} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
          <GoHeart className=" size-6" />
          <span>{likes}</span>
        </button>
      )}
      <div className="flex gap-2">
        <MessageSquareText className="text-slate-400 size-6" />
        <p className="text-slate-400">{replyCount} Replies</p>
      </div>
    </div>
  );
}
