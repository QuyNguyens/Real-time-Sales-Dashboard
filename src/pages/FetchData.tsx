import orderApi from '../api/orders';
import productApi from '../api/product';
import userApi from '../api/users';
import toast from 'react-hot-toast';
import { getFakeDataCount } from '../utils/getFakeDataCount';
import { useTranslation } from 'react-i18next';

const FetchData = () => {
  const { t } = useTranslation();
  
  const handleCreateOrder = async () => {
    const { orderCount } = getFakeDataCount();
    try {
      await orderApi.create(orderCount);
      toast.success(t('fetchData.orderSuccess', { count: orderCount }));
    } catch {
      toast.error(t('fetchData.orderError'));
    }
  };

  const handleCreateUser = async () => {
    const { userCount } = getFakeDataCount();
    try {
      await userApi.create(userCount);
      toast.success(t('fetchData.userSuccess', { count: userCount }));
    } catch {
      toast.error(t('fetchData.userError'));
    }
  };

  const handleCreateProduct = async () => {
    const { productCount } = getFakeDataCount();
    try {
      await productApi.create(productCount);
      toast.success(t('fetchData.productSuccess', { count: productCount }));
    } catch {
      toast.error(t('fetchData.productError'));
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="bg-white mx-auto dark:bg-black-primary p-5 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {t('fetchData.title')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {t('fetchData.description')}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreateOrder}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {t('fetchData.generateOrder')}
          </button>
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
          >
            {t('fetchData.generateUser')}
          </button>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            {t('fetchData.generateProduct')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchData;
