import { getApiUrl } from '@/lib/utils';
import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${getApiUrl()}/users/login`, {
    email,
    password,
  });
  return response.data.user;
};

export const getAuthenticatedUser = async () => {
  const { data } = await axios.get(`${getApiUrl()}/users/auth/profile`, {
    withCredentials: true,
  });
  return data;
};
