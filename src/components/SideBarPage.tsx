import React from 'react';
import { NavLink } from 'react-router-dom';

interface BarPage {
  page: string;
  image: string;
  namePage: string;
}

function SideBarPage({ page, image, namePage }: BarPage) {
  return (
    <NavLink to={`/${page}`} className="inline-block max-w-max items-center p-2 hover:rounded-full hover:bg-slate-700 ">
      <div className="flex items-center space-x-5 px-3">
        <img className="invert size-8" src={`./src/assets/img/${image}.png`} alt="" width="10%" />
        <p className="text-lg font-semibold invert">{namePage}</p>
      </div>
    </NavLink>
  );
}

export default SideBarPage;
