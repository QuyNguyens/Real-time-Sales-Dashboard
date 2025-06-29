import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../websocket/websocket";
import type {OrderStatus, SaleOverView } from "../types/order";
import SalesOverviewChart from "./SalesOverviewChart";
import OrderStatisticsCard from "./OrderStatisticsCard";
import { ChartBarIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import TotalItem from "../components/TotalItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchProductsPage } from "../features/products/productsThunks";
import { fetchOrdersPage } from "../features/orders/ordersThunks";
import { fetchUsersPage } from "../features/users/usersThunks";
import orderApi from "../api/orders";
import TopSellingCategories from "./TopSellingCategories";
import type { ProductTypeStats } from "../types/product";
import productApi from "../api/product";
import Banner from '../assets/banner.png';
import { setTotal } from "../features/users/usersSlice";
import { setTotal as setProductTotal } from "../features/products/productsSlice";
import { incrementOneTotal } from "../features/orders/ordersSlice";

const Dashboard = () => {
    const [salesOverview, setSalesOverview] = useState<SaleOverView[]>([]);
    const [orderStatus, setOrderStatus] = useState<OrderStatus>();
    const [productStatus, setProductStatus] = useState<ProductTypeStats>();

    const dispatch = useDispatch<AppDispatch>();
    const productsCounts = useSelector((state: RootState) => state.products.total);
    const ordersCounts = useSelector((state: RootState) => state.orders.total);
    const usersCounts = useSelector((state: RootState) => state.users.total);

    const fetchSalesOverview = async () => {
      const cached = sessionStorage.getItem("salesOverview");

      if (cached) {
        setSalesOverview(JSON.parse(cached));
        return;
      }

      try {
        const salesData = await orderApi.getSalesOverView();
        sessionStorage.setItem("salesOverview", JSON.stringify(salesData));
        setSalesOverview(salesData);
      } catch (error) {
        console.error("get sales overview failed!!!: ", error);
      }
    };

    const fetchOrderStatus = async () => {
      const cached = sessionStorage.getItem("orderStatus");

      if (cached) {
        setOrderStatus(JSON.parse(cached));
        return;
      }

      try {
        const orderStatusData = await orderApi.getStatusCount("");
        sessionStorage.setItem("orderStatus", JSON.stringify(orderStatusData));
        setOrderStatus(orderStatusData);
      } catch (error) {
        console.error("get sales overview failed!!!: ", error);
      }
    };

    const fetchProductStatus = async () => {
      const cached = sessionStorage.getItem("productStatus");

      if (cached) {
        setProductStatus(JSON.parse(cached));
        return;
      }

      try {
        const productStatusData = await productApi.getProductsTypeCount("");
        sessionStorage.setItem("productStatus", JSON.stringify(productStatusData));
        setProductStatus(productStatusData);
      } catch (error) {
        console.error("get sales overview failed!!!: ", error);
      }
    };

    function handleRealtimeUpdate(data: any) {
      switch (data.type) {
        case "new_user":
          dispatch(setTotal(usersCounts + 1));
          break;
        case "new_order":
        case "order_status_update":
          fetchOrderStatus();
          fetchProductStatus();
          break;
        case "new_product":
          dispatch(setProductTotal(productsCounts + data?.products.length));
          break;
        default:
          console.warn("⚠️ Unknown message type:", data);
      }
    }

    useEffect(() => {
      
      fetchSalesOverview();
      fetchOrderStatus();
      fetchProductStatus();

      dispatch(fetchProductsPage(1,10));
      dispatch(fetchOrdersPage(1,10));
      dispatch(fetchUsersPage(1,10));

      const bc = new BroadcastChannel('realtime_channel');

      connectWebSocket((data) => {
        // TODO: handle data (e.g. show toast, update UI)
        
        bc.postMessage(data);

        handleRealtimeUpdate(data);
  
        switch (data.type) {
          case "new_user":
            dispatch(setTotal(usersCounts+1));
            break;
          case "new_order":
          case "order_status_update":
            if(data.type === "new_order"){
              dispatch(incrementOneTotal());
            }
            sessionStorage.removeItem('salesOverview');
            sessionStorage.removeItem('orderStatus');
            sessionStorage.removeItem('productStatus');
            fetchSalesOverview();
            fetchOrderStatus();
            fetchProductStatus();
            break;
          case "new_product":
            dispatch(setProductTotal(productsCounts + data?.products.length));
            break;
          default:
            console.warn("⚠️ Unknown message type:", data);
        }
      });

      bc.onmessage = (event) => {
        handleRealtimeUpdate(event.data);
      };

      return () => {
        disconnectWebSocket();
      };
    }, []);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Sales Dashboard</h1>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <TotalItem title="Total Products" amount={productsCounts} bgColor="bg-blue-500" icon={ShoppingCartIcon} />
            <TotalItem title="Total Users" amount={usersCounts} bgColor="bg-purple-500" icon={UserCircleIcon} />
            <TotalItem title="Total Orders" amount={ordersCounts} bgColor="bg-orange-500" icon={ChartBarIcon} />
          </div>
          <div className="flex gap-5">
            {salesOverview && <SalesOverviewChart salesData={salesOverview}/>}
            {orderStatus && <OrderStatisticsCard orderStatus={orderStatus} setOrderStatus={setOrderStatus}/>}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <img src={Banner} alt="" />
          {productStatus && <TopSellingCategories data={productStatus} setProductStatus={setProductStatus}/>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
