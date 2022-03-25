import { Users } from '@prisma/client';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { httpApi } from '../shared/lib/http';
import { GET_CONTACTS_QUERY } from './useListContacts';

export const EDIT_CONTACT_KEY = 'EDIT_CONTACT_KEY';

const query = async (payload: any): Promise<Users> => {
  const { data } = await httpApi.put(`/contact-update`, payload);
  return data;
};

export function useEditContact(): UseMutationResult<any, CustomError> {
  const queryClient = useQueryClient();

  return useMutation<any, CustomError, any>((data: any) => query(data), {
    mutationKey: EDIT_CONTACT_KEY,
    onSuccess: () => {
      queryClient.refetchQueries(GET_CONTACTS_QUERY);
    },
  });
}
