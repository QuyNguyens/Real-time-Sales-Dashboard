import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface OrderDaySelectorProps {
  iconOnly?: boolean;
  onSelect: (filter: string) => void;
  options: string[];
}

const OrderDaySelector = ({ iconOnly, options, onSelect }: OrderDaySelectorProps) => {

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className={`p-2 ${iconOnly ? 'py-2': 'py-1'} rounded-sm hover:bg-gray-100 outline-none`}>
          {iconOnly ? (
            <EllipsisVerticalIcon className="h-4 w-4 text-gray-700" />
          ) : (
            <div className="flex gap-1 items-center">
              <span className="text-sm text-gray-400 font-medium">Sort By</span>
              <ChevronDownIcon className="w-4 h-4"/>
            </div>
          )}
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          {options.map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <button
                  className={`w-full px-4 py-2 text-sm text-left ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
