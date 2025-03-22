import React from 'react';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
import CircleText from './CircleText';

function SideBar() {
  return (
    <div className="flex flex-col gap-5 h-screen fixed w-xs">
      <CircleText textSize="text-5xl" />
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/home.png" alt="" width="12%" />
        &emsp;<p className="text-xl font-semibold invert">Home</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/search.png" alt="" width="12%" />
        &emsp;<p className="text-xl font-semibold invert">Search</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/follow.png" alt="" width="12%" />
        &emsp;<p className="text-xl font-semibold invert">Follow</p>
      </NavLink>
      <NavLink to={'/Home'} className="flex flex-row items-center sideBar ">
        <img className="invert" src="./src/assets/img/profile.png" alt="" width="12%" />
        &emsp;<p className="text-xl font-semibold invert">Profile</p>
      </NavLink>
      <Button variant={'circle'}>Create Post</Button>
      <div className="flex-grow"></div>
      <NavLink to={'/logout'} className="flex flex-row items-center sideBar mb-15">
        <img className="invert" src="./src/assets/img/logout.png" alt="" width="12%" />
        &emsp;<p className="text-xl font-semibold invert">logout</p>
      </NavLink>
    </div>
  );
}

export default SideBar;
