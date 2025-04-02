import { getApiUrl } from "@/lib/utils"
import axios from "axios"

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${getApiUrl()}/users`)
        const users = response.data
        return users
    } catch (error) {
        console.log('Error fetching users')
    }
}