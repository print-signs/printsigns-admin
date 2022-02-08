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
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react'
import { Country, State, City } from 'country-state-city';
import { cilGlobeAlt, cilLocationPin, cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getAllStates, getStatesOfCountry, getCitiesOfCountry } from 'country-state-city/dist/lib/state';
import { isAutheticated } from 'src/auth';
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
    const { token } = isAutheticated();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [code, setCode] = useState(0);
    const [countryCode, setCountryCode] = useState('IN')
    const [stateCode, setStateCode] = useState('AP')
    const countries = Country.getAllCountries();
    const allStates = State.getAllStates();
    // const Code = Math.round(Math.random() * 1000000000);
    const handleChange = (e) => (event) => {
        setVendor({ ...vendor, [e]: event.target.value });
    };

    useEffect(() => {
        const generateCode = () => {
            setCode(Math.round(Math.random() * 1000000000))
        }
        generateCode()
    }, [])
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

    const handleClick = async () => {
        let res = await axios.post('/api/vendor/add', { ...vendor, code }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === "Success")) {
            Swal.fire({
                title: 'Done',
                text: 'Vendor Added',
                icon: 'success',
                confirmButtonText: 'ok',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                history.push('/courier');
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
                        <h1>Add New Vendor</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new vendor</p>
                        <CRow className=' flex-row align-items-center'>
                            <CCol md={2} ><h4>Code:</h4></CCol>
                            <CCol><h6>{code}</h6></CCol>
                            {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        </CRow>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput placeholder="Vendor Name" autoComplete="vendorname" onChange={handleChange("vendor_name")} />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Address Line 1"
                                onChange={handleChange("address_1")}
                            />
                            <CFormInput
                                type="text"
                                placeholder="Address Line 2(area)"
                                autoComplete="address2"
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
                                <option value='India'>Select Country</option>{
                                    countries.map((item) =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange("state")}
                            >
                                <option value='Chandigarh'>Select State</option>{
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
                                <option value='Mumbai'>Select City</option>{
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
