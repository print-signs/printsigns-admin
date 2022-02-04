import React, { useEffect } from 'react';
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CContainer,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom';
import { isAutheticated } from 'src/auth';
import axios from 'axios';

const Courier = () => {
    const { token } = isAutheticated();
    console.log(token);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/vendor/view', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res);
        }
        getData();

    }, []);
    return <div>
        <Link to='/addcourier'>
            <CButton color="dark">+Add New</CButton>
        </Link>
        <hr />
        <CTable striped hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Courier Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unique ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Added On</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableHeaderCell scope="row">FedEx</CTableHeaderCell>
                    <CTableDataCell>123</CTableDataCell>
                    <CTableDataCell>123-1234-123</CTableDataCell>
                    <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic mixed styles example">
                            <CButton color="warning">Edit</CButton>
                            <CButton color="danger">Delete</CButton>
                        </CButtonGroup>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </div>;
};

export default Courier;
