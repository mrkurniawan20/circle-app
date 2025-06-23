import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface BarPage {
  page: string;
  image: ReactElement;
  namePage: string;
}

interface BarProps {
  profiles: BarPage[];
}

function SideBarPage({ profiles = [] }: BarProps) {
  return (
    <>
      {profiles.map((profile, index) => (
        <NavLink key={index} to={`/${profile.page}`} className="inline-block max-w-max items-center py-2 px-3 hover:rounded-full hover:bg-slate-700 duration-200">
          <div className="flex items-center space-x-5 ">
            <span className="text-3xl text-gray-100">{profile.image}</span>
            <p className="text-xl font-semibold text-gray-100">{profile.namePage}</p>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default SideBarPage;
