import EditProfile from './EditProfile';
import DataMyProfile from './DataMyProfile';
import { NavLink } from 'react-router-dom';
import { UserProps } from '@/utils/useUser';

function ContainerMyProfile({ user }: UserProps) {
  return (
    <div className="first-profile-container bg-gray-800 pl-5 pr-5 rounded-xl relative max-w-[430px]">
      <div className="p-0 m-0 sm:max-w-fit">
        <NavLink to={`/profile/${user.username}`} className="">
          <h3 className="pt-3 pb-3 text-gray-100 text-xl font-semibold hover:underline underline-offset-6 sm:max-w-fit">My Profile</h3>
        </NavLink>
      </div>
      <img src={`${user!.header}`} alt="" className="aspect-5/1 overflow-hidden object-cover rounded-xl" />
      <img src={`${user!.avatar}`} alt="" className="size-20 aspect-square object-cover rounded-full border-5 border-gray-800 -mt-10 ml-4 absolute" />
      <div className="flex pt-3">
        <EditProfile user={user} />
      </div>
      <DataMyProfile loggedIn={user!} />
    </div>
  );
}

export default ContainerMyProfile;
