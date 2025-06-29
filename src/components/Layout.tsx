import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex flex-col flex-1'>
            <Header/>
            <div className='flex-1 p-5 bg-gray-100'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout