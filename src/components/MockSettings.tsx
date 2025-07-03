import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const LOCAL_STORAGE_KEY = "fakeDataSettings";

const getInitialSettings = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      orderCount: parsed.orderCount ?? 1,
      userCount: parsed.userCount ?? 1,
      productCount: parsed.productCount ?? 3,
    };
  }
  return {
    orderCount: 1,
    userCount: 1,
    productCount: 3,
  };
};

const MockSettings = () => {
  const { t } = useTranslation();
  const initial = getInitialSettings();

  const [orderCount, setOrderCount] = useState(initial.orderCount);
  const [userCount, setUserCount] = useState(initial.userCount);
  const [productCount, setProductCount] = useState(initial.productCount);

  const handleSave = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ orderCount, userCount, productCount })
    );
    toast.success(t("mockSettings.saved"));
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {t("mockSettings.title")}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
        {t("mockSettings.description")}
      </p>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            {t("mockSettings.orders")}
          </label>
          <input
            type="number"
            min={1}
            value={orderCount}
            onChange={(e) => setOrderCount(parseInt(e.target.value))}
            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            {t("mockSettings.users")}
          </label>
          <input
            type="number"
            min={1}
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value))}
            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            {t("mockSettings.products")}
          </label>
          <input
            type="number"
            min={1}
            value={productCount}
            onChange={(e) => setProductCount(parseInt(e.target.value))}
            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {t("mockSettings.save")}
      </button>
    </div>
  );
};

export default MockSettings;
