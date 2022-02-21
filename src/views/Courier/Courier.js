import React, { useEffect, useState } from 'react';
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
import { isAutheticated } from 'src/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';


const Courier = () => {
    const { token } = isAutheticated();
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/courier', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);
            setData(res.data.Pincode)
            console.log(data);
        }
        getData();

    }, [reload]);
    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/courier/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === "Success")) {
            Swal.fire({
                title: 'Updated',
                text: 'Courier Deleted',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                // history.push('/courier');
                // location.reload();
                setReload(!reload)
            });
        } else {
            Swal("Oops!", "Something went wrong!", "error");
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
    return <div>
        <Link to='/addcourier'>
            <CButton color="dark">+Add New</CButton>
        </Link>
        <hr />
        <CTable striped hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Courier Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unique ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Added On</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <tbody>
                {data.map(item =>
                    <tr>
                        <td scope="row">{item.name}</td>
                        <td>{item._id}</td>
                        {/* <td>{item.code}</td> */}
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                            <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                <Link to={`/editcourier/${item._id}`}> <CButton color="warning">Edit</CButton></Link>
                                <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                )}

            </tbody>
        </CTable>
    </div>;
};

export default Courier;
