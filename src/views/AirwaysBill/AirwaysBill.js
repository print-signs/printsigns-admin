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
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/airways/view', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);
            setData(res.data.Stores)
        }
        getData();

    }, []);
    const formatDate = (date) => {
        let today = new Date(date);
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

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
            <tbody>
                {data.map(item =>
                    <tr>
                        <td scope="row">{item.code}</td>
                        <td>{item.vendor_name}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.to_name}</td>
                        <td>{item.AWB}</td>
                        <td>
                            <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                <Link to={`/viewbill/${item._id}`}><CButton color="success">View</CButton></Link>

                            </CButtonGroup>
                        </td>
                    </tr>

                )}

            </tbody>
        </CTable></div>;
};

export default AirwaysBill;
