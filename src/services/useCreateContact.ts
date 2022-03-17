import { Users } from '@prisma/client';
import { useMutation, UseMutationResult } from 'react-query';
import { httpApi } from '../shared/lib/http';

export const CREATE_CONTACT_KEY = 'CREATE_CONTACT_KEY';

const query = async (payload: any): Promise<Users> => {
  const { data } = await httpApi.post(`/contact-register`, payload);
  return data;
};

export function useCreateContact(): UseMutationResult<any, CustomError> {
  return useMutation<any, CustomError, any>((data: any) => query(data), {
    mutationKey: CREATE_CONTACT_KEY,
  });
}
