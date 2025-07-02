import { Fragment, useState, type ReactElement } from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { BellIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useBroadcastChannel } from '../hook/useBroadcastChannel';
import type { Product } from '../types/product';

type NotificationItem = {
  id: string;
  title: string;
  message: ReactElement;
  time: string;
  avatar?: string;
  icon?: ReactElement;
  read: boolean;
};

const adminFake = [
  {
    name: "Tony Dang",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/57.jpg"
  },
  {
    name: "Taylor Swift",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/73.jpg"
  },
  {
    name: "Davis John",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/0.jpg"
  },
  {
    name: "Chovy",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/26.jpg"
  },
  {
    name: "Kin Nguyen",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/81.jpg"
  }
];

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const updateStatus = (data: any) => {
    const admin = adminFake[Math.floor(Math.random() * adminFake.length)];
    let newNotif: NotificationItem;
    switch(data.type){
      case "order_status_update":
          newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'Order Updates',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm">Order <span className='text-pink-500'>#{data.orderId.slice(0, 5)}</span>... has been {data.status}.</p>,
          time: new Date().toLocaleTimeString(),
          icon: <ShoppingCartIcon className='w-5 h-5 font-medium'/>,
          read: false,
        };
        break;
      case "new_user":
        newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'Created User',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm"><span className='text-purple-500'>{admin.name}</span> has been created <span className='text-orange-500'>{data.name}</span></p>,
          time: new Date().toLocaleTimeString(),
          avatar: admin.avatar,
          read: false,
        };
        break;
      case "new_product":
        const productsData: NotificationItem[] = [];
        data.products.map((pro : Product) =>{
          newNotif = {
            id: crypto.randomUUID(),
            title: data.title || 'Created Product',
            message: <p className="text-gray-600 dark:text-gray-300 text-sm">Product <span className='text-pink-500'>#{pro._id.slice(0, 5)}</span>... has been add by <span className='text-purple-500'>{admin.name}</span></p>,
            time: new Date().toLocaleTimeString(),
            avatar: pro.image,
            read: false,
          };
          productsData.push(newNotif);
        });
        setNotifications((prev) => [...productsData, ...prev]);
        setUnreadCount((prev) => prev + productsData.length);
        return;
      case "new_order":
        newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'New Order',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm">Order <span className='text-pink-500'>#{data.orderId.slice(0, 5)}</span>... has been bought by <span className='text-purple-500'>{data.customerName}</span></p>,
          time: new Date().toLocaleTimeString(),
          avatar: admin.avatar,
          read: false,
        };
        break;
      case "delete_order":
        newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'Order deleted',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm">Order <span className='text-pink-500'>#{data.orderId.slice(0, 5)}</span>... has been deleted by <span className='text-purple-500'>{admin.name}</span></p>,
          time: new Date().toLocaleTimeString(),
          avatar: admin.avatar,
          read: false,
        };
        break;
      case "delete_product":
        newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'Product deleted',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm">Product <span className='text-pink-500'>#{data.productId.slice(0, 5)}</span>... has been deleted by <span className='text-purple-500'>{admin.name}</span></p>,
          time: new Date().toLocaleTimeString(),
          avatar: admin.avatar,
          read: false,
        }; 
        break;
      case "delete_user":
        newNotif = {
          id: crypto.randomUUID(),
          title: data.title || 'User deleted',
          message: <p className="text-gray-600 dark:text-gray-300 text-sm">User <span className='text-pink-500'>#{data.userId.slice(0, 5)}</span>... has been deleted by <span className='text-purple-500'>{admin.name}</span></p>,
          time: new Date().toLocaleTimeString(),
          avatar: admin.avatar,
          read: false,
        };  
        break;
    }

    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id && !n.read ? { ...n, read: true } : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const removeNotification = (id: string) => {
    const target = notifications.find((n) => n.id === id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (target && !target.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  useBroadcastChannel('realtime_channel', (data) => {
      updateStatus(data);
  });

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
            {notifications.length === 0 && (
              <li className="text-center text-sm text-gray-500 py-4 dark:text-gray-400">
                No notifications yet.
              </li>
            )}
            {notifications.map((notif) => (
              <li
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  !notif.read ? 'bg-gray-50 dark:bg-gray-700' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                {notif.avatar ? (
                  <img src={notif.avatar} alt="" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 text-xl flex items-center justify-center">
                    {notif.icon || '🔔'}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{notif.title}</p>
                  {notif.message}
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
                <XMarkIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notif.id);
                  }}
                  className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                />
              </li>
            ))}
          </ul>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <button
              onClick={() => {
                setNotifications([]);
                setUnreadCount(0);
              }}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Clear All
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
