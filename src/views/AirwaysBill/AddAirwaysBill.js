import React, { useEffect } from 'react';
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
import { useState } from 'react';
import axios from 'axios';
import { isAutheticated } from 'src/auth';


const AddAirwaysBill = () => {
    const { token } = isAutheticated()
    const [bill, setBill] = useState({
        vendor_name: '',
        city: '',
        state: 'Andhra Pradesh',
        country: 'India',
        address_1: '',
        address_2: '',

    })
    const [code, setCode] = useState()
    useEffect(() => {
        const generateCode = () => {
            setCode(Math.round(Math.random() * 1000000000))
        }
        const getData = async () => {
            const res = await axios.get('/api/vendor/view',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            console.log(res.data.Stores);
        }
        getData();
        generateCode()
    }, [])
    const formatDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

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
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        </CRow>
                        <CRow className='flex-row align-items-center'>
                            <CCol md={2} ><h4>Date:</h4></CCol>
                            <CCol><h6>{formatDate()}</h6></CCol>
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
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
