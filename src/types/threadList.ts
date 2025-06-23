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
// export interface Tweets {
//   //Threads
//   avatarImage: string;
//   name: string;
//   username: string;
//   // relativeTime: string;
//   createdAt: string;
//   threadImage?: string;
//   thread: string; //Thread
//   // liked: 'liked' | 'unlike';
//   likeCount: string;
//   likedCount: string;
//   replyCount: string;
// }
export interface ThreadProps {
  threadList: Threads[];
}
// export interface TweetProps {
//   tweetList: Tweets[];
// }

// export type { ThreadProps };
