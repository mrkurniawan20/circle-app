import React, { useState } from 'react';
import { Button } from './ui/button';

function FollowedButton() {
  const [follow, setFollow] = useState<boolean>(true);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    setFollow(!follow);
  };
  return (
    <button onClick={toggleFollow} className="ms-auto my-auto">
      {follow ? (
        <>
          <Button variant={'followed'}>Followed</Button>
        </>
      ) : (
        <Button variant={'follow'}>Follow</Button>
      )}
    </button>
  );
}

export default FollowedButton;
