import { useMutation, UseMutationResult } from 'react-query';
import { httpApi } from '../shared/lib/http';

export const LOGOUT_USER__QUERY = 'LOGOUT-USER-KEY';

const query = async (): Promise<any> => {
  const { data } = await httpApi.delete(`/logout`);
  return data;
};

export function useLogoutUser(): UseMutationResult<any, CustomError> {
  return useMutation<any, CustomError, any>(() => query(), {
    mutationKey: LOGOUT_USER__QUERY,
  });
}
