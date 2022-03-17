import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { publicPaths } from '../utils/routes';

export function withSSRPrivate(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const token = ctx.req?.cookies?.token ?? null;

    if (!token && !publicPaths.includes(ctx.resolvedUrl)) {
      return {
        redirect: {
          destination: '/sign-in',
          permanent: false,
        },
      };
    }

   return await fn(ctx);
  };
}
