import { useQuery } from 'react-query';
import { httpApi } from '../shared/lib/http';

export const GET_USERS_QUERY = 'get-users-key';

const query = async (): Promise<any> => {
  const { data } = await httpApi.get(`/contacts-list`);
  return data;
};

export function useListContacts() {
  return useQuery<any, CustomError>([GET_USERS_QUERY], () => query());
}
