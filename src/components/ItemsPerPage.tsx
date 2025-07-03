import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const perPage = [5, 7, 10, 12];

interface Props {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const ItemsPerPage: React.FC<Props> = ({ itemsPerPage, setItemsPerPage }) => {
  const [selectedPerPage, setSelectedPerPage] = useState<number>(itemsPerPage);

  const handleSelectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setSelectedPerPage(value);
    setItemsPerPage(value);
  };

  return (
    <div className="relative">
      <select
        value={selectedPerPage}
        onChange={handleSelectPerPage}
        className="appearance-none block w-full px-3 py-[5px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black-primary text-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-base16 font-normal pr-10"
      >
        {perPage.map((option) => (
          <option key={option} value={option}>
            {option < 10 ? "0" : ""}
            {option} Items
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 w-[14px] h-[14px] text-gray-500 dark:text-gray-300 transform -translate-y-1/2" />
    </div>
  );
};

export default ItemsPerPage;
