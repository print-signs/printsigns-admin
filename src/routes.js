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
  // -------------------------------------------//


  //


]

export default routes
