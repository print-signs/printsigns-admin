import React, { useEffect, useState } from 'react';
import {
    CAvatar,
    CBadge,
    CButton,
    CButtonGroup,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom';
import { isAutheticated } from 'src/auth';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ExportToExcel } from './ExportToExcel';


const AirwaysBill = () => {
    const { token } = isAutheticated();
    const [data, setData] = useState([])
    const [showData, setShowData] = useState([])
    const [showVendors, setShowVendors] = useState([])
    const [showCouriers, setShowCouriers] = useState([])
    const [filter, setFilter] = useState({
        courier: '',
        vendor: '',
        state: ''
    })
    const [file, setFile] = useState(null)
    const history = useHistory()
    const fileName = 'AirwaysBill'
    let formData = new FormData();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/airways/view', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const couriers = await axios.get('/api/courier',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            const vendors = await axios.get('/api/vendor/view',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            setShowVendors(vendors.data.Stores)
            setShowCouriers(couriers.data.Pincode)
            // console.log(res.data.Stores);
            setData(res.data.Stores)
            setShowData(res.data.Stores)

        }
        getData();

    }, []);
    useEffect(() => {
        filterData();

    }, [filter.courier, filter.vendor])

    const filterData = () => {

        const newData = data.filter(item => item.Logistic_Name?.toLowerCase() === filter.courier?.toLowerCase() || item.Client_Name?.toLowerCase() === filter.vendor?.toLowerCase())
        if (filter.courier === '' && filter.vendor === '') {
            setShowData(data)
        } else {
            setShowData(newData)
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
    const handleFile = (e) => {
        setFile(e.target.files[0])

    }
    const handleChange = (e) => (event) => {
        setFilter({ ...filter, [e]: event.target.value });
    };
    const handleClick = async () => {

        formData.append('file', file, file.name)

        // console.log(...formData)

        const res = await axios.post('/api/airways/upload', formData, {
            headers: {

                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${token}`
            }
        }).catch(error => {
            console.log(error);
        })
        console.log(res)

    }

    return <div>
        <CRow><CCol sm='auto'>
            <CInputGroup className="mb-3" >
                <CFormInput type="file" id="inputGroupFile02" onChange={e => handleFile(e)} />
                <CButton component="label" color='dark' onClick={() => handleClick()}>Upload Spreadsheet</CButton>
            </CInputGroup>
        </CCol>

            <CCol sm='auto'> <Link to='/addairwaysbill'>
                <CButton className='ms-3' color="dark">+Add New Entry</CButton>
            </Link></CCol>
            <CCol sm='auto'>
                <ExportToExcel apiData={data} fileName={fileName} />
            </CCol>
        </CRow>
        <CRow><CCol sm='auto'>
            <CInputGroup className="mb-3" >
                <CFormSelect
                    aria-label="Default select example"
                    onChange={handleChange('vendor')}
                >
                    <option value=''>Select Vendor</option>{
                        showVendors.map((item) =>

                            <option value={item.vendor_name}>{item.vendor_name}</option>
                        )
                    }
                </CFormSelect>
            </CInputGroup>
        </CCol>

            <CCol sm='auto'>
                <CInputGroup className="mb-3" >
                    <CFormSelect
                        aria-label="Default select example"
                        onChange={handleChange('courier')}
                    >
                        <option value=''>Select Courier</option>{
                            showCouriers.map((item) =>

                                <option value={item.name}>{item.name}</option>
                            )
                        }
                    </CFormSelect>
                </CInputGroup>
            </CCol>

        </CRow>
        <hr />
        <CTable striped hover >
            <CTableHead >
                <CTableRow>

                    <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Vendor</CTableHeaderCell>


                    {/* <CTableHeaderCell scope="col">Shipped From
                    </CTableHeaderCell> */}

                    <CTableHeaderCell scope="col">Courier
                    </CTableHeaderCell>

                    <CTableHeaderCell scope="col">AWB No
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <tbody>
                {(!showData ? data : showData).map(item =>
                    <tr>
                        <td scope="row">{item.Order_No}</td>
                        <td>{item.Client_Name}</td>
                        {/* <td>{item.Shipped_From}</td> */}
                        <td>{item.Logistic_Name}</td>
                        <td>{item.AWB_No}</td>
                        <td><CBadge color='primary' >Delivered</CBadge></td>
                        <td>
                            <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                <CButton color="success" onClick={() => history.push(`/viewbill/${item._id}`)}>View</CButton>
                                <CButton color="warning" onClick={() => history.push(`/editbill/${item._id}`)}>Edit</CButton>

                            </CButtonGroup>
                        </td>
                    </tr>

                )}

            </tbody>
        </CTable></div>;
};

export default AirwaysBill;
