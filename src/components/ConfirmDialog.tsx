// components/ConfirmDialog.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {title || t("confirmDialog.title")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-5">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            {t("confirmDialog.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            {t("confirmDialog.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
