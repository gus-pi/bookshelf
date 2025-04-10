import { UserCredentials } from '@/lib/types';
import { getApiUrl } from '@/lib/utils';
import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${getApiUrl()}/users`);
    const users = response.data;
    return users;
  } catch (error) {
    console.log('Error fetching users');
  }
};

export const updateUser = async (userData: { name: string, email: string, password: string }) => {
  try {
    const data = await axios.put(`${getApiUrl()}/users/update`, userData, { withCredentials: true });

    return data;
  } catch (error) {
    console.log('Error fetching users');
  }
};
