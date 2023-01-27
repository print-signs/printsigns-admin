import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>

        <span className="ms-1">{new Date().getFullYear()} &copy; Any Time Prasad ( ATP ) .</span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)
