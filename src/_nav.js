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
