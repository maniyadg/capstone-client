import React from 'react'
import { Outlet } from 'react-router-dom'
import Createproduct from './Createproduct'
import Product from './Product'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function PortalLayout() {
  return (
    <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Topbar />
 <Outlet />
      </div>
    </div>
  </div>
  )
}

export default PortalLayout