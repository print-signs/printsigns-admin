import React from 'react'
import { CForm, CCol, CFormLabel, CContainer, CRow, CCardGroup, CCard, CCardBody, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react'
import { Country, City } from 'country-state-city'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isAutheticated } from 'src/auth'
const EditProfile = () => {
    const [cities, setCities] = useState([])
    const { token } = isAutheticated()
    const [ownerDetails, setOwnerDetails] = useState({
        cafeName: '',
        email: '',
        location: '',
        country: 'India',
        city: ''
    })
    const history = useHistory()
    const [processing, setProcessing] = useState(false)
    const countries = Country.getAllCountries()
    useEffect(() => {
        const countryCode = countries.find(item => item.name === ownerDetails.country)
        setCities(() => City.getCitiesOfCountry(countryCode?.isoCode))
        getData()

    }, [ownerDetails.country])

    const getData = async () => {
        let res = await axios.get('/owner', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res) {
            setOwnerDetails({ ...res.data.user })
        }
    }
    console.log(ownerDetails);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setOwnerDetails({ ...ownerDetails, [name]: value });
    };


    async function handleSubmit() {

        let res = await axios.put(`/owner`, ownerDetails, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        setProcessing(true)
        console.log(res.data);

        if (res) {
            // localStorage.setItem("auth", JSON.stringify({

            //     token: res.data.token,
            // }));
            history.push('/profile')
        }
    }

    return (
        <div >
            <CContainer >
                <CRow className="justify-content-center mt-3">

                    <CCol md={8} className='mt-5'>
                        <CCardGroup>
                            <CCard className="p-4">

                                <CCardBody>
                                    <h1 >Edit Profile</h1>
                                    <CForm className="row g-3">
                                        <CCol xs={12}>
                                            <CFormLabel htmlFor="inputAddress">Cafe Name</CFormLabel>
                                            <CFormInput id="inputAddress" placeholder="" name='cafeName' value={ownerDetails.cafeName} onChange={handleChange} />
                                        </CCol>

                                        <CCol md={6}>
                                            <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                                            <CFormInput type="email" id="inputEmail4" name='email' value={ownerDetails.email} onChange={handleChange} />
                                        </CCol>
                                        {/* <CCol md={6}>
                                            <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
                                            <CFormInput type="password" id="inputPassword4" name='password' value={ownerDetails.password} onChange={handleChange} />
                                        </CCol> */}


                                        <CCol md={12}>
                                            <CFormLabel htmlFor="inputCity">Location</CFormLabel>
                                            <CFormInput id="inputCity" name='location' value={ownerDetails.location} onChange={handleChange} />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="inputState">Country</CFormLabel>
                                            <CFormSelect id="inputState" name='country' onChange={handleChange}>
                                                <option>Select a country</option>
                                                {countries.map(item => <option value={item.name}>{item.name}</option>)}

                                            </CFormSelect>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel htmlFor="inputState">City</CFormLabel>
                                            <CFormSelect id="inputState" name='city' onChange={handleChange}>
                                                <option>Select a city</option>
                                                {cities.map(item => <option value={item.name}>{item.name}</option>)}

                                            </CFormSelect>
                                        </CCol>

                                        <CCol xs={12}>
                                            <CButton onClick={handleSubmit} color='dark'>Submit</CButton>
                                        </CCol>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default EditProfile