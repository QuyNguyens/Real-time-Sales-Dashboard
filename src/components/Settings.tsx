import { Fragment } from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import MockSettings from './MockSettings';

const Settings = () => {

  return (
    <Popover className="relative">
      <PopoverButton className="relative w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 outline-none transition">
        <Cog6ToothIcon className="w-5 h-5 text-gray-700 dark:text-white" />
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
        <PopoverPanel className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-10">
            <MockSettings/>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default Settings;
