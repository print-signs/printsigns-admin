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
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const EditCourier = () => {
    // const [id, setId] = useState(0);
    const [date, setDate] = useState('')
    const [courier, setCourier] = useState()
    const { token } = isAutheticated();
    const { id } = useParams();
    const [data, setData] = useState([])
    const history = useHistory();
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/courier/${id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);
            setData(res.data?.Pincode[0])
            setCourier(res.data?.Pincode[0].name)
            console.log(data);
        }
        getData();

    }, []);

    useEffect(() => {
        const getDate = () => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            return today
        }


        const generateCode = () => {
            // setId(Math.round(Math.random() * 1000000000))
        }
        generateCode()
        setDate(getDate())
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourier(value)
    }
    const handleClick = async () => {
        let res = await axios.put(`/api/courier/${id}`, { name: courier }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === "Success")) {
            Swal.fire({
                title: 'Updated',
                text: 'Courier Updated',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                history.push('/courier');
            });
        } else {
            Swal("Oops!", "Something went wrong!", "error");
        }
    }
    const formatDate = (date) => {
        let today = new Date(date);
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
                        <h1>Edit Courier</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Unique ID:</h5></CCol>
                            <CCol><h6>{id}</h6></CCol>
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        </CRow>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h5>Added On:</h5></CCol>
                            <CCol><h6>{formatDate(data.createdAt)}</h6></CCol>
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        </CRow>

                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Courier Name"
                                name="courier"
                                value={courier}
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

export default EditCourier;
