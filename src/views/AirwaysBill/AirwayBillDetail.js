import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { isAutheticated } from '../../auth';



const AirwayBillDetail = () => {
    const [data, setData] = useState({});
    const { id } = useParams()
    const { token } = isAutheticated();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/airways/view/${id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res) {
                setData(res?.data?.Store)
            }

        }
        getData();
    }, []);
    console.log(data);
    const formatDate = (date) => {
        let today = new Date(date);
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }


    return <div >
        <h1>Bill Details</h1>
        <CTable color="dark" striped>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Unique ID</CTableHeaderCell>
                    <CTableDataCell scope="col">{data._id}</CTableDataCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.code}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">AWB</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.AWB}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Vendor Name</CTableHeaderCell>
                    <CTableDataCell>{data.vendor_name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Added On</CTableHeaderCell>
                    <CTableDataCell>{formatDate(data.createdAt)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">From Address</CTableHeaderCell>
                    <CTableDataCell>{data.from_address_1},{data.from_address_2},{data.city},{data.state},{data.country}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">To Address</CTableHeaderCell>
                    <CTableDataCell>{data.to_address_1},{data.to_address_2}</CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </div>;
};

export default AirwayBillDetail;
