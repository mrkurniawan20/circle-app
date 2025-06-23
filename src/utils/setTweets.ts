import { Reply } from '@/components/ListReply';
import { User } from './setUser';

export interface Tweet {
  id: number;
  post: string;
  image?: string;
  userId: number;
  likeCount: number;
  replyCount: number;
  user: User;
  reply: Reply[];
  createdAt: Date;
}

export interface TweetProps {
  tweet: Tweet[];
}
