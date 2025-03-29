import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface BarPage {
  page: string;
  image: ReactElement;
  namePage: string;
}

function SideBarPage({ page, image, namePage }: BarPage) {
  return (
    <NavLink to={`/${page}`} className="inline-block max-w-max items-center p-2 hover:rounded-full hover:bg-slate-700 duration-200">
      <div className="flex items-center space-x-5 px-3">
        <span className="text-3xl text-gray-100">{image}</span>
        <p className="text-xl font-semibold text-gray-100">{namePage}</p>
      </div>
    </NavLink>
  );
}

export default SideBarPage;
