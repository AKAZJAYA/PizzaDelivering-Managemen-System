import React from 'react'
import { Outlet, useLocation } from 'react-router'
import AdminLayout from './AdminLayout';


export default function Inventory() {

  const location = useLocation();

  // Determine which header to display based on the current route
//   let header;

//   if(location.pathname === "/inventory") {
//     header = <DashboardHeader />
//   } else if(location.pathname === "/inventory/categories") {
//     header = <CategoriesHeader />
//   } else{
//     header = <></>
//   }

  return (
    <div className='flex'>
        <AdminLayout />
        <div className='flex-grow'>
            {/* {header} */}
            <Outlet />
        </div>
    </div>
  )
}