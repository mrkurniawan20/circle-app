import ContentHome from '@/layouts/components/ContentHome';
import { useUser } from '@/utils/useUser';

function Home() {
  const { user } = useUser();
  return (
    // <Layout>
    //   <ContentHome user={user} />
    // </Layout>
    <ContentHome user={user} />
  );
}

export default Home;
