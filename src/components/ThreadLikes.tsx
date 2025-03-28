import React, { useState } from 'react';

import { GoHeart, GoHeartFill } from 'react-icons/go';

function ThreadLikes() {
  const [like, setLike] = useState<boolean>(false);

  const toggleLike = () => {
    setLike(!like);
  };
  return (
    <div>
      <button onClick={toggleLike} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
        {like ? (
          <>
            <GoHeartFill className="text-red-700 size-6" />
            <span className="text-gray-50">25</span>
          </>
        ) : (
          <>
            <GoHeart className=" size-6" />
            <span>24</span>
          </>
        )}
      </button>
    </div>
  );
}

export default ThreadLikes;
