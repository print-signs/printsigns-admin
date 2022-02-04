import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();

  const handleChange = (e) => (event) => {
    setAuth({ ...auth, [e]: event.target.value });
  };

  const Login = async () => {
    const res = await axios.post("/admin-signin", auth);
    if (res.data.status == "ok") {
      localStorage.setItem("auth", JSON.stringify({
        // user: res.data.user,
        token: res.data.token,
      }));
      history.push('/dashboard')

    }
    else {
      if (res.data.status === "blocked")
        alert(res.data.message)
      else
        alert("Invalid Credentials");
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" onChange={handleChange("email")} autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        onChange={handleChange("password")}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>


                    <CButton color="primary" className="px-4" onClick={Login}>
                      Login
                    </CButton>


                    <Link to="/">
                      <CButton color="dark" className="px-4 ms-2">
                        Cancel
                      </CButton>
                    </Link>
                    <br />

                    <CButton color="link" className="px-0">
                      <Link to="/forgot">
                        Forgot password?
                      </Link>
                    </CButton>


                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
