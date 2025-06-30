import type { PaginatedResponse, User } from "../types/user";
import axiosClient from "./axiosClient";

const userApi = {
    getOrders: async (page: number = 1, limit: number = 5) :Promise<PaginatedResponse<User>> => {
        const res = await axiosClient.get('/api/users', {
      params: { page, limit },
    });
        return res.data;
    },

    create: async () =>{
        const res = await axiosClient.post('/mock/new-user');
        return res.data;
    },

    deleteUser: async (userId: string) => {
        await axiosClient.delete('/api/user-delete',{
            params: {userId}
        });
    },
}

export default userApi;