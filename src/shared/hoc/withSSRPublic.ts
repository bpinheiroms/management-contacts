import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function withSSRPublic(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const token = ctx.req?.cookies?.token ?? null;

    if (token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
