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
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cil3d, cilAirplaneMode, cilGlobeAlt, cilLocationPin, cilLockLocked, cilPeople, cilUser } from '@coreui/icons'


const AddAirwaysBill = () => {
    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Add New Bill</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new bill</p>
                        <CRow className='flex-row align-items-center'>
                            <CCol md={2} ><h4>ID:</h4></CCol>
                            <CCol><h6>5324756898</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>
                        <CRow className='flex-row align-items-center'>
                            <CCol md={2} ><h4>Date:</h4></CCol>
                            <CCol><h6>11/11/11</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                options={[
                                    'Select Vendor',
                                    { label: 'One', value: '1' },
                                    { label: 'Two', value: '2' },
                                    { label: 'Three', value: '3', disabled: true }
                                ]}
                            />
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
                                <CIcon icon={cilPeople} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="To (Name)"
                                autoComplete="toname"
                            />

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
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                options={[
                                    'Select Courier',
                                    { label: 'One', value: '1' },
                                    { label: 'Two', value: '2' },
                                    { label: 'Three', value: '3', disabled: true }
                                ]}
                            /></CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilAirplaneMode} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="AWB"
                                autoComplete="AWB"
                            />
                        </CInputGroup>
                        <CButton color="dark" className="px-4">
                            Submit
                        </CButton>

                    </CForm>

                </CCol>
            </CRow>
        </CContainer>
    </div>;;
};

export default AddAirwaysBill;
