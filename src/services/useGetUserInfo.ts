import { useQuery } from 'react-query';
import { httpApi } from '../shared/lib/http';

export const GET_USER_INFO_QUERY = 'get-user-info-key';

const getUserInfoQuery = async (): Promise<any> => {
  const { data } = await httpApi.get(`/me/`);
  return data;
};

export function useGetUserInfo(hasToken: boolean) {
  return useQuery<any, CustomError>(
    [GET_USER_INFO_QUERY],
    () => getUserInfoQuery(),
    {
      enabled: hasToken,
    },
  );
}
