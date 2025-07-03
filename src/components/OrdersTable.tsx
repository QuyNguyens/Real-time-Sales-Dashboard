import React, { useState } from "react";
import {format} from "date-fns/format";
import type { Order } from "../types/order";
import { PencilIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../features/orders/ordersThunks";
import type { AppDispatch } from "../app/store";
import ConfirmDialog from "./ConfirmDialog";
import EditOrderDialog from "./EditOrderDialog";
import orderApi from "../api/orders";
import { updateItemStatus } from "../features/orders/ordersSlice";
import { useTranslation } from "react-i18next";

interface Props {
  data: Order[];
}

const statusStyles: Record<Order["status"], string> = {
  processing: "bg-yellow-100 text-yellow-700",
  new: "bg-green-100 text-green-700",
  cancelled: "bg-pink-100 text-pink-700",
  delivered: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
};

const OrdersTable: React.FC<Props> = ({ data }) => {

    const dispatch = useDispatch<AppDispatch>();
    const {t} = useTranslation();
    
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleEditClick = (order: Order) => {
        setSelectedOrder(order);
        setEditOpen(true);
    };

    const handleSaveEdit = async (id: string, newStatus: Order['status']) => {
        try {
            const res = await orderApi.updateStatus(id, newStatus);
            if(res){
                dispatch(updateItemStatus({orderId: id, status: newStatus}));
            }
        } catch (error) {
            console.log('update order status failed: ',error);
        }
    };

    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            dispatch(deleteOrder(selectedId));
        }
        setConfirmOpen(false);
        setSelectedId(null);
    };

  return (
    <div className="overflow-x-auto w-full rounded shadow">
        <div className="max-h-[450px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            <table className="w-full bg-white dark:bg-black-primary text-sm text-left text-gray-800 dark:text-gray-100">
                <thead className="bg-gray-50 dark:bg-black-primary text-gray-700 border-gray-200 border-b dark:border-gray-700 dark:text-gray-300 sticky top-0 z-1">
                    <tr>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Order ID</th>
                    <th className="px-4 py-3 font-semibold">Amount (Tr)</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date Ordered</th>
                    <th className="px-4 py-3 font-semibold text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            {order.user.avatar ? (
                            <img
                                src={order.user.avatar}
                                alt={order.user.name}
                                className="w-7 h-7 rounded-md object-cover"
                            />
                            ) : (
                            <UserCircleIcon className="w-7 h-7 rounded-md text-gray-400" />
                            )}
                            <div>
                            <div className="font-medium text-gray-700 dark:text-gray-200 text-sm capitalize">
                                {order.user.name}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                {order.user.email}
                            </div>
                            </div>
                        </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300">
                        {order.orderId.slice(0, 8)}...
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                        {(order.amount / 1_000_000).toFixed(1)} VND
                        </td>
                        <td className="px-4 py-3">
                        <span
                            className={`w-20 flex justify-center py-1 rounded text-xs font-semibold ${statusStyles[order.status]}`}
                        >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {format(new Date(order.createdAt), "dd,MMM yyyy")}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-center gap-2">
                        <button
                            onClick={() => handleEditClick(order)}
                            className="p-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                        >
                            <PencilIcon className="w-4 h-4 text-green-700 dark:text-green-400" />
                        </button>
                        <button
                            onClick={() => handleDeleteClick(order.orderId)}
                            className="p-2 rounded bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"
                        >
                            <TrashIcon className="w-4 h-4 text-red-700 dark:text-red-400" />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
        </table>

        </div>
         <ConfirmDialog
            open={confirmOpen}
            message={t("confirmDialog.deleteMessage")}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
        />
        {selectedOrder && <EditOrderDialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
            order={selectedOrder}
            onSave={handleSaveEdit}
        />}
    </div>
  );
};

export default OrdersTable;
