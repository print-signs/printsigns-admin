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
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();

  const handleChange = (e) => (event) => {
    setAuth({ ...auth, [e]: event.target.value });
  };

  const Login = async () => {
    setLoading({ loading: true })
    const res = await axios.post("/api/v1/user/login/", auth);
    if (res.data.success == true) {
      localStorage.setItem("authToken", res.data.token)
      history.push('/dashboard')
      setLoading(false);
      window.location.reload()


    }
    else {
      alert("Invalid Credentials");
      setLoading(false);
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
                    <p className="text-medium-emphasis">Sign In to Your CMP Dashboard Account.</p>
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
                      <ClipLoader loading={loading} size={18} />
                      {!loading && "Login"}

                    </CButton>


                    <Link to="/">
                      <CButton color="dark" className="px-4 ms-2">
                        Cancel
                      </CButton>
                    </Link>
                    <br />

                    {/* <CButton color="link" className="px-0">
                      <Link to="/forgot">
                        Forgot password?
                      </Link>
                    </CButton> */}


                  </CForm>
                </CCardBody>
                {/* <CButton color="" className="px-0">
                  <Link to="/newRegister">
                    dont have an account? Sign Up
                  </Link>
                </CButton> */}
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
