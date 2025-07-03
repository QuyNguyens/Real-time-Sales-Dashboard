import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/react';

import ViIcon from '../assets/vietnam-icon.png';
import UsIcon from '../assets/us-icon.png';
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  const currentLang = languages.find(lang => lang.code === i18n.language) ?? languages[0];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 outline-none">
          <img className="w-5 h-5" src={currentLang.icon} alt={currentLang.code} />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 dark:divide-gray-500 rounded-md bg-white dark:bg-gray-950 shadow-lg outline-none border-none z-10">
          {languages.map((lang) => (
            <MenuItem key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                  } group flex items-center w-full px-4 py-2 text-sm group`}
                >
                  <img className="mr-2 w-5 h-5" src={lang.icon} alt="" />
                  <span className='group-hover:text-blue-500'>{lang.name}</span>
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
