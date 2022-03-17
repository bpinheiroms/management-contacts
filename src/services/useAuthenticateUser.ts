import { useMutation, UseMutationResult } from 'react-query';
import { httpApi } from '../shared/lib/http';

export const AUTHENTICATE_USER__QUERY = 'AUTHENTICATE-USER-KEY';

const query = async (userInfo: any): Promise<any> => {
  const { data } = await httpApi.post(`/authenticate`, userInfo);
  return data;
};

export function useAuthenticateUser(): UseMutationResult<any, CustomError> {
  return useMutation<any, CustomError, any>((data: any) => query(data), {
    mutationKey: AUTHENTICATE_USER__QUERY,
  });
}
