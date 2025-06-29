import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/react';

import { LanguageIcon } from '@heroicons/react/24/outline';
import ViIcon from '../assets/vietnam-icon.png';
import UsIcon from '../assets/us-icon.png';

const languages = [
  {
    name: 'English',
    code: 'en',
    icon: UsIcon,
  },
  {
    name: 'Vietnamese',
    code: 'vi',
    icon: ViIcon,
  }
];

const LanguageSelector = () => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 outline-none">
          <LanguageIcon className="w-5 h-5 text-gray-600" />
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-none border-none z-10">
          {languages.map((lang) => (
            <MenuItem key={lang.code}>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <img className='mr-2 w-5 h-5' src={lang.icon} alt="" />
                  {lang.name}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
