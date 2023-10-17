import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAddressBook,
  cilAppsSettings,
  cilBrush,
  cilCart,
  cilCat,
  cilClipboard,
  cilCommand,
  cilCompress,
  cilContact,
  cilLanguage,
  cilLoopCircular,
  cilMedicalCross,
  cilNotes,
  cilSpeedometer,
  cilSwapHorizontal,
  cilTennisBall,
  cilText,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Users",
    icon: <CIcon icon={cilTennisBall} customClassName="nav-icon" />,
    to: "/users",
  },
  {
    component: CNavItem,
    name: "Categories",
    icon: <CIcon icon={cilCat} customClassName="nav-icon" />,
    to: "/categories",
  },
  {
    component: CNavItem,
    name: "Products",
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    to: "/products",
  },
  {
    component: CNavGroup,
    name: "Orders",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "New",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/new",
      },
      {
        component: CNavItem,
        name: "Paid",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/returned",
      },
      {
        component: CNavItem,
        name: "Processing",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/processing",
      },
      {
        component: CNavItem,
        name: "Dispatched",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/dispatched",
      },
      {
        component: CNavItem,
        name: "Delivered",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/delivered",
      },
      {
        component: CNavItem,
        name: "Cancelled",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: "/orders/cancelled",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Website Related",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Testimonials",
        icon: <CIcon icon={cilCompress} customClassName="nav-icon" />,
        to: "/testimonials",
      },
      {
        component: CNavItem,
        name: "Contact Requests",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
        to: "/contact/request",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Configuration",
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Social Media",
        icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
        to: "/socialmedia",
      },
      {
        component: CNavItem,
        name: "Application Name",
        icon: <CIcon icon={cilText} customClassName="nav-icon" />,
        to: "/application/name",
      },

      {
        component: CNavItem,
        name: "Address",
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: "/address",
      },
      {
        component: CNavItem,
        name: "Logos",
        icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
        to: "/logo",
      },
      {
        component: CNavItem,
        name: "Copyright Message",
        icon: <CIcon icon={cilText} customClassName="nav-icon" />,
        to: "/copyright/message",
      },
    ],
  },
];

export default _nav;
