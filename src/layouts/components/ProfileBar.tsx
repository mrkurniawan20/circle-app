import SuggestedAccount from '../../components/SuggestedAccount';
import ContainerCredentials from '../../components/ContainerCredentials';
import ContainerMyProfile from '../../components/ContainerMyProfile';
import { useUser } from '@/utils/useUser';
import LoadingPage from './LoadingPage';

function ProfileBar({ showProfileContainer = true }: { showProfileContainer?: boolean }) {
  const { user, loading } = useUser();
  if (loading) return <LoadingPage />;

  return (
    <aside className="w-full max-w-full px-4 pt-6 sticky top-0">
      <div className="flex flex-col gap-6">
        {showProfileContainer && <ContainerMyProfile user={user!} />}
        <div className="bg-gray-800 rounded-xl w-full max-w-[430px] overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-50 px-5 py-4">Suggested for you</h3>
          <SuggestedAccount />
        </div>
        <ContainerCredentials />
      </div>
    </aside>
  );
}

export default ProfileBar;
