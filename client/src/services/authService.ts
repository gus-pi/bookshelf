import { getApiUrl } from '@/lib/utils';
import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${getApiUrl()}/users/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return response.data.user;
};

export const registerUser = async (name: string, email: string, password: string, confirmPassword: string) => {
  const response = await axios.post(
    `${getApiUrl()}/users/register`,
    {
      name,
      email,
      password,
      confirmPassword
    },
    { withCredentials: true }
  );
  return response.data.user;
};

export const getAuthenticatedUser = async () => {
  const { data } = await axios.get(`${getApiUrl()}/users/auth/profile`, {
    withCredentials: true,
  });
  return data;
};
