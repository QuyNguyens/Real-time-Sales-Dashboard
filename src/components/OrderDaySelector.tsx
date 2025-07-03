import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface OrderDaySelectorProps {
  iconOnly?: boolean;
  onSelect: (filter: string) => void;
  options: string[];
}

const OrderDaySelector = ({ iconOnly, options, onSelect }: OrderDaySelectorProps) => {
  const {t} = useTranslation();

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton
          className={`p-2 ${iconOnly ? "py-2" : "py-1"} rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 outline-none`}
        >
          {iconOnly ? (
            <EllipsisVerticalIcon className="h-4 w-4 text-gray-700 dark:text-white" />
          ) : (
            <div className="flex gap-1 items-center">
              <span className="text-sm text-gray-400 dark:text-gray-300 font-medium">{t("orderChart.sortBy")}</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-white" />
            </div>
          )}
        </MenuButton>

        <MenuItems className="absolute divide-y divide-gray-200 dark:divide-gray-700 right-0 mt-2 w-28 origin-top-right rounded-sm bg-white dark:bg-black-primary shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50">
          {options.map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <button
                  className={`w-full px-4 py-2 text-sm text-left ${
                    active
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => onSelect(option)}
                >
                  {option}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default OrderDaySelector;
