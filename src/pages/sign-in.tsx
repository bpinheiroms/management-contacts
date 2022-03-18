import { GetServerSideProps } from 'next';
import LoginForm from '../components/Forms/Login';
import { withSSRPublic } from '../shared/hoc/withSSRPublic';

export default function SignIn() {
  return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = withSSRPublic(
  async (ctx) => {
    return {
      props: {},
    };
  },
);
