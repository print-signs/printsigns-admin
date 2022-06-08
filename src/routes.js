import React from 'react'
//Category
import Category from './views/Category/Category'
import EditCategory from './views/Category/EditCategory'
import AddCategeory from './views/Category/AddCategory'
//Bisuness
import Bisuness from './views/Directory/Bisuness'
import EditBisuness from "./views/Directory/EditBisuness"
import Add_Business from './views/Directory/Add_Business'
import View_Business from './views/Directory/View_Bisuness'
//news
import AddNews from "./views/News/AddNews"
import EditNews from "./views/News/EditNews"
import News from "./views/News/News"
import ViewNews from "./views/News/ViewNews"

//  DashBoard
const Change_Password = React.lazy(() => import('./views/pages/register/Change_password'))
const EditProfile = React.lazy(() => import('./views/Profile/EditProfile'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/change_password', name: 'Change Password', component: Change_Password },
  { path: '/edit', name: 'Change Password', component: EditProfile },
  // { path: '/profile', name: 'Change Password', component: Profile },

  //Category route
  { path: '/addCategory', name: 'AddCategeory', component: AddCategeory },
  { path: '/category/edit/:id', name: 'EditCategory', component: EditCategory },
  { path: '/category', name: 'Category', component: Category },

  //Directory-Bisuness route
  { path: '/view_bisuness/:id', name: 'view_bisuness_directory', component: View_Business },
  { path: '/add_bisuness', name: 'Add_bisuness_directory', component: Add_Business },
  { path: '/bisuness/edit/:id', name: 'EditBisuness', component: EditBisuness },
  { path: '/bisuness', name: 'bisuness', component: Bisuness },
  //News route
  { path: '/news/view/:id', name: 'ViewNews', component: ViewNews },
  { path: '/addNews', name: 'addNews', component: AddNews },
  { path: '/news/edit/:id', name: 'EditNews', component: EditNews },
  { path: '/news', name: 'news', component: News },

  //dashboard
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

export default routes
