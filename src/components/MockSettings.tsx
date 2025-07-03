import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "fakeDataSettings";

const MockSettings = () => {
  const [orderCount, setOrderCount] = useState(1);
  const [userCount, setUserCount] = useState(1);
  const [productCount, setProductCount] = useState(3);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const settings = JSON.parse(saved);
      setOrderCount(settings.orderCount ?? 1);
      setUserCount(settings.userCount ?? 1);
      setProductCount(settings.productCount ?? 3);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ orderCount, userCount, productCount })
    );
    toast.success('Settings saved');
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Fake Data Settings
        
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
        Customize the number of items generated for each fake data type. These settings
        will be used when clicking the "Generate" buttons on the dashboard.
      </p>

      <div className="space-y-4">
        
        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">Orders</label>
          <input
            type="number"
            min={1}
            value={orderCount}
            onChange={(e) => setOrderCount(parseInt(e.target.value))}
            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">Users</label>
          <input
            type="number"
            min={1}
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value))}
            className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-gray-700 dark:text-gray-300 font-medium">Products</label>
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
        Save Settings
      </button>
    </div>
  );
};

export default MockSettings;
