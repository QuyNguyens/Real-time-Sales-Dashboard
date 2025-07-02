import orderApi from '../api/orders';
import productApi from '../api/product';
import userApi from '../api/users';
import toast from 'react-hot-toast';

const FetchData = () => {
  const handleCreateOrder = async () => {
    try {
      await orderApi.create();
      toast.success('New order created!');
    } catch (error) {
      toast.error('Failed to create order.');
    }
  };

  const handleCreateUser = async () => {
    try {
      await userApi.create();
      toast.success('New user created!');
    } catch (error) {
      toast.error('Failed to create user.');
    }
  };

  const handleCreateProduct = async () => {
    try {
      await productApi.create(3);
      toast.success('New product created!');
    } catch (error) {
      toast.error('Failed to create product.');
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCreateOrder}
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        New Order
      </button>
      <button
        onClick={handleCreateUser}
        className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
      >
        New User
      </button>
      <button
        onClick={handleCreateProduct}
        className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
      >
        New Product
      </button>
    </div>
  );
};

export default FetchData;
