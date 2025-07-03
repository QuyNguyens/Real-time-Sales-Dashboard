import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersTable from "../components/OrdersTable";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { decrementTotal, deleteItemFromPage, selectCurrentOrders, setItemsPerPage } from "../features/orders/ordersSlice";
import { fetchOrdersPage } from "../features/orders/ordersThunks";
import type { RootState } from "../app/store";
import type { AppDispatch } from "../app/store"; 
import { useBroadcastChannel } from "../hook/useBroadcastChannel";
import StackedOrderChart from "./StackedOrderChart";

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

  const handleSetItemsPerPage = (value: number) => {
    dispatch(setItemsPerPage(value));
  };

  return (
    <div className="flex flex-col xl:flex-row h-full gap-5 items-start xl:items-center">
      <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-black-primary">
        <div className="w-full">
          <h2 className="pl-4 py-6 text-xl text-gray-700 dark:text-gray-300 font-medium">Recent Orders</h2>
          <OrdersTable data={orders} />
        </div>
        <div className="flex justify-between p-4">
          <Pagination
            totalPages={Math.ceil(total / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <ItemsPerPage itemsPerPage={itemsPerPage} setItemsPerPage={handleSetItemsPerPage} />
        </div>
      </div>
      <div className="w-96">
        <StackedOrderChart/>
      </div>
    </div>
  );
};

export default Orders;
