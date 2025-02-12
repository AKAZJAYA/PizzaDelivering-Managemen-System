import React from 'react'
import DefaultNavbar, {DashNavBar} from './Navbar';
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'

export default function Layout() {

  const location = useLocation();

  // Determine which header to display based on the current route
  let header;

  if(location.pathname === "/home" || location.pathname === "/login" || location.pathname === "/register") {
    header = <DefaultNavbar />
  } else if(location.pathname === "/dashboard"  || location.pathname === "/menu" || location.pathname === "/cart") {
    header = <DashNavBar />
  }

  return (
    <div>
        {header}

        <Outlet />  {/* This will render the child routes */}
        
        <Footer />
    </div>
  )
}
