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

const Vendor = () => {
    return <div>

        <CButton color="dark">+Add New Vendor</CButton>
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
