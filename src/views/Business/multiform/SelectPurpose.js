
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { isAutheticated } from 'src/auth'



const SelectPurpose = (props) => {
    const token = isAutheticated()
    const navigate = useNavigate()

    const { data, setData } = props.data

    const { loading, setLoading } = props.loading
    // const categories = props?.categories || []

    const handleChange = (e) => {

        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }


    // const [loading, setLoading] = useState(false)


    const [purposeData, setPurposeData] = useState([])


    const getCategories = () => {
        axios
            .get(`/api/purpose`, {
                headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // console.log(res.data)
                setPurposeData(res.data?.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getCategories()
    }, [])




    const handleSubmit = () => {

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
                            Select Purpose
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
                                    marginRight: '5px',

                                }}
                                onClick={() => props.handleView(1)}

                            >
                                Prev
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={data.purpose === ''}
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    textTransform: 'capitalize',
                                }}
                                onClick={() => props.handleView(3)}
                            // disabled={loading}
                            >
                                Next
                                {/* {loading ? 'Loading' : 'Next'} */}
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
                                    Purpose *
                                </label>
                                <select
                                    onChange={(e) => handleChange(e)}
                                    value={data.purpose}
                                    className="form-control"
                                    id="purpose"
                                    disabled={purposeData.length < 1}
                                >
                                    <option value="1">---select---</option>
                                    {purposeData.length > 0 && purposeData.map((item, index) =>
                                        <option key={index} value={item?.purpose} >{item?.purpose}</option>

                                    )}
                                </select>

                            </div>




                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectPurpose