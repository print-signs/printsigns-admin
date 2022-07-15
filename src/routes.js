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
//Events
import Event from './views/Events/Event'
import EditEvent from './views/Events/EditEvent'
import AddEvent from './views/Events/AddEvent'
import ViewEvent from './views/Events/ViewEvent'
//offers Route
import Offer from './views/Offers/Offer'
import AddOffer from './views/Offers/AddOffer'
import EditOffer from './views/Offers/EditOffer'
import ViewOffer from './views/Offers/ViewOffer'
//Banner
import Banner from './views/Banners/Banner'
import ViewBanner from './views/Banners/ViewBanner'
import EditBanner from './views/Banners/EditBanner'
import AddBanner from './views/Banners/AddBanner'
//cms 
import CMS from './views/CMS/cms'
import CMSView from './views/CMS/ViewCms'
import CMSEdit from './views/CMS/EditCms'
//cms 
import Feedback from './views/Feedback/feedback'
import ViewFeedback from './views/Feedback/ViewFeedback'
//cms 
import Users from './views/Users/users'
import ViewUsers from './views/Users/ViewUsers'
//Requirement 
import ViewRequirement from './views/Requirement/ViewRequirement'
import Requirement from './views/Requirement/Requirement'
import AddRequirement from './views/Requirement/AddRequirement'
import EditRequirement from './views/Requirement/EditRequirement'

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
  //Events route
  { path: '/event/view/:id', name: 'ViewEvent', component: ViewEvent },
  { path: '/addevent', name: 'AddEvent', component: AddEvent },
  { path: '/event/edit/:id', name: 'EditEvent', component: EditEvent },
  { path: '/event', name: 'Event', component: Event },

  //Offers route
  { path: '/offer/view/:id', name: 'Viewoffer', component: ViewOffer },
  { path: '/addOffer', name: 'AddOffer', component: AddOffer },
  { path: '/offer/edit/:id', name: 'EditOffer', component: EditOffer },
  { path: '/offer', name: 'offer', component: Offer },

  //BANNERS 
  { path: '/banner/view/:id', name: 'ViewBanner', component: ViewBanner },
  { path: '/addbanner', name: 'AddBanner', component: AddBanner },
  { path: '/banner/edit/:id', name: 'EditBanner', component: EditBanner },
  { path: '/banner', name: 'Banner', component: Banner },
  //CMS 
  { path: '/cms/view/:id', name: 'CMS', component: CMSView },
  { path: '/cms/edit/:id', name: 'CMS', component: CMSEdit },
  { path: '/cms', name: 'CMS', component: CMS },
  //CMS 
  { path: '/feedback/view/:id', name: 'ViewFeedback', component: ViewFeedback },
  { path: '/feedback', name: 'Feedback', component: Feedback },
  //Requirement
  { path: '/requirement/view/:id', name: 'ViewRequirement', component: ViewRequirement },
  { path: '/requirement/edit/:id', name: 'EditRequirement', component: EditRequirement },
  { path: '/requirement/add/', name: 'AddRequirement', component: AddRequirement },
  { path: '/requirement', name: 'Requirement', component: Requirement },

  //Users 
  { path: '/users/view/:id', name: 'ViewUsers', component: ViewUsers },
  { path: '/users', name: 'users', component: Users },



  //dashboard

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

export default routes
