import type { PaginatedResponse, User } from "../types/user";
import axiosClient from "./axiosClient";

const userApi = {
    getOrders: async (page: number = 1, limit: number = 10) :Promise<PaginatedResponse<User>> => {
        const res = await axiosClient.get('/api/users', {
      params: { page, limit },
    });
        return res.data;
    },

    create: async () =>{
        const res = await axiosClient.post('/mock/new-user');
        return res.data;
    }
}

export default userApi;