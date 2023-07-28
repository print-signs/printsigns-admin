import React from "react";

//  DashBoard
const Change_Password = React.lazy(() =>
  import("./views/pages/register/Change_password")
);

import Profile from "./views/Profile/Profile";
import EditProfile from "./views/Profile/EditProfile";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
///
//Cities
import Cities from "./views/configuration/Purpose/Purpose.js";
import AddCity from "./views/configuration/Purpose/AddPurpose.js";
import EditCity from "./views/configuration/Purpose/EditPurpose.js";
//states
import EditState from "./views/configuration/states/EditStates.js";
import AddState from "./views/configuration/states/AddState.js";
import States from "./views/configuration/states/States.js";
//social media,address,logo
import Socialmedia from "./views/configuration/Socialmedia.js";
import Address from "./views/configuration/Address.js";
import Logo from "./views/configuration/Logo.js";
import Login from "./views/pages/login/Login";

// Appointments
import Appointments from "./views/Appointments/Appointments";

//Businesses
import Businesses from "./views/Business/Businesses.js";
import AddBusiness from "./views/Business/AddBusiness.js";
import EditBusiness from "./views/Business/EditBusiness.js";
import Products from "./views/Products/Products";
//product
import AddProduct from "./views/Products/AddProduct";
import EditProduct from "./views/Products/EditProduct";
import ViewProduct from "./views/Products/ViewProduct";

//Order Management
import NewOrders from "./views/orders/NewOrders.js";
import ProcessingOrders from "./views/orders/ProcessingOrders.js";
import DispatchedOrders from "./views/orders/DispatchedOrders.js";
import DeliveredOrders from "./views/orders/DeliveredOrders.js";
import CancelledOrders from "./views/orders/CancelledOrders.js";
import ReturnedOrders from "./views/orders/ReturnedOrders.js";
import ViewOrder from "./views/orders/ViewOrder";
import AddOrder from "./views/orders/AddOrder";
//Taxes
import Tax from "./views/configuration/tax/Tax";
import Addtax from "./views/configuration/tax/Addtax";
import Edittax from "./views/configuration/tax/Edittax";
import EditOrder from "./views/orders/EditOrder";
import ViewOrders from "./views/orders/ViewOrders";
import Departures from "./views/Departures/Departures";
import AddDeparture from "./views/Departures/AddDeparture";
import Informations from "./views/Informations/Informations";
import AddInformations from "./views/Informations/AddInformations";

import ApplicationName from "./views/configuration/ApplicationName";
import CopyrightMessage from "./views/configuration/CopyrightMessage";
import ContactRequests from "./views/ContactRequests/ContactRequests";
import AddContactRequest from "./views/ContactRequests/AddContactRequest";
import Testimonials from "./views/Testimonials/Testimonials";
import AddTestimonial from "./views/Testimonials/AddTestimonial";
import ViewTestimonial from "./views/Testimonials/ViewTestimonial";
import Policies from "./views/configuration/Policies/Policies";
////purpose
import Purpose from "./views/configuration/Purpose/Purpose";
import AddPurpose from "./views/configuration/Purpose/AddPurpose";
//language
import Languages from "./views/configuration/Language/Languages";
import AddLanguage from "./views/configuration/Language/AddLanguage";
import EditLanguage from "./views/configuration/Language/EditLanguage";
//BusinessType
import BusinessType from "./views/configuration/Business_Type/Business";
import AddBusinessType from "./views/configuration/Business_Type/AddBusiness";
import EditBusinessType from "./views/configuration/Business_Type/EditLanguage";
import EditPurpose from "./views/configuration/Purpose/EditPurpose.js";
import ViewAppointment from "./views/Appointments/ViewAppointment";
import EditAppointment from "./views/Appointments/EditAppointment";
import AddNewAppointment from "./views/Appointments/AddNewAppointment";
import ViewHealthCareProvider from "./views/Business/ViewHealthCareProvider";
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/change_password",
    name: "Change Password",
    element: Change_Password,
  },
  { path: "/profile/edit", name: "Edit Profile", element: EditProfile },
  // { path: '/profile', name: 'Profile', element: Profile },

  //Product
  { path: "/products", name: "products", element: Products },
  { path: "/product/add", name: "Add products", element: AddProduct },
  { path: "/product/edit/:id", name: "Edit products", element: EditProduct },
  { path: "/product/view/:id", name: "view products", element: ViewProduct },
  //Departure
  { path: "/departures", name: "Departures", element: Departures },
  { path: "/departure/add", name: "Add Departure", element: AddDeparture },
  { path: "/product/edit/:id", name: "Edit products", element: EditProduct },
  { path: "/product/view/:id", name: "view products", element: ViewProduct },

  // Appointments
  { path: "/appointments", name: "Appointments", element: Appointments },
  {
    path: "/appointment/view/:id",
    name: "View Appointment",
    element: ViewAppointment,
  },
  {
    path: "/appointment/edit/:id",
    name: "Edit Appointment",
    element: EditAppointment,
  },
  {
    path: "/appointment/new",
    name: "Add Appointment",
    element: AddNewAppointment,
  },

  // health care providers
  {
    path: "//healthcare/providers",
    name: "healthcare providers",
    element: Businesses,
  },
  {
    path: "//healthcare/providers/add",
    name: "Add healthcare providers",
    element: AddBusiness,
  },
  {
    path: "/healthcare/providers/edit/:id",
    name: "Edit healthcare providers",
    element: EditBusiness,
  },
  {
    path: "/healthcare/providers/view/:id",
    name: "view healthcare providers",
    element: ViewHealthCareProvider,
  },

  // { path: '/franchisee/view/:id', name: 'view franchisee', element: ViewFra },
  //Contact Requests
  {
    path: "/contact/request",
    name: "Contact Requests",
    element: ContactRequests,
  },
  {
    path: "/contact/request/new",
    name: "AddContact Request",
    element: AddContactRequest,
  },
  // { path: '/complaint/view/:id', name: 'view Complain', element: ViewComplaint },
  //Complaints
  { path: "/testimonials", name: "Testimonials", element: Testimonials },
  { path: "/testimonial/new", name: "AddTestimonial", element: AddTestimonial },
  {
    path: "/testimonial/view/:id",
    name: "ViewTestimonial",
    element: ViewTestimonial,
  },
  //informations
  { path: "/informations", name: "Informations", element: Informations },
  {
    path: "/information/new",
    name: "Add Informations",
    element: AddInformations,
  },

  //Order Management

  { path: "/orders/new", name: "New Orders", element: NewOrders },
  { path: "/order/add", name: "add Order", element: AddOrder },
  { path: "/orders/edit/:id", name: "Edit Order", element: EditOrder },
  { path: "/orders/view/:id", name: "View Order", element: ViewOrders },

  // { path: '/orders/processing', name: 'Processing Orders', element: ProcessingOrders },
  // { path: '/orders/dispatched', name: 'Dispatched Orders', element: DispatchedOrders },
  // { path: '/orders/delivered', name: 'Delivered Orders', element: DeliveredOrders },
  // { path: '/orders/cancelled', name: 'Cancelled Orders', element: CancelledOrders },
  // { path: '/orders/returned', name: 'Returned Orders', element: ReturnedOrders },
  { path: "/order/:status/:id", name: "View Order", element: ViewOrder },

  //dashboard

  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  //------------settings------------------------//

  { path: "/policies", name: "Policies", element: Policies },

  { path: "/socialmedia", name: "Social Media", element: Socialmedia },
  { path: "/purpose", name: "Purpose", element: Purpose },
  { path: "/purpose/add", name: "Add Purpose", element: AddPurpose },
  //languge

  { path: "/languages", name: "languages", element: Languages },
  { path: "/language/add", name: "Add languages", element: AddLanguage },
  { path: "/language/edit/:id", name: "Edit languages", element: EditLanguage },
  //business Type

  { path: "/business_type", name: "business", element: BusinessType },
  {
    path: "/business_type/add",
    name: "Add business",
    element: AddBusinessType,
  },
  {
    path: "/business_type/edit/:id",
    name: "Edit business",
    element: EditBusinessType,
  },

  //purpose

  { path: "/purpose", name: "purpose", element: Purpose },
  { path: "/purpose/add", name: "Add purpose", element: AddPurpose },
  { path: "/purpose/edit/:id", name: "Edit purpose", element: EditPurpose },

  //languge
  {
    path: "/application/name",
    name: "ApplicationName",
    element: ApplicationName,
  },
  {
    path: "/copyright/message",
    name: "Copyright Message",
    element: CopyrightMessage,
  },

  { path: "/address", name: "Address", element: Address },
  { path: "/logo", name: "Logo", element: Logo },

  //Taxes
  { path: "/tax", name: "Tax Rates", element: Tax },
  { path: "/tax/add", name: "Add Tax", element: Addtax },
  { path: "/tax/edit/:id", name: "Edit Tax", element: Edittax },
  // -------------------------------------------//

  //
];

export default routes;
