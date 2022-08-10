import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilFace,
  cilFilterSquare,
  cilMoney,
  cilNewspaper,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
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
    name: 'Category',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    to: '/category',
  },
  {
    component: CNavItem,
    name: 'Directory',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    to: '/bisuness',
  },
  {
    component: CNavItem,
    name: 'News',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    to: '/news',
  },
  {
    component: CNavItem,
    name: 'Events',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    to: '/event',
  },
  {
    component: CNavItem,
    name: 'Offers',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    to: '/offer',
  },

  {
    component: CNavItem,
    name: 'Banners',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    to: '/banner',
  },
  {
    component: CNavItem,
    name: 'CMS',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    to: '/cms',
  },
  {
    component: CNavItem,
    name: 'Customer Feedback',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    to: '/feedback',
  },
  {
    component: CNavItem,
    name: 'Requirements',
    icon: <CIcon icon={cilFilterSquare} customClassName="nav-icon" />,
    to: '/requirement',
  },
  // {
  //   component: CNavItem,
  //   name: 'FAQs',
  //   icon: <CIcon icon={cilFace} customClassName="nav-icon" />,
  //   to: '/FAQs',
  // },
  {
    component: CNavItem,
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    to: '/users',
  },



]

export default _nav
