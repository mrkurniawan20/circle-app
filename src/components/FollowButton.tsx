import React, { useState } from 'react';
import { Button } from './ui/button';
import { api } from '@/services/api';

interface Follow {
  id: number;
  isFollowing: boolean;
}

function FollowButton({ id, isFollowing }: Follow) {
  const [follow, setFollow] = useState<boolean>(isFollowing);
  const token = localStorage.getItem('token');
  async function followUser(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await api.get(`/user/followuser/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFollow(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function unfollowUser(e: React.MouseEvent) {
    e.preventDefault();
    setFollow(false);
    try {
      await api.get(`/user/unfollowuser/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="ms-auto my-auto">
      {follow ? (
        <>
          <Button variant={'followed'} onClick={unfollowUser}>
            Followed
          </Button>
        </>
      ) : (
        <Button variant={'follow'} onClick={followUser}>
          Follow
        </Button>
      )}
    </div>
  );
}

export default FollowButton;
