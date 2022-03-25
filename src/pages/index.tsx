import type { GetServerSideProps, NextPage } from 'next';
import { withSSRPrivate } from '../shared/hoc/withSSRPrivate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '../layout';
import { ModalContextProvider } from '../contexts/Modal';
import HomeTemplate from '../templates/home';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <ModalContextProvider>
        <HomeTemplate />
      </ModalContextProvider>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRPrivate(
  async (ctx) => {
    return {
      props: {
        //@ts-ignore
        ...(await serverSideTranslations(ctx.locale, ['common'])),
        token: ctx.req?.cookies?.token,
      },
    };
  },
);

export default Home;
