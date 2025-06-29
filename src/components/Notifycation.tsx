import { Fragment, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const notifications = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    title: 'New Messages',
    message: 'Jane Sam sent you a message.',
    time: 'Now',
  },
  {
    id: 2,
    icon: '🛒',
    title: 'Order Updates',
    message: 'Order #54321 has been shipped.',
    time: '2 hours ago',
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Comment on Post',
    message: 'Reacted: John Richard on your next post.',
    time: '2 hours ago',
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    title: 'Follow Request',
    message: 'Kelin Brown has sent you the request.',
    time: '1 Day ago',
  },
  {
    id: 5,
    icon: '🎁',
    title: 'Exclusive Offers',
    message: 'New exclusive offers just for you.',
    time: '2 Days ago',
  },
];

const NotificationPanel = () => {
  const [unreadCount, setUnreadCount] = useState(5);

  return (
    <Popover className="relative">
      <PopoverButton className="relative w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 outline-none transition">
        <BellIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center w-3 h-3 text-[8px] font-bold leading-none text-white bg-purple-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-10">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
            <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {unreadCount} Unread
            </span>
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <li key={notif.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                {notif.avatar ? (
                  <img src={notif.avatar} alt="" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 text-xl flex items-center justify-center">
                    {notif.icon}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{notif.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">{notif.message}</p>
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
                <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
              </li>
            ))}
          </ul>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              View All
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
