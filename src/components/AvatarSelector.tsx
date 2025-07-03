import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import {
  UserIcon,
  Cog6ToothIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const AvatarSelector = () => {
  const user = {
    name: 'Mr.Henry',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  return (
    <Menu as="div" className="relative w-8 h-8 items-center justify-center rounded-md outline-none border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition inline-block text-left">
      <MenuButton className="outline-none">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-full h-full bg-cover"
        />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg outline-none z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-800 group">
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-700">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <div className="py-2">
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-purple-700 dark:text-white gap-2`}
                >
                    <div className='w-6 h-6 flex justify-center items-center rounded-full bg-purple-200'>
                        <UserIcon className="w-4 h-4 text-purple-700" />
                    </div>
                  Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-purple-700 dark:text-white gap-2`}
                >
                     <div className='w-6 h-6 flex justify-center items-center rounded-full bg-purple-200'>
                        <Cog6ToothIcon className="w-4 h-4 text-purple-700" />
                    </div>
                  Settings
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-purple-700 dark:text-white gap-2`}
                >
                     <div className='w-6 h-6 flex justify-center items-center rounded-full bg-purple-200'>
                        <LockClosedIcon className="w-4 h-4 text-purple-700" />
                    </div>
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default AvatarSelector;
