// components/OrderDetails.tsx
import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { PaginatedResponse } from "../types/user";
import type { OrderItem } from "../types/order";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  items: PaginatedResponse<OrderItem>;
}

const OrderDetails: React.FC<Props> = ({ open, onClose, items }) => {
    const {t} = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded shadow-2xl p-6">
          <DialogTitle className="flex flex-col gap-2 text-lg font-semibold mb-4 dark:text-white">
            <span>{t('orderDetail')}</span>
            <span className="text-sm">{t('total')}: {items.total}</span>
          </DialogTitle>
          <div className="max-h-[400px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-3 py-2">Image</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Quantity</th>
                  <th className="px-3 py-2">Unit Price</th>
                  <th className="px-3 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.data.map((item : OrderItem) => (
                  <tr key={item._id} className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-3 py-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    </td>
                    <td className="px-3 py-2">{item.name}</td>
                    <td className="px-3 py-2">{item.quantity}</td>
                    <td className="px-3 py-2">{item.unitPrice.toLocaleString()} VND</td>
                    <td className="px-3 py-2">{item.total.toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600">
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default OrderDetails;
