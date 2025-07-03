import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { TopUser } from '../types/user';

interface Props {
  data: TopUser[];
}

const TopUsersTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded shadow">
      <div className="scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 max-h-[600px] overflow-y-auto">
        <table className="min-w-full bg-white dark:bg-black-primary text-sm text-left">
          <thead className="bg-gray-100 dark:bg-black-primary border-gray-200 border-b dark:border-gray-700 text-gray-700 dark:text-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-1.5">Avatar</th>
              <th className="px-2 py-1.5">Info</th>
              <th className="px-2 py-1.5 text-center">Orders</th>
              <th className="px-2 py-1.5 text-right">Total (Tr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="pl-4 px-1 py-1.5">
                  {user.user.avatar ? (
                    <img
                      className="w-7 h-7 rounded-md object-cover"
                      src={user.user.avatar}
                      alt={user.user.name}
                    />
                  ) : (
                    <UserCircleIcon className="w-7 h-7 text-gray-400 dark:text-gray-500" />
                  )}
                </td>
                <td className="px-2 py-1.5">
                  <div className="font-medium text-gray-700 dark:text-gray-100 text-sm capitalize">
                    {user.user.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{user.user.email}</div>
                </td>
                <td className="px-2 py-1.5 text-center text-gray-700 dark:text-gray-100">
                  {user.amount}
                </td>
                <td className="px-4 py-1.5 text-right text-gray-700 dark:text-gray-100">
                  {(user.total / 1_000_000).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopUsersTable;
