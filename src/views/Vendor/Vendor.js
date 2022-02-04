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
import axios from 'axios';
import { isAutheticated } from '../../auth';

const Vendor = () => {
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
        <Link to='/addvendor'>
            <CButton color="dark">+Add New Vendor</CButton>
        </Link>
        <hr />
        <CTable striped hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Area</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableHeaderCell scope="row">Mark</CTableHeaderCell>
                    <CTableDataCell>123</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic mixed styles example">
                            <CButton color="warning">Edit</CButton>
                            <CButton color="success">View</CButton>
                            <CButton color="danger">Delete</CButton>
                        </CButtonGroup>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </div>;
};

export default Vendor;
