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
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cil3d } from '@coreui/icons'
import { useState } from 'react';
import axios from 'axios';
import { isAutheticated } from 'src/auth';

const AddCourier = () => {
    const [id, setId] = useState(0);
    const [date, setDate] = useState('')
    const [courier, setCourier] = useState('')
    const { token } = isAutheticated();

    useEffect(() => {
        const getDate = () => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            return today
        }


        const generateCode = () => {
            setId(Math.round(Math.random() * 1000000000))
        }
        generateCode()
        setDate(getDate())
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourier(value)
    }
    const handleClick = async () => {
        let res = await axios.post('/api/courier/add', { name: courier, addedOn: date, UID: id }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (res) {
            console.log(res.data);
        }
    }


    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Add New Courier</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Unique ID:</h5></CCol>
                            <CCol><h6>{id}</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Added On:</h5></CCol>
                            <CCol><h6>{date}</h6></CCol>
                            <p className="text-medium-emphasis">(auto-generated)</p>
                        </CRow>

                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Courier Name"
                                name="courier"
                                onChange={handleChange}
                            />
                        </CInputGroup>
                        <CButton color="dark" className="px-4" onClick={handleClick}>
                            Submit
                        </CButton>

                    </CForm>

                </CCol>
            </CRow>
        </CContainer>
    </div>;
};

export default AddCourier;
