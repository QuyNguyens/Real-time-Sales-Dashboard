import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { decrementTotal, deleteItemFromPage, setItemsPerPage } from "../features/users/usersSlice";
import { fetchUsersPage } from "../features/users/usersThunks";
import type { RootState } from "../app/store";
import type { AppDispatch } from "../app/store"; 
import { useBroadcastChannel } from "../hook/useBroadcastChannel";
import { selectCurrentUsers } from "../features/users/usersSlice";
import UserTable from "../components/UserTable";

const Users = () => {
  const currentPage = useSelector((state: RootState) => state.users.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.users.itemsPerPage);
  const total = useSelector((state: RootState) => state.users.total);
  const pages = useSelector((state: RootState) => state.users.pages);
  const users = useSelector(selectCurrentUsers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsersPage(1, itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    if (!pages[currentPage]) {
      dispatch(fetchUsersPage(currentPage, itemsPerPage));
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchUsersPage(page, itemsPerPage));
  };

  useBroadcastChannel("realtime_channel", (data) => {
    if (data.type === "delete_user") {
      dispatch(deleteItemFromPage(data.userId));
      dispatch(decrementTotal());
    }
  });

  const handleSetItemsPerPage = (value: number) => {
    dispatch(setItemsPerPage(value));
    };
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col justify-between bg-white">
        <div>
          <h2 className="pl-4 py-6 text-xl text-gray-700 font-medium">Recent users</h2>
          <UserTable data={users} />
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
      <div className="w-80"></div>
    </div>
  );
};

export default Users;
