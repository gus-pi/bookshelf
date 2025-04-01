import { getApiUrl } from '@/lib/utils';
import axios from 'axios';

export const fetchUserBooks = async (userId: string) => {
  try {
    const response = await axios.get(`${getApiUrl()}/users/${userId}`);
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

export const fetchBookData = async (bookKey: string) => {
  try {
    const response = await fetch(`${getApiUrl()}${bookKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(`${getApiUrl()}/books`, {
      params: { query },

    });
    const data = response.data
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};
