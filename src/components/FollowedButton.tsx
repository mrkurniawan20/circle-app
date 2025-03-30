import React, { useState } from 'react';
import { Button } from './ui/button';

function FollowedButton() {
  const [follow, setFollow] = useState<boolean>(true);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    setFollow(!follow);
  };
  return (
    <div onClick={toggleFollow} className="ms-auto my-auto">
      {follow ? (
        <>
          <Button variant={'followed'}>Followed</Button>
        </>
      ) : (
        <Button variant={'follow'}>Follow</Button>
      )}
    </div>
  );
}

export default FollowedButton;
