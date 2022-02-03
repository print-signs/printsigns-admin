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
import { cil3d } from '@coreui/icons'

const AddCourier = () => {
    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Add New Courier</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Unique ID:</h5></CCol>
                            <CCol><h6>5324756898</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Added On:</h5></CCol>
                            <CCol><h6>5324756898</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>

                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Courier Name"
                                autoComplete="courier"
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

export default AddCourier;
