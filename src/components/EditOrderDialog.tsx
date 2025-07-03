import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import type { Order } from "../types/order";
import { useTranslation } from "react-i18next";

interface EditOrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: (id: string, status: Order["status"]) => void;
}

const EditOrderDialog = ({ open, onClose, order, onSave }: EditOrderDialogProps) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Order["status"]>(order?.status ?? "processing");

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [order]);

  const handleSave = () => {
    if (order) onSave(order.orderId, status);
    onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg p-6 space-y-4">
              <DialogTitle className="text-lg font-medium text-gray-800 dark:text-white">
                {t("editOrder.title")}
              </DialogTitle>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("editOrder.statusLabel")}
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm p-2 text-gray-900 dark:text-white"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Order["status"])}
                >
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
                >
                  {t("editOrder.cancel")}
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  {t("editOrder.save")}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditOrderDialog;
