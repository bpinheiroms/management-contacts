import { Users } from '@prisma/client';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { httpApi } from '../shared/lib/http';
import { GET_CONTACTS_QUERY } from './useListContacts';

export const REMOVE_CONTACT_KEY = 'REMOVE_CONTACT_KEY';

const query = async (payload: any): Promise<Users> => {
  const { data } = await httpApi.delete(`/contact-delete?id=${payload.id}`);
  return data;
};

export function useDeleteContact(): UseMutationResult<any, CustomError> {
  const queryClient = useQueryClient();

  return useMutation<any, CustomError, any>((data: any) => query(data), {
    mutationKey: REMOVE_CONTACT_KEY,
    onSuccess: () => {
      queryClient.refetchQueries(GET_CONTACTS_QUERY);
    },
  });
}
