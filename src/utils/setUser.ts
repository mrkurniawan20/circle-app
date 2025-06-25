import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Tweet } from './setTweets';

interface Decoded {
  id: number;
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
      const userId = decoded.id;
      axios
        .get(`http://127.0.0.1:3320/user/getUser/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data);
          console.log(user);
        })
        .catch((err) => {
          console.log(`Failed to fetch user ${err}`);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log('Unable to fetch user');
      localStorage.removeItem('token');
    }
  }, []);
  return { user, loading };
}
