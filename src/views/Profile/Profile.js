import React, { useEffect } from 'react'
import {
    CButton,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { useState } from 'react'
import axios from 'axios';
import { isAutheticated } from 'src/auth';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    // const user = JSON.parse(localStorage.getItem('auth')).user
    const [user, setUser] = useState({});
    const { token } = isAutheticated();
    const history = useHistory()
    // console.log(token);
    useEffect(async () => {
        let res = await axios.get('/owner', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res) {
            // console.log(res.data.user._id)
            localStorage.setItem('ownerId', res.data.user._id)
            setUser(res.data.user)
        }
        // console.log(res);
    }, [])


    // console.log(user);
    return (
        <div>
            <CRow>
                <CCol>
                    <h1>Profile</h1>
                </CCol>
                <CCol>
                    <CButton color='dark'
                        className="float-right" onClick={() => history.push('/edit')}>Edit Profile</CButton>
                </CCol>
            </CRow>
            <CTable color="white" striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Cafe Name</CTableHeaderCell>
                        <CTableDataCell scope="col">{user.cafeName}</CTableDataCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableDataCell scope="col">{user.email}</CTableDataCell>
                    </CTableRow>

                    <CTableRow>
                        <CTableHeaderCell scope="row">Address</CTableHeaderCell>
                        <CTableDataCell>{user.location},{user.city},{user.country}</CTableDataCell>
                    </CTableRow>

                    <CTableRow>
                        <CTableHeaderCell scope="row">Item_Name</CTableHeaderCell>
                        <CTableDataCell><img src={user.qr_code} alt="" /></CTableDataCell>
                    </CTableRow>

                </CTableBody>
            </CTable>
        </div>
    )
}

export default Profile
