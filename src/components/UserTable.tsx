import React, { useState } from "react";
import { format } from "date-fns/format";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/users/usersThunks";
import type { AppDispatch } from "../app/store";
import ConfirmDialog from "./ConfirmDialog";
import type { User } from "../types/user";

interface Props {
  data: User[];
}

const UserTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      dispatch(deleteUser(selectedId));
    }
    setConfirmOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="overflow-x-auto rounded shadow">
      <div className="max-h-[450px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
        <table className="min-w-full bg-white dark:bg-black-primary text-sm text-left">
          <thead className="bg-gray-50 dark:bg-black-primary text-gray-700 border-gray-200 border-b dark:border-gray-700 dark:text-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold">Avatar</th>
              <th className="px-4 py-3 font-semibold text-center">Info</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Address</th>
              <th className="px-4 py-3 font-semibold">CreatedAt</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-md object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-300" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-100">
                  <div className="font-medium text-sm capitalize">{user.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-100">
                  {user.phone}
                </td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-100">
                  {user.address}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {format(new Date(user.createdAt), "dd,MMM yyyy")}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  {/* <button className="p-2 rounded bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600">
                    <PencilIcon className="w-4 h-4 text-green-700 dark:text-white" />
                  </button> */}
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    className="p-2 rounded bg-red-100 hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    <TrashIcon className="w-4 h-4 text-red-700 dark:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        message="Are you sure you want to delete this user?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserTable;
