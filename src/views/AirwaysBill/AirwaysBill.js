import React, { useEffect, useState } from 'react';
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

const AirwaysBill = () => {
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
            console.log(res.data);
        }
        getData();

    }, []);

    return <div>

        <CButton color="dark">+ Upload Spreadsheet</CButton>
        <Link to='/addairwaysbill'>
            <CButton className='ms-3' color="dark">+Add New Entry</CButton>
        </Link>
        <hr />
        <CTable striped hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vendor</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">To (Name)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">AWB</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableHeaderCell scope="row">Mark</CTableHeaderCell>
                    <CTableDataCell>123</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>123</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic mixed styles example">
                            <CButton color="success">View</CButton>

                        </CButtonGroup>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable></div>;
};

export default AirwaysBill;
