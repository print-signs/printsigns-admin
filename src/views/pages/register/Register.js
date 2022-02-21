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
  const { token } = isAutheticated()
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    cpassword: ''
  });
  const history = useHistory();
  const handleChange = (e) => (event) => {
    setPassword({ ...password, [e]: event.target.value });
  };
  const handleSubmit = async () => {
    if (password.cpassword !== password.newPassword) {
      let res = await axios.put('/owner/changePassword', password, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.statusText === 'OK') {
        Swal.fire({
          title: 'Done',
          text: 'Password Changed',
          icon: 'success',
          confirmButtonText: 'ok',
          confirmButtonColor: '#303c54',
          iconColor: '#303c54'
        }).then(() => {
          history.push('/profile')
        });
      }

    } else {
      alert('new password and confirm password are not matched')
    }

  }

  return (
    <div className="bg-light min-vh-50 d-flex flex-row align-items-flex-start">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Change Password</h1>
                  {/* <p className="text-medium-emphasis">Create your account</p> */}
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput placeholder="Old Password" autoComplete="email" onChange={handleChange('oldPassword')} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange('newPassword')}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      onChange={handleChange('cPassword')}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={() => handleSubmit()}>Submit</CButton>
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
