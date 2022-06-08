import React, { lazy } from 'react'



const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



  return (
    <>
      <WidgetsDropdown />

    </>
  )
}

export default Dashboard
