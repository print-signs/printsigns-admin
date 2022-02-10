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
    CFormInput,
    CInputGroup,
    CInputGroupText,
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
    const [file, setFile] = useState(null)
    let formData = new FormData();

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
    const handleChange = (e) => {
        setFile(e.target.files[0])

    }
    const handleClick = async () => {

        formData.append('file', file, file.name)

        console.log(...formData)

        const res = await axios.post('/api/airways/upload', { file: formData }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        }).catch(error => {
            console.log(error);
        })
        console.log(res)

    }
    console.log(file);
    return <div>
        <CRow><CCol sm='auto'>
            <CInputGroup className="mb-3" >
                <CFormInput type="file" id="inputGroupFile02" onChange={e => handleChange(e)} />
                <CButton component="label" color='dark' onClick={() => handleClick()}>Upload Spreadsheet</CButton>
            </CInputGroup>
        </CCol>

            <CCol sm='auto'> <Link to='/addairwaysbill'>
                <CButton className='ms-3' color="dark">+Add New Entry</CButton>
            </Link></CCol>

        </CRow>
        <hr />
        <CTable striped hover >
            <CTableHead >
                <CTableRow>

                    <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>


                    <CTableHeaderCell scope="col">Shipped From
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Logistic Name
                    </CTableHeaderCell>

                    <CTableHeaderCell scope="col">AWB No
                    </CTableHeaderCell>


                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <tbody>
                {data.map(item =>
                    <tr>
                        <td scope="row">{item.Order_No}</td>
                        <td>{item.Client_Name}</td>
                        <td>{item.Shipped_From}</td>
                        <td>{item.Logistic_Name}</td>
                        <td>{item.AWB_No}</td>
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
