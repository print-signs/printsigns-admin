import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { isAutheticated } from 'src/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  ///----------------------//
  const [loading, setLoading] = useState(false)

  const token = isAutheticated()

  // urlcreated images
  const [AppName, setAppName] = useState('')
  const [HeaderlogoUrl, setHeaderlogoUrl] = useState('')
  const [FooterlogoUrl, setFooterlogoUrl] = useState('')
  const [AdminlogoUrl, setAdminlogoUrl] = useState('')

  useEffect(() => {
    async function getConfiguration() {
      const configDetails = await axios.get(`/api/config`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setAppName(configDetails.data.result[0]?.appName)
      configDetails.data.result.map((item) => {
        setHeaderlogoUrl(item?.logo[0]?.Headerlogo)
        setFooterlogoUrl(item?.logo[0]?.Footerlogo)
        setAdminlogoUrl(item?.logo[0]?.Adminlogo)
      })
    }
    getConfiguration()
  }, [])

  //---------------------------//
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none  d-md-flex" style={{ background: 'rgb(140, 213, 213)' }} to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}

        {HeaderlogoUrl ? <Link to='/dashboard'><img src={HeaderlogoUrl} alt='' /></Link> : { AppName } ? <h2>Airport Dashboard</h2> : ''}
        {/* <CIcon className="sidebar-brand-narrow"  height={35} /> */}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
