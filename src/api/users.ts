import type { PaginatedResponse, TopUser, User } from "../types/user";
import axiosClient from "./axiosClient";

const userApi = {
    getOrders: async (page: number = 1, limit: number = 5) :Promise<PaginatedResponse<User>> => {
        const res = await axiosClient.get('/api/users', {
      params: { page, limit },
    });
        return res.data;
    },

    getTopUser: async (filter: string) :Promise<TopUser[]> => {
        const res = await axiosClient.get('/api/user-top', {
        params: { filter },
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