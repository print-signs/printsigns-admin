import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
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


]

export default _nav
