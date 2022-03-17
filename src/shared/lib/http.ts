import { Axios } from './axios';

export const httpApi = Axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: '/api',
});
