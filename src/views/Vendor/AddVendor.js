import React from 'react';
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
import { cilGlobeAlt, cilLocationPin, cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom';
const AddVendor = () => {
    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Add New Vendor</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h4>Code:</h4></CCol>
                            <CCol><h6>5324756898</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput placeholder="Vendor Name" autoComplete="vendorname" />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Address Line 1"
                            // autoComplete="address"
                            />
                            <CFormInput
                                type="text"
                                placeholder="Address Line 2(area)"
                                autoComplete="address2"
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilGlobeAlt} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Country"
                                autoComplete="country"
                            />
                            <CFormInput
                                type="text"
                                placeholder="State"
                                autoComplete="state"
                            />
                            <CFormInput
                                type="text"
                                placeholder="City"
                                autoComplete="city"
                            />
                        </CInputGroup>
                        <CButton color="dark" className="px-4">
                            Submit
                        </CButton>

                    </CForm>

                </CCol>
            </CRow>
        </CContainer>
    </div>;
};

export default AddVendor;
