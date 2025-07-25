import type { Order, OrderItem, OrderStatus, OrderWeekBreakdownResponse, SaleOverView } from "../types/order";
import type { PaginatedResponse } from "../types/user";
import axiosClient from "./axiosClient";

const orderApi = {
    getOrders: async (page: number = 1, limit: number = 5) :Promise<PaginatedResponse<Order>> => {
        const res = await axiosClient.get('/api/orders', {
      params: { page, limit },
    });
        return res.data;
    },

    deleteOrder: async (orderId: string) => {
        await axiosClient.delete('/api/order-delete',{
            params: {orderId}
        });
    },
    
    getOrdersByUser: async (userId: string, page: number = 1, limit: number = 10) :Promise<PaginatedResponse<Order>> => {
        const res = await axiosClient.get('/api/orders-user', {
        params: { userId, page, limit },
    });
        return res.data;
    },

    getOrderItemsByOrder: async (orderId: string) :Promise<PaginatedResponse<OrderItem>> => {
        const res = await axiosClient.get('/api/order-items-id', {
        params: { orderId },
    });
        return res.data;
    },

    getSalesOverView: async () :Promise<SaleOverView[]> => {
        const res = await axiosClient.get('/api/sales-overview');
        return res.data;
    },

    getStatusCount: async (filter: string) :Promise<OrderStatus> => {
        const res = await axiosClient.get('/api/status-count',{
            params: {filter}
        });
        return res.data;
    },

    getStats: async () :Promise<OrderWeekBreakdownResponse> => {
        const res = await axiosClient.get('/api/order-per-week');
        return res.data;
    },

    create: async (count: number = 1) =>{
        const res = await axiosClient.post(`/mock/new-order?orderCount=${count}`);
        return res.data;
    },

    updateStatus: async (orderId: string, status: string) => {
        const res = await axiosClient.post(`/mock/order-update`, {
            orderId,
            status,
        });
        return res.data;
    }
}

export default orderApi;