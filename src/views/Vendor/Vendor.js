import React, { useEffect } from 'react';
import {
    CAvatar,
    CButton,
    CButtonGroup,
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
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Vendor = () => {
    const { token } = isAutheticated();
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/vendor/view', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res) {
                setData(res?.data?.Stores)
            }


            console.log(res.data);
        }
        getData();
        data.map(item => console.log(item.city))

    }, []);
    console.log(data);

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/vendor/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === 'Deleted Successfully')) {
            Swal.fire({
                title: 'Done',
                text: 'Vendor Deleted',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                // history.('/vendors');
                location.reload();
            });
        } else {
            Swal("Oops!", "Something went wrong!", "error");
        }
    }


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
            <tbody>{data.map(item => <tr><td>{item.vendor_name}</td>
                <td>{item.code}</td>
                <td>{item.city}</td>
                <td><CButtonGroup role="group" aria-label="Basic mixed styles example">
                    <CButton color="warning" onClick={() => history.push(`/editvendor/${item._id}`)}>Edit</CButton>
                    <CButton color="success" onClick={() => history.push(`/viewvendor/${item._id}`)}>View</CButton>
                    <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>
                </CButtonGroup></td>
            </tr>)}
            </tbody>
        </CTable>
    </div>;
};

export default Vendor;
