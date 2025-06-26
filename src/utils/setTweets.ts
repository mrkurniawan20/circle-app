import { Reply } from '@/components/ListReply';
import { User } from './useUser';

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
  isLiked: boolean;
}

export interface TweetProps {
  tweet: Tweet[];
}
