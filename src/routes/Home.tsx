import ContentHome from '@/layouts/components/ContentHome';
import Layout from '@/layouts/Layout';
import { User } from '@/utils/useUser';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const { user } = useOutletContext<{ user: User }>();
  return (
    <Layout>
      <ContentHome user={user} />
    </Layout>
  );
}

export default Home;
