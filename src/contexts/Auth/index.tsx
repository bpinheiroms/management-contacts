import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { UseMutationResult, UseQueryResult } from 'react-query';
import { createContext } from 'use-context-selector';
import { useAuthenticateUser } from '../../services/useAuthenticateUser';
import { useGetUserInfo } from '../../services/useGetUserInfo';
import { useLogoutUser } from '../../services/useLogoutUser';
import { AuthState } from '../../shared/types';

export interface AuthContextData {
  userLogged?: AuthState;
  queryUserInfo: UseQueryResult<any, CustomError>;
  authenticateMutation: UseMutationResult<any, CustomError, unknown, unknown>;
  authenticateUser: (data: any) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthContextProvider: React.FC = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState<AuthState>();

  const queryUserInfo = useGetUserInfo(!!children?.props?.token);

  const authenticateMutation = useAuthenticateUser();
  const logoutMutation = useLogoutUser();

  const router = useRouter();

  const authenticateUser = useCallback((data: any) => {
    authenticateMutation.mutate(data);
  }, []);

  const logOut = useCallback(() => {
    logoutMutation.mutate(null);
  }, []);

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      setUserLogged({ userInfo: undefined, expiresAt: 0 });
      router.replace('/sign-in');
    }
  }, [logoutMutation.status]);

  useEffect(() => {
    if (queryUserInfo.isSuccess) {
      setUserLogged({
        userInfo: {
          email: queryUserInfo.data.email,
          name: queryUserInfo.data.name,
          _id: queryUserInfo.data._id,
          role: queryUserInfo.data.role,
        },
        expiresAt: queryUserInfo.data.exp,
      });

      return;
    }

    if (queryUserInfo.isError) {
      setUserLogged({ userInfo: undefined, expiresAt: 0 });
      logOut();
      return;
    }
  }, [queryUserInfo.status]);

  useEffect(() => {
    if (authenticateMutation.isSuccess) {
      setUserLogged({
        userInfo: authenticateMutation.data.userInfo,
        expiresAt: authenticateMutation.data.exp,
      });
      router.replace('/');
    }
  }, [authenticateMutation.status]);

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        queryUserInfo,
        authenticateUser,
        authenticateMutation,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
