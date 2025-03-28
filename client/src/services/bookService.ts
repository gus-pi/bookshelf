import { getApiUrl } from "@/lib/utils";
import axios from "axios";

export const fetchUserBooks = async (userId: string) => {
    try {
        const response = await axios.get(`${getApiUrl()}/users/${userId}`);
        console.log(response)
        return response.data.books
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Failed to fetch books');
    }
}