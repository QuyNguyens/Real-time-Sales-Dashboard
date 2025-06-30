import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { TopUser } from '../types/user';

interface Props {
  data: TopUser[];
}

const TopUsersTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1.5">Avatar</th>
            <th className="px-2 py-1.5">Info</th>
            <th className="px-2 py-1.5 text-center">Orders</th>
            <th className="px-2 py-1.5 text-right">Total (Tr)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="pl-4 px-1 py-1.5">
                {user.user.avatar ? (
                  <img
                    className="w-7 h-7 rounded-md object-cover"
                    src={user.user.avatar}
                    alt={user.user.name}
                  />
                ) : (
                  <UserCircleIcon className="w-7 h-7 text-gray-400" />
                )}
              </td>
              <td className="px-2 py-1.5">
                <div className="font-medium text-gray-700 text-sm capitalize">
                    {user.user.name}
                </div>
                <div className="text-gray-500 text-xs">{user.user.email}</div>
              </td>
              <td className="px-2 py-1.5 text-center">{user.amount}</td>
              <td className="px-4 py-1.5 text-right">
                {(user.total / 1_000_000).toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopUsersTable;
