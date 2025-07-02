import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { decrementTotal, deleteItemFromPage, setItemsPerPage } from "../features/products/productsSlice";
import { fetchProductsPage } from "../features/products/productsThunks";
import type { RootState } from "../app/store";
import type { AppDispatch } from "../app/store"; 
import { useBroadcastChannel } from "../hook/useBroadcastChannel";
import { selectCurrentProducts } from "../features/products/productsSlice";
import ProductTable from "../components/ProductTable";
import TopSellingCategories from "./TopSellingCategories";
import Banner from '../assets/banner.png';

const ProductPage = () => {
  const currentPage = useSelector((state: RootState) => state.products.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.products.itemsPerPage);
  const total = useSelector((state: RootState) => state.products.total);
  const pages = useSelector((state: RootState) => state.products.pages);
  const products = useSelector(selectCurrentProducts);
  const dispatch = useDispatch<AppDispatch>();

  const productStatus = useSelector((state: RootState) => state.productStatus.data);

  useEffect(() => {
    dispatch(fetchProductsPage(1, itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    if (!pages[currentPage]) {
      dispatch(fetchProductsPage(currentPage, itemsPerPage));
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchProductsPage(page, itemsPerPage));
  };

  useBroadcastChannel("realtime_channel", (data) => {
    if (data.type === "delete_product") {
      dispatch(deleteItemFromPage(data.productId));
      dispatch(decrementTotal());
    }
  });

  const handleSetItemsPerPage = (value: number) => {
    dispatch(setItemsPerPage(value));
    };
  return (
    <div className="flex flex-col xl:flex-row gap-5 h-full items-start xl:items-center">
      <div className="w-full flex flex-col h-full justify-between bg-white">
        <div>
          <h2 className="pl-4 py-6 text-xl text-gray-700 font-medium">Recent Products</h2>
          <ProductTable data={products} />
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
      <div className="flex flex-col gap-5 w-96">
          <img src={Banner} alt="" />
          {productStatus && <TopSellingCategories data={productStatus}/>}
        </div>
    </div>
  );
};

export default ProductPage;
