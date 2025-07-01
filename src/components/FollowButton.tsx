import React, { useState } from 'react';
import { Button } from './ui/button';
import { api } from '@/services/api';

interface Follow {
  id: number;
  isFollowing: boolean;
  onFollow: () => void;
}

function FollowButton({ id, isFollowing, onFollow }: Follow) {
  const [follow, setFollow] = useState<boolean>(isFollowing);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  async function followUser(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      setFollow(true);
      await api.get(`/user/followuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onFollow?.();
    } catch (error) {
      console.error(error);
      setFollow(false);
    } finally {
      setLoading(false);
    }
  }

  async function unfollowUser(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setFollow(false);
    try {
      await api.get(`/user/unfollowuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onFollow?.();
    } catch (error) {
      console.error(error);
      setFollow(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ms-auto my-auto">
      {follow ? (
        <Button variant="followed" onClick={unfollowUser} disabled={loading}>
          {loading ? '...' : 'Followed'}
        </Button>
      ) : (
        <Button variant="follow" onClick={followUser} disabled={loading}>
          {loading ? '...' : 'Follow'}
        </Button>
      )}
    </div>
  );
}

export default FollowButton;
