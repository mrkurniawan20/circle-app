import React from 'react';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
import CircleText from './CircleText';

function SideBar() {
  return (
    <div className="flex flex-col gap-5 h-screen fixed w-80 p-10">
      <a href="" className="hover:scale-105 transition-transform duration-200">
        <CircleText textSize="text-5xl" />
      </a>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/home.png" alt="" width="10%" />
        &emsp;<p className="text-lg font-semibold invert">Home</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/search.png" alt="" width="10%" />
        &emsp;<p className="text-lg font-semibold invert">Search</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/follow.png" alt="" width="10%" />
        &emsp;<p className="text-lg font-semibold invert">Follow</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/profile.png" alt="" width="10%" />
        &emsp;<p className="text-lg font-semibold invert">Profile</p>
      </NavLink>
      <Button variant={'circle'} className="p-5">
        Create Post
      </Button>
      <div className="flex-grow"></div>
      <NavLink to={'/logout'} className="flex flex-row items-center sideBar mb-15">
        <img className="invert" src="./src/assets/img/logout.png" alt="" width="10%" />
        &emsp;<p className="text-lg font-semibold invert">logout</p>
      </NavLink>
    </div>
  );
}

export default SideBar;
