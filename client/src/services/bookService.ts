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

export const addBookToShelf = async (userId: string, bookKey: string) => {
  try {
    console.log("🔹 Sending request..."); // Debug log

    const response = await axios.post(
      `${getApiUrl()}/users/${userId}/books`,
      { bookKey },
      { withCredentials: true } // Ensures cookies (JWT) are sent
    );

    console.log("✅ Response received:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Request failed:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add book");
  }
};

