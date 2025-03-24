import DataMyProfile from '@/components/DataMyProfile';
import EditProfile from '@/components/EditProfile';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import ThreadList from '@/components/ThreadList';
import React from 'react';
import { NavLink } from 'react-router-dom';

const threads = [
  {
    avatarImage: 'star platinum',
    name: 'Dio Brando 👊🏼',
    username: 'konodioda',
    relativeTime: '4h',
    threadImage: '',
    thread: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quos facere, rem ut cupiditate fugiat nihil velit! Quam nesciunt, quae facilis voluptatum sed culpa itaque ut totam reiciendis laboriosam natus!', //Thread
    liked: 'liked' as 'liked' | 'unlike',
    likeCount: '30',
    replyCount: '100',
  },
  {
    avatarImage: 'star platinum',
    name: 'Dio Brando 👊🏼',
    username: 'konodioda',
    relativeTime: '1d',
    threadImage: 'header-resized.png',
    thread: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam hic expedita deleniti ipsam exercitationem iure enim molestiae repudiandae odio maxime?', //Thread
    liked: 'unlike' as 'unlike' | 'liked',
    likeCount: '30',
    replyCount: '100',
  },
  {
    avatarImage: 'star platinum',
    name: 'Dio Brando 👊🏼',
    username: 'konodioda',
    relativeTime: '12d',
    threadImage: 'dio.jpg',
    thread: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quos facere, rem ut cupiditate fugiat nihil velit! Quam nesciunt, quae facilis voluptatum sed culpa itaque ut totam reiciendis laboriosam natus!', //Thread
    liked: 'liked' as 'liked' | 'unlike',
    likeCount: '30',
    replyCount: '100',
  },
];

function ProfileMedia() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <div
        className="main-content border-l-1 border-r-1 border-gray-500 border-collapse"
        style={{
          height: '10000px',
        }}
      >
        <div className="inline-flex">
          <NavLink to={'/home'} className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
              <img src="./src/assets/img/back.png" className="invert w-6 h-6" alt="" />
              <h2 className="text-2xl text-gray-100 font-semibold">Dio Brando 👊🏼</h2>
            </div>
          </NavLink>
        </div>
        <div className="p-10 pt-2">
          <img src="./src/assets/img/header-resized.png" alt="" className="aspect-5/1  object-cover  rounded-2xl" />
          <img src="./src/assets/img/star platinum.png" alt="" className="aspect-square object-cover size-25 rounded-full border-3 ml-10 -mt-12 absolute" />
          <div className="flex pt-3 pb-5">
            <EditProfile />
          </div>
          <DataMyProfile />
        </div>
        {threads.map((thread, index) => (
          <ThreadList
            key={index}
            avatarImage={thread.avatarImage}
            name={thread.name}
            username={thread.username}
            relativeTime={thread.relativeTime}
            threadImage={thread.threadImage}
            thread={thread.thread}
            liked={thread.liked}
            likeCount={thread.likeCount}
            replyCount={thread.replyCount}
          />
        ))}
      </div>
      <ProfileBar showProfileContainer={false} />
    </div>
  );
}

export default ProfileMedia;
