import orderApi from '../api/orders';
import productApi from '../api/product';
import userApi from '../api/users';
import toast from 'react-hot-toast';
import { getFakeDataCount } from '../utils/getFakeDataCount';

const FetchData = () => {
    const handleCreateOrder = async () => {
      const { orderCount } = getFakeDataCount();
      try {
        await orderApi.create(orderCount);
        toast.success(`${orderCount} new order(s) created!`);
      } catch {
        toast.error("Failed to create order.");
      }
    };

    const handleCreateUser = async () => {
      const { userCount } = getFakeDataCount();
      try {
        await userApi.create(userCount);
        toast.success(`${userCount} new user(s) created!`);
      } catch {
        toast.error("Failed to create user.");
      }
    };

    const handleCreateProduct = async () => {
      const { productCount } = getFakeDataCount();
      try {
        await productApi.create(productCount);
        toast.success(`${productCount} new product(s) created!`);
      } catch {
        toast.error("Failed to create product.");
      }
    };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="bg-white mx-auto dark:bg-black-primary p-5 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Fake Data Generator
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Click the buttons below to quickly generate mock orders, users, or products.
          You can customize the number of items in the <span className="font-medium">Settings</span> page.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreateOrder}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Generate Order
          </button>
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
          >
            Generate User
          </button>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Generate Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchData;
