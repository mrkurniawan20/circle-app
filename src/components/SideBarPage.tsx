import React from 'react';
import { NavLink } from 'react-router-dom';

interface BarPage {
  page: string;
  image: string;
  namePage: string;
}

function SideBarPage({ page, image, namePage }: BarPage) {
  return (
    <NavLink to={`/${page}`} className="flex flex-row items-center p-2 hover:rounded-full hover:bg-slate-700 ">
      <img className="invert" src={`./src/assets/img/${image}.png`} alt="" width="10%" />
      &emsp;<p className="text-lg font-semibold invert">{namePage}</p>
    </NavLink>
  );
}

export default SideBarPage;
