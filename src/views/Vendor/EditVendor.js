import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Country, State, City } from 'country-state-city';
import { cilGlobeAlt, cilLocationPin, cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllStates, getStatesOfCountry, getCitiesOfCountry } from 'country-state-city/dist/lib/state';
import { isAutheticated } from 'src/auth';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';


const AddVendor = () => {
    const [vendor, setVendor] = useState({
        vendor_name: '',
        city: '',
        state: 'Andhra Pradesh',
        country: 'India',
        address_1: '',
        address_2: '',
    })
    const history = useHistory()
    const { id } = useParams();
    const { token } = isAutheticated();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryCode, setCountryCode] = useState('IN')
    const [stateCode, setStateCode] = useState('AP')
    const countries = Country.getAllCountries();
    const allStates = State.getAllStates();
    const [data, setData] = useState([]);
    // const Code = Math.round(Math.random() * 1000000000);
    const handleChange = (e) => (event) => {
        setVendor({ ...vendor, [e]: event.target.value });
    };
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`api/vendor/view/${id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res) {
                setData(res?.data?.Store)
                setVendor(res?.data?.Store)
            }


            console.log(res.data);
        }
        getData();


    }, []);
    // console.log(vendor);
    useEffect(() => {
        const ccode = countries.find(item => item.name === vendor.country)
        const scode = allStates.find(item => item.name === vendor.state)
        console.log(ccode.isoCode + ":" + scode.isoCode);
        console.log(vendor.country, vendor.state);
        setCountryCode(ccode.isoCode)
        setStateCode(scode.isoCode)
        setStates(prev => State.getStatesOfCountry(countryCode))
        setCities(prev => City.getCitiesOfState(countryCode, stateCode))
    }, [vendor.country, vendor.state, countryCode, stateCode]);
    console.log(data);
    const handleClick = async () => {
        let res = await axios.put(`/api/vendor/${id}`, vendor, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === "Success")) {
            Swal.fire({
                title: 'Done',
                text: 'vendor Updated',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                history.push('/vendors');
            });
        } else {
            Swal("Oops!", "Something went wrong!", "error");
        }
    }

    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Edit Vendor</h1>
                        {/* <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p> */}
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h4>Code:</h4></CCol>
                            <CCol><h6>{data?.code}</h6></CCol>
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        </CRow>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput placeholder="Vendor Name" autoComplete="vendorname" value={vendor.vendor_name} onChange={handleChange("vendor_name")} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Address Line 1"
                                value={vendor.address_1}
                                onChange={handleChange("address_1")}
                            />
                            <CFormInput
                                type="text"
                                placeholder="Address Line 2(area)"
                                autoComplete="address2"
                                value={vendor.address_2}
                                onChange={handleChange("address_2")}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilGlobeAlt} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange("country")}
                            >
                                <option value='India'>{data.country}</option>{
                                    countries.map((item) =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange("state")}
                            >
                                <option value='Chandigarh'>{data.state}</option>{
                                    states.map((item) =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange("city")}
                                placeholder='Select City'
                            >
                                <option value='Mumbai'>{data.city}</option>{
                                    cities.map((item) =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                        </CInputGroup>
                        <CButton color="dark" className="px-4" onClick={handleClick}>
                            Submit
                        </CButton>

                    </CForm>

                </CCol>
            </CRow>
        </CContainer>
    </div>;
};

export default AddVendor;
