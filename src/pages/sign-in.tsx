import { GetServerSideProps } from 'next';
import LoginForm from '../components/Forms/Login';
import { withSSRPublic } from '../shared/hoc/withSSRPublic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SignIn() {
  return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = withSSRPublic(
  async (ctx) => {
    return {
      props: {
        //@ts-ignore
        ...(await serverSideTranslations(ctx.locale, ['common'])),
      },
    };
  },
);
