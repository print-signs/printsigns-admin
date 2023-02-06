import React from 'react'


//  DashBoard
const Change_Password = React.lazy(() => import('./views/pages/register/Change_password'))


import Profile from './views/Profile/Profile'
import EditProfile from './views/Profile/EditProfile'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
///
//Cities
import Cities from './views/configuration/cities/Cities.js'
import AddCity from './views/configuration/cities/AddCity.js'
import EditCity from './views/configuration/cities/EditCity.js'
//states
import EditState from './views/configuration/states/EditStates.js'
import AddState from './views/configuration/states/AddState.js'
import States from './views/configuration/states/States.js'
//social media,address,logo
import Socialmedia from './views/configuration/Socialmedia.js'
import Address from './views/configuration/Address.js'
import Logo from './views/configuration/Logo.js'
import Login from './views/pages/login/Login'
//temple
import Temples from './views/Temples/Temples'
import AddTemple from './views/Temples/AddTemple'
import EditTemple from './views/Temples/EditTemple'
import Products from './views/Products/Products'
//product
import AddProduct from './views/Products/AddProduct'
import EditProduct from './views/Products/EditProduct'
import ViewProduct from './views/Products/ViewProduct'

//Order Management
import NewOrders from './views/orders/NewOrders.js'
import ProcessingOrders from './views/orders/ProcessingOrders.js'
import DispatchedOrders from './views/orders/DispatchedOrders.js'
import DeliveredOrders from './views/orders/DeliveredOrders.js'
import CancelledOrders from './views/orders/CancelledOrders.js'
import ReturnedOrders from './views/orders/ReturnedOrders.js'
import ViewOrder from './views/orders/ViewOrder'
import AddOrder from './views/orders/AddOrder'
//Taxes
import Tax from './views/configuration/tax/Tax'
import Addtax from './views/configuration/tax/Addtax'
import Edittax from './views/configuration/tax/Edittax'
import EditOrder from './views/orders/EditOrder'
const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/change_password', name: 'Change Password', element: Change_Password },
  { path: '/profile/edit', name: 'Edit Profile', element: EditProfile },
  // { path: '/profile', name: 'Profile', element: Profile },


  //Product
  { path: '/products', name: 'products', element: Products },
  { path: '/product/add', name: 'Add products', element: AddProduct },
  { path: '/product/edit/:id', name: 'Edit products', element: EditProduct },
  { path: '/product/view/:id', name: 'view products', element: ViewProduct },
  //Order Management


  { path: '/orders/new', name: 'New Orders', element: NewOrders },
  { path: '/order/add', name: 'add Order', element: AddOrder },
  { path: '/orders/edit/:id', name: 'Edit Order', element: EditOrder },
  //{ path: '/orders/view/:id', name: 'Edit Order', element: EditOrder },

  // { path: '/orders/processing', name: 'Processing Orders', element: ProcessingOrders },
  // { path: '/orders/dispatched', name: 'Dispatched Orders', element: DispatchedOrders },
  // { path: '/orders/delivered', name: 'Delivered Orders', element: DeliveredOrders },
  // { path: '/orders/cancelled', name: 'Cancelled Orders', element: CancelledOrders },
  // { path: '/orders/returned', name: 'Returned Orders', element: ReturnedOrders },
  { path: '/order/:status/:id', name: 'View Order', element: ViewOrder },


  //Temple
  { path: '/temples', name: 'Temples', element: Temples },
  { path: '/temple/add', name: 'Add Temple', element: AddTemple },
  { path: '/temple/edit/:id', name: 'Edit Temples', element: EditTemple },

  //dashboard

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //------------settings------------------------//
  //cities
  { path: '/cities', name: 'Cities', element: Cities },
  { path: '/cities/add', name: 'Add City', element: AddCity },
  { path: '/cities/edit/:id', name: 'Edit City', element: EditCity },
  //states
  { path: '/states', name: 'States', element: States },
  { path: '/states/add', name: 'Add State', element: AddState },
  { path: '/states/edit/:id', name: 'Edit State', element: EditState },

  //

  { path: '/socialmedia', name: 'Social Media', element: Socialmedia },
  { path: '/address', name: 'Address', element: Address },
  { path: '/logo', name: 'Logo', element: Logo },

  //Taxes
  { path: '/tax', name: 'Tax Rates', element: Tax },
  { path: '/tax/add', name: 'Add Tax', element: Addtax },
  { path: '/tax/edit/:id', name: 'Edit Tax', element: Edittax },
  // -------------------------------------------//


  //


]

export default routes
