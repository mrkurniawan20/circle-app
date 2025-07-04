import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Tweet } from './setTweets';
import { Reply } from '@/components/ListReply';
import { api } from '@/services/api';

export interface Decoded {
  id: number;
  username: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  bio: string;
  avatar: string;
  header: string;
  verified: boolean;
  tweetCount: number;
  followersCount: number;
  followingCount: number;
  tweet: Tweet[];
  reply: Reply[];
  isFollowingBack: boolean;
}
export interface Users {
  user: User[];
}
export interface UserProps {
  user: User;
}

export function useUser() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
    dateOfBirth: new Date(),
    bio: '',
    avatar: 'blue.png',
    header: '',
    verified: false,
    tweetCount: 0,
    followersCount: 0,
    followingCount: 0,
    tweet: [],
    reply: [],
    isFollowingBack: false,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode<Decoded>(token);
      const username = decoded.username;
      api
        .get(`/user/getUser/${username}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, []);
  return { user, loading };
}
