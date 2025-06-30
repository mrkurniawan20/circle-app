import EditProfile from './EditProfile';
import DataMyProfile from './DataMyProfile';
import { NavLink } from 'react-router-dom';
import { UserProps } from '@/utils/useUser';

function ContainerMyProfile({ user }: UserProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden relative w-full max-w-[430px]">
      <div className="px-5">
        <NavLink to={`/profile/${user.username}`}>
          <h3 className="pt-4 pb-2 text-gray-100 text-xl font-semibold hover:underline underline-offset-4">My Profile</h3>
        </NavLink>
      </div>
      <div className="relative">
        <img src={user.header} alt="" className="w-full aspect-[5/1] object-cover" />
        <img src={user.avatar} alt="" className="size-20 object-cover rounded-full border-[3px] border-gray-800 absolute -bottom-10 left-5" />
      </div>
      <div className="absolute right-4 bottom-30 pt-12">
        <EditProfile user={user} />
      </div>
      <div className="mx-5 mb-4 mt-10">
        <DataMyProfile loggedIn={user} />
      </div>
    </div>
  );
}

export default ContainerMyProfile;
