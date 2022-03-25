import { useQuery } from 'react-query';
import { httpApi } from '../shared/lib/http';
import { IContact } from '../shared/types';

export const GET_CONTACTS_QUERY = 'get-contacts-key';

const query = async (): Promise<any> => {
  const { data } = await httpApi.get(`/contacts-list`);
  return data;
};

export function useListContacts() {
  return useQuery<IContact[], CustomError>([GET_CONTACTS_QUERY], () => query());
}
