import LoadingPage from './components/LoadingPage';
import { useUser } from '@/utils/useUser';

interface LayoutProps {
  children: React.ReactNode;
  showProfileContainer?: boolean;
  minimal?: boolean;
}

function GuestLayout({ children }: LayoutProps) {
  const { loading } = useUser();

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex justify-center px-4 xl:grid xl:grid-cols-[250px_600px_auto] 2xl:grid-cols-[0.4fr_1fr_0.4fr]">
      <div className="hidden xl:block" />
      <div className="w-full max-w-full xl:border-x border-gray-500">{children}</div>
      <div className="hidden xl:block" />
    </div>
  );
}

export default GuestLayout;
