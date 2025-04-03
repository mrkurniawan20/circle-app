import React from 'react';

const socials = [{ icon: 'github.png' }, { icon: 'linkedin.png' }, { icon: 'twitter.png' }, { icon: 'facebook.png' }];

function ContainerCredentials() {
  return (
    <div className="third-profile-container bg-gray-800 mt-5 pl-3 pr-3 rounded-xl w-full">
      <div className="pt-5 pb-5">
        <div className="flex">
          <h4 className="my-auto text-gray-50 font-semibold">Developed by Rafli Kurniawan&ensp;•&ensp;</h4>
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <a key={index} className="p-0 m-0 size-7" href="">
                <img className="grayscale hover:grayscale-0 duration-100" src={`./src/assets/img/${social.icon}`} alt="" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className=" flex items-center text-xs text-slate-400 pt-2">
            Powered by <img className="p-0 m-0 w-5 ml-1 mr-1 align-middle" src="./src/assets/img/dw.png" alt="" /> DumbWays Indonesia • #1 Coding Bootcamp
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContainerCredentials;
