import React from 'react'


//  DashBoard
const Change_Password = React.lazy(() => import('./views/pages/register/Change_password'))


import Profile from './views/Profile/Profile'
import EditProfile from './views/Profile/EditProfile'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/change_password', name: 'Change Password', component: Change_Password },
  { path: '/profile/edit', name: 'Edit Profile', component: EditProfile },
  // { path: '/profile', name: 'Profile', component: Profile },







  //dashboard

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

export default routes
