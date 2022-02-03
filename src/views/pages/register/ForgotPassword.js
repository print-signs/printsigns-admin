import React from 'react';
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
import { cilEnvelopeLetter, cilEnvelopeOpen, cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                        <CCardBody className="p-4">
                            <CForm>
                                <h1>Forgot Password?</h1>
                                <p className="text-medium-emphasis"> Enter your email Below we will send you a link to reset your password</p>
                                {/* <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput placeholder="Username" autoComplete="username" />
              </CInputGroup> */}

                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        <CIcon icon={cilEnvelopeOpen} />
                                    </CInputGroupText>
                                    <CFormInput
                                        type="password"
                                        placeholder="Email"
                                        autoComplete="email"
                                    />
                                </CInputGroup>

                                <CButton color="dark">Send</CButton>
                                <Link to='/'>
                                    <CButton color="dark" className='ms-2'>Back to Login</CButton>
                                </Link>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>;
};

export default ForgotPassword;
