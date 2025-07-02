import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex w-full flex-col min-h-screen min-w-0">
        <Header />
        <div className="w-full h-full overflow-y-auto bg-gray-100 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};



export default Layout