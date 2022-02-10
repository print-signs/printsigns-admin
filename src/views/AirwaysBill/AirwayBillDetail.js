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
                    <CTableHeaderCell scope="col">Actual Billing</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Actual_Billing}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">AWB</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.AWB_No}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Actual Margin</CTableHeaderCell>
                    <CTableDataCell>{data.Actual_Margin}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Added On</CTableHeaderCell>
                    <CTableDataCell>{formatDate(data.createdAt)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Actual_Weight</CTableHeaderCell>
                    <CTableDataCell>{data.Actual_Weight}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Client Name</CTableHeaderCell>
                    <CTableDataCell>{data.Client_Name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Country}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Customer Address</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Customer_Address}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Customer_Billing</CTableHeaderCell>
                    <CTableDataCell>{data.Customer_Billing}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Customer_Name</CTableHeaderCell>
                    <CTableDataCell>{data.Customer_Name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Customer_Phone</CTableHeaderCell>
                    <CTableDataCell>{data.Customer_Phone}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Date Of Dispatch</CTableHeaderCell>
                    <CTableDataCell>{formatDate(data.Date_Of_Dispatch)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Dimension_Weight</CTableHeaderCell>
                    <CTableDataCell>{data.Dimension_Weight}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Dimensions</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Dimensions}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Invoice_No}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Item_Name</CTableHeaderCell>
                    <CTableDataCell>{data.Item_Name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Logistic_Name</CTableHeaderCell>
                    <CTableDataCell>{data.Logistic_Name}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Order_No</CTableHeaderCell>
                    <CTableDataCell>{data.Order_No}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Projected_Margin</CTableHeaderCell>
                    <CTableDataCell>{data.Projected_Margin}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Recieved_Amount</CTableHeaderCell>
                    <CTableDataCell>{data.Recieved_Amount}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Recieved_Date</CTableHeaderCell>
                    <CTableDataCell scope="col">{formatDate(data.Recieved_Date)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="col">Shipment_Charges</CTableHeaderCell>
                    <CTableDataCell scope="col">{data.Shipment_Charges}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Shipments</CTableHeaderCell>
                    <CTableDataCell>{data.Shipments}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Shipped_From</CTableHeaderCell>
                    <CTableDataCell>{data.Shipped_From}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableHeaderCell scope="row">Total_Weight</CTableHeaderCell>
                    <CTableDataCell>{data.Total_Weight}</CTableDataCell>
                </CTableRow>

            </CTableBody>
        </CTable>
    </div>;
};

export default AirwayBillDetail;
