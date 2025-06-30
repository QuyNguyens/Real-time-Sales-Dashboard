import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersTable from "../components/OrdersTable";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { decrementTotal, deleteItemFromPage, selectCurrentOrders } from "../features/orders/ordersSlice";
import { fetchOrdersPage } from "../features/orders/ordersThunks";
import type { RootState } from "../app/store";
import type { AppDispatch } from "../app/store"; 
import { useBroadcastChannel } from "../hook/useBroadcastChannel";

const Orders = () => {
  const currentPage = useSelector((state: RootState) => state.orders.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.orders.itemsPerPage);
  const total = useSelector((state: RootState) => state.orders.total);
  const pages = useSelector((state: RootState) => state.orders.pages);
  const orders = useSelector(selectCurrentOrders);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrdersPage(1, itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    if (!pages[currentPage]) {
      dispatch(fetchOrdersPage(currentPage, itemsPerPage));
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchOrdersPage(page, itemsPerPage));
  };

  useBroadcastChannel("realtime_channel", (data) => {
    if (data.type === "delete_order") {
      dispatch(deleteItemFromPage(data.orderId));
      dispatch(decrementTotal());
    }
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col justify-between bg-white">
        <div>
          <h2 className="pl-4 py-6 text-xl text-gray-700 font-medium">Recent Orders</h2>
          <OrdersTable data={orders} />
        </div>
        <div className="flex justify-between p-4">
          <Pagination
            totalPages={Math.ceil(total / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <ItemsPerPage />
        </div>
      </div>
      <div className="w-80"></div>
    </div>
  );
};

export default Orders;
