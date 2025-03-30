interface Threads {
  //Threads
  avatarImage: string;
  name: string;
  username: string;
  relativeTime: string;
  datePosted?: string;
  threadImage?: string;
  thread: string; //Thread
  // liked: 'liked' | 'unlike';
  likeCount: string;
  likedCount: string;
  replyCount: string;
}
interface ThreadProps {
  threadList: Threads[];
}

export type { ThreadProps };
