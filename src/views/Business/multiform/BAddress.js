
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { isAutheticated } from 'src/auth'
// import { WebsiteURL } from '../WebsiteURL'
import { Country, State, City } from 'country-state-city';


const BAddress = (props) => {
    const token = isAutheticated()
    const navigate = useNavigate()

    const { data, setData } = props.data

    const { loading, setLoading } = props.loading
    // const categories = props?.categories || []

    const handleChange = (e) => {
        // if (e.target.id === 'master_price' && /^\D+$/.test(e.target.value)) return
        // if (e.target.id === 'discontinue_on') {
        //     if (new Date(e.target.value) < new Date()) {
        //         return setData((prev) => ({
        //             ...prev,
        //             [e.target.id]: new Date().toISOString().slice(0, 10),
        //         }))
        //     }
        // }
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    // const [data, setData] = useState({
    //     image: '',
    //     imageURL: '',
    //     address_Line_1: '',
    //     address_Line_2: '',
    //     address_line_1: '',
    //     address_line_2: '',
    //     city: '',
    //     state_name: '',
    //     short_url: '',
    //     contact_Number: '',
    //     contact_Person_Name: '',
    //     price_Lable: '',
    //     pin_Code: ''
    // })

    // const [cities, setCities] = useState([])

    // const [loading, setLoading] = useState(false)
    const [validForm, setValidForm] = useState(false)


    const [limiter, setLimiter] = useState({
        address_Line_1: 100,
        nameHas: 100,
    })



    //country, city and state
    const [countryCode, setCountryCode] = useState();

    const [stateCode, setStateCode] = useState();
    const country = Country.getAllCountries()

    useEffect(() => {

        country.map(item => {


            if (item.name === data.country) {
                setCountryCode(item.isoCode)
                // console.log(data.state)
            }
        })

    }, [data.country])
    const state = State.getStatesOfCountry(countryCode)
    useEffect(() => {

        state.map(item => {


            if (item.name === data.state) {
                setStateCode(item.isoCode)
                // console.log(data.state)
            }
        })

    }, [data.state])


    const handleSubmit = () => {
        if (
            data.address_Line_1.trim() === '' ||
            data.address_Line_2.trim() === '' ||
            data.contact_Number === '' ||

            data.contact_Person_Name === '' ||
            data.address_line_1.trim() === '' ||
            data.address_line_2.trim() === '' ||
            data.price_Lable.trim() === '' ||
            data.city === '' ||
            data.pin_Code.trim() === '' ||
            data.short_url === '' ||
            data.state_name === ''
            // data.imageURL.trim() === ''
        ) {
            swal({
                title: 'Warning',
                text: 'Fill all mandatory fields',
                icon: 'error',
                button: 'Close',
                dangerMode: true,
            })
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.set('address_Line_1', data.address_Line_1)
        formData.set('address_Line_2', data.address_Line_2)

        formData.set('address_line_1', data.address_line_1)
        formData.set('address_line_2', data.address_line_2)
        formData.set('city', data.city)
        formData.set('state_name', data.state_name)
        formData.set('contact_Number', data.contact_Number)
        formData.set('contact_Person_Name', data.contact_Person_Name)

        formData.set('price_Lable', data.price_Lable)
        formData.set('pin_Code', data.pin_Code)
        formData.set('url', WebsiteURL + data.short_url + '/login')
        formData.set('short_url', data.short_url)

        formData.append('image', data.image)
        axios
            .post(`/api/franchisee/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/formdata',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                swal({
                    title: 'Added',
                    text: res?.data?.message ? res?.data?.message : 'Franchisee added successfully!',
                    icon: 'success',
                    button: 'Return',
                })
                setLoading(false)
                navigate('/franchisees', { replace: true })
            })
            .catch((err) => {
                setLoading(false)
                const message = err.response?.data?.message || 'Something went wrong!'
                swal({
                    title: 'Warning',
                    text: message,
                    icon: 'error',
                    button: 'Retry',
                    dangerMode: true,
                })
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div
                        className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                    >
                        <div style={{ fontSize: '22px' }} className="fw-bold">
                            Address
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <h4 className="mb-0"></h4>
                        </div>

                        <div className="page-title-right">
                            {/* <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    textTransform: 'capitalize',
                                    marginRight: '5px',
                                }}
                                onClick={() => handleSubmit()}
                                disabled={loading}
                            >
                                {loading ? 'Loading' : 'Save'}
                            </Button> */}
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    textTransform: 'capitalize',
                                }}
                                onClick={() => props.handleView(3)}

                            >
                                Prev
                            </Button>


                        </div>
                    </div>
                </div>
            </div>



            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 my-1">
                    <div className="card h-100">
                        <div className="card-body px-5">




                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Address Line 1*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address_Line_1"
                                    value={data.address_Line_1}
                                    maxLength="50"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Address Line 2*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address_Line_2"
                                    value={data.address_Line_2}
                                    maxLength="50"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Country *
                                </label>
                                <select
                                    onChange={(e) => handleChange(e)}
                                    value={data.country}
                                    className="form-control"
                                    id="country"
                                >
                                    <option value="1">---select---</option>
                                    {Country.getAllCountries().map((item, index) =>
                                        /* {City.getCountryByCode('IN') && City.getCountryByCode('IN').map((item, index) => */
                                        <option key={index} value={item?.name} >{item?.name}</option>

                                    )}
                                </select>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    State *
                                </label>
                                <select
                                    onChange={(e) => handleChange(e)}
                                    value={data.state}
                                    className="form-control"
                                    id="state"
                                    disabled={!data.country}
                                >
                                    <option value="1">---select---</option>

                                    {State.getStatesOfCountry(countryCode).map((item, index) =>
                                        /* {City.getCountryByCode('IN') && City.getCountryByCode('IN').map((item, index) => */
                                        <option key={index} value={item?.name} >{item?.name}</option>

                                    )}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pageToLink" className="form-label">
                                    City*
                                </label>
                                <select
                                    onChange={(e) => handleChange(e)}
                                    value={data.city}
                                    className="form-control"
                                    id="city"
                                    name='city'
                                    disabled={!data.state}
                                >
                                    <option value="1">---select---</option>
                                    {City.getCitiesOfState(`${countryCode}`, `${stateCode}`) && City.getCitiesOfState(`${countryCode}`, `${stateCode}`).map((item, index) =>
                                        <option key={index} value={item?.name} >{item?.name}</option>

                                    )}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Pin Code *
                                </label>
                                <input
                                    type="Number"
                                    className="form-control"
                                    id="pincode"
                                    value={data.pincode}
                                    maxLength={8}
                                    onChange={(e) => handleChange(e)}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-sm-12 col-md-12 col-lg-6 my-1">
                    <div className="card h-100">
                        <div className="card-body px-5">

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Contact Number*
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="contact_Number"
                                    value={data.contact_Number}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Contact Person Name*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact_Person_Name"
                                    value={data.contact_Person_Name}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    URL*
                                </label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">
                                        {WebsiteURL}
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="short_url"
                                        aria-describedby="basic-addon3"
                                        value={data.short_url}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className=" mb-3">
                                <label htmlFor="title" className="form-label">
                                    Price Lable*
                                </label>  <select className="form-control" address_Line_1="price_Lable" id="price_Lable"
                                    onChange={(e) => handleChange(e)}
                                    value={data.price_Lable}
                                >



                                    <option value="" disabled>---</option>

                                    <option value="base_Price">Base Price</option>
                                    <option value="price_Level_2"> price Level 2</option>
                                    <option value="price_Level_3">price Level 3</option>


                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Franchisee Banner (optional)
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) => handleChange(e)}
                                />
                                <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
                            </div>
                            <div className="mb-3" style={{ height: '200px', maxWdth: '100%' }}>
                                <img
                                    src={data.imageURL}
                                    alt="Uploaded Image will be shown here"
                                    style={{ maxHeight: '200px', maxWidth: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default BAddress