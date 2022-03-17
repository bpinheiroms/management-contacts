import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '..';

export function useAuth(): AuthContextData {
  const userLogged = useContextSelector(AuthContext, (ctx) => ctx.userLogged);

  const queryUserInfo = useContextSelector(
    AuthContext,
    (ctx) => ctx.queryUserInfo,
  );

  const authenticateUser = useContextSelector(
    AuthContext,
    (ctx) => ctx.authenticateUser,
  );

  const authenticateMutation = useContextSelector(
    AuthContext,
    (ctx) => ctx.authenticateMutation,
  );

  const logOut = useContextSelector(AuthContext, (ctx) => ctx.logOut);

  return {
    userLogged,
    queryUserInfo,
    authenticateUser,
    authenticateMutation,
    logOut,
  };
}
