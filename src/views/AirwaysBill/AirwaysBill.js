import React from 'react';
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

const AirwaysBill = () => {
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
