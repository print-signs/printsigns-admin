import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { isAutheticated } from 'src/auth'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const history = useHistory();



  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken")
    //console.log(token)
    if (newPassword == confirmPassword) {
      let res = await axios.put('/api/user/update/password',
        {
          oldPassword
          , newPassword,
          confirmPassword
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(res)
      if (res) {
        Swal.fire({
          title: 'Done',
          text: 'Password Changed',
          icon: 'success',
          confirmButtonText: 'ok',
          confirmButtonColor: '#303c54',
          iconColor: '#303c54'
        }).then(() => {
          history.push('/dashboard')
        });
      }

    } else {
      alert('new password and confirm password are not matched')
    }

  }

  return (
    <div className="bg-light min-vh-70 d-flex flex-row align-items-flex-start">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={15} lg={20} xl={16}>
            <CCard className="mx-4">
              <CCardBody className="p-1">
                <CForm>
                  <h2 className="mb-3">Change Password</h2>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput placeholder="Old Password" autoComplete="email" onChange={(e) => setOldPassword(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"

                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>Submit</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
