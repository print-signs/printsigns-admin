import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilAppsSettings,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCommand,
  cilCursor,
  cilDrop,
  cilFace,
  cilFilterSquare,
  cilMedicalCross,
  cilMoney,
  cilMugTea,
  cilNewspaper,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSitemap,
  cilSpeedometer,
  cilStar,
  cilTablet,
  cilTennisBall,
  cilUser,


} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },


  {
    component: CNavItem,
    name: 'Temples',
    icon: <CIcon icon={cilTennisBall} customClassName="nav-icon" />,
    to: '/temples',
  },

  {
    component: CNavItem,
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    to: '/users',
  },
  {
    component: CNavGroup,
    name: 'Configuration',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cities',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: '/cities',
      },
      {
        component: CNavItem,
        name: 'States',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: '/states',
      },
      // {
      //   component: CNavItem,
      //   name: 'Standard Shipping',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/shipping',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Custom Shipping',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/custom-shipping',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pincode',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/pincode',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Tax Rates',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/tax',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pages',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/page',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Terms of Use',
      //   icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
      //   to: '/terms_of_use',
      // },
      {
        component: CNavItem,
        name: 'Social Media',
        icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
        to: '/socialmedia',
      },
      {
        component: CNavItem,
        name: 'Address',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/address',
      },
      {
        component: CNavItem,
        name: 'Logos',
        icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
        to: '/logo',
      },
    ],
  },



]

export default _nav
