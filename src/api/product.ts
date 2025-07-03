import type { Product, ProductTypeStats } from "../types/product";
import type { PaginatedResponse } from "../types/user";
import axiosClient from "./axiosClient";

const productApi = {
    getProducts: async (page: number = 1, limit: number = 5) :Promise<PaginatedResponse<Product>> => {
        const res = await axiosClient.get('/api/products', {
      params: { page, limit },
    });
        return res.data;
    },

    getProductsTypeCount: async (filter: string) :Promise<ProductTypeStats> => {
        const res = await axiosClient.get('/api/products-type-count',{
            params: {filter}
        });
        return res.data;
    },

    create: async (count: number = 1) =>{
        const res = await axiosClient.post(`/mock/new-product?count=${count}`);
        return res.data;
    },

    deleteProduct: async (productId: string) => {
        await axiosClient.delete('/api/product-delete',{
            params: {productId}
        });
    },
}

export default productApi;