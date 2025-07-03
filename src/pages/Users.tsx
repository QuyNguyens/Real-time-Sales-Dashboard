import { useEffect, useState } from "react";
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
import type { TopUser as TopUserType } from "../types/user";
import userApi from "../api/users";
import TopUsersTable from "../components/TopUsersTable";
import OrderDaySelector from "../components/OrderDaySelector";
import { useTranslation } from "react-i18next";

const options = ["Day", "Week", "Month", "Year"];

const Users = () => {
  const [topUsers, setTopUsers] = useState<TopUserType[]>([]);
  const currentPage = useSelector((state: RootState) => state.users.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.users.itemsPerPage);
  const total = useSelector((state: RootState) => state.users.total);
  const pages = useSelector((state: RootState) => state.users.pages);
  const users = useSelector(selectCurrentUsers);
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsersPage(1, itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    if (!pages[currentPage]) {
      dispatch(fetchUsersPage(currentPage, itemsPerPage));
    }
  }, [currentPage]);

  useEffect(() =>{
    const fetchUsersTop = async () =>{
      try {
        const users = await userApi.getTopUser("year");
        setTopUsers(users);
      } catch (error) {
        console.error("get users top failed!!!: ", error);
      }
    }
    fetchUsersTop();
  },[]);

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

    const handleFilterChange = async (filter: string) => {
    try {
      const res = await userApi.getTopUser(filter.toLowerCase());
      setTopUsers(res);
    } catch (err) {
      console.error("❌ Failed to fetch filtered top user:", err);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row h-full gap-5">
      <div className="flex-1 h-full flex flex-col justify-between bg-white dark:bg-black-primary">
        <div>
          <h2 className="pl-4 py-6 text-xl text-gray-700 dark:text-gray-300 font-medium">{t("recentUser")}</h2>
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
      <div className="bg-white dark:bg-black-primary dark:text-white rounded-md p-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-medium dark:text-gray-300 text-gray-700">Top Users</h2>
          <OrderDaySelector options={options} iconOnly={true} onSelect={handleFilterChange}/>
        </div>
        <TopUsersTable data={topUsers}/>
      </div>
    </div>
  );
};

export default Users;
