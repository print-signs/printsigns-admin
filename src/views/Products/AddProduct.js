


import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { isAutheticated } from 'src/auth'
// import { WebsiteURL } from '../WebsiteURL'

const AddProduct = () => {
    const token = isAutheticated()
    const navigate = useNavigate()
    const [data, setData] = useState({
        image: '',
        imageURL: '',
        name: '',
        description: '',

        base_Price: '',
        base_Price_With_Tax: '',
        price_Level_2: '',
        price_Level_2_With_Tax: '',

        price_Level_3: '',
        price_Level_3_With_Tax: '',
        taxId: ''

    })


    const [loading, setLoading] = useState(false)
    const [allTax, setAllTax] = useState([])




    useEffect(() => {
        const getAllTax = async () => {
            const res = await axios.get(`/api/tax/view_tax`, {
                headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
            })
            if (res.data) {
                setAllTax(res.data)
            }
        }
        getAllTax()

    }, [token])

    const handleChange = (e) => {

        if (e.target.id === 'image') {
            if (
                e.target.files[0]?.type === 'image/jpeg' ||
                e.target.files[0]?.type === 'image/png' ||
                e.target.files[0]?.type === 'image/jpg'
            ) {
                setData((prev) => ({
                    ...prev,
                    imageURL: URL.createObjectURL(e.target.files[0]),
                    image: e.target.files[0],
                }))
                return
            } else {
                swal({
                    title: 'Warning',
                    text: 'Upload jpg, jpeg, png only.',
                    icon: 'error',
                    button: 'Close',
                    dangerMode: true,
                })
                setData((prev) => ({
                    ...prev,
                    imageURL: '',
                    image: '',
                }))
                e.target.value = null
                return
            }
        }
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }


    const TaxRatechange = async (e) => {
        let taxDetails = {
            name: e.target.value.slice(12, 16),
            rate: Number(e.target.value.slice(4, 6)),

            taxId: e.target.value.slice(24)

        }

        let trRate = taxDetails.rate / 100
        let PriceWithT = Number(data.base_Price);
        PriceWithT += +((PriceWithT * trRate).toFixed());

        //price_Level_2_With_Tax
        let price_Level_2_With_Tax = Number(data.price_Level_2);
        price_Level_2_With_Tax += +((price_Level_2_With_Tax * trRate).toFixed());
        //
        //price_Level_3_With_Tax
        let price_Level_3_With_Tax = Number(data.price_Level_3);
        price_Level_3_With_Tax += +((price_Level_3_With_Tax * trRate).toFixed());
        setData((prev) => ({
            ...prev,
            base_Price_With_Tax: PriceWithT,

            price_Level_2_With_Tax: price_Level_2_With_Tax,


            price_Level_3_With_Tax: price_Level_3_With_Tax,
            taxId: taxDetails.taxId

        }))
    }


    const handleSubmit = () => {
        if (
            data.name.trim() === '' ||

            data.description.trim() === '' ||
            data.base_Price === '' ||
            data.base_Price_With_Tax === '' ||
            data.price_Level_2 === '' ||
            data.price_Level_2_With_Tax === '' ||
            data.price_Level_3 === '' ||
            data.price_Level_3_With_Tax === '' ||
            data.imageURL.trim() === ''
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
        formData.set('name', data.name)

        formData.set('description', data.description)
        formData.set('base_Price', data.base_Price)
        formData.set('base_Price_With_Tax', data.base_Price_With_Tax)

        formData.set('price_Level_2', data.price_Level_2)
        formData.set('price_Level_2_With_Tax', data.price_Level_2_With_Tax)

        formData.set('price_Level_3', data.price_Level_3)
        formData.set('price_Level_3_With_Tax', data.price_Level_3_With_Tax)
        formData.set('taxId', data.taxId)


        formData.append('image', data.image)


        axios
            .post(`/api/product/create/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/formdata',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                swal({
                    title: 'Added',
                    text: 'Product added successfully!',
                    icon: 'success',
                    button: 'Return',
                })
                setLoading(false)
                navigate('/products', { replace: true })
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
                            Add Product
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <h4 className="mb-0"></h4>
                        </div>

                        <div className="page-title-right">
                            <Button
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
                            </Button>
                            <Link to="/products">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: '1rem',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6  col-sm-12 my-1">
                    <div className="card h-100">
                        <div className="card-body px-5">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Product Name*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={data.name}
                                    maxLength={25}
                                    onChange={(e) => handleChange(e)}
                                />
                                {data.name ? <><small className="charLeft mt-4 fst-italic">
                                    {25 - data.name.length} characters left
                                </small></> : <></>

                                }                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Description*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={data.description}
                                    maxLength="100"
                                    onChange={(e) => handleChange(e)}
                                />
                                {data.description ? <><small className="charLeft mt-4 fst-italic">
                                    {100 - data.description.length} characters left
                                </small></> : <></>
                                }
                            </div>


                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Product Image*
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    accept="image/*"
                                    multiple
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
                </div>
                <div className="col-lg-6 col-md-6  col-sm-12 my-1">
                    <div className="card h-100">
                        <div className="card-body px-5">
                            <div className="d-flex flex-wrap">

                                <div className="mb-3 me-3">
                                    <label htmlFor="title" className="form-label">
                                        Base Price*
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="base_Price"
                                        value={data.base_Price}
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Base Price With Tax
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        className="form-control"
                                        id="base_Price_With_Tax"
                                        value={data.base_Price_With_Tax}
                                        placeholder={data.base_Price_With_Tax}
                                    // onChange={(e) => handleChange(e)}

                                    />
                                </div>



                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Base Price*
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="base_Price"
                                    value={data.base_Price}
                                    onChange={(e) => handleChange(e)}

                                />
                            </div> */}

                            <div className="d-flex flex-wrap">

                                <div className="mb-3 me-3">
                                    <label htmlFor="title" className="form-label">
                                        Price Level 2*
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price_Level_2"
                                        value={data.price_Level_2}
                                        onChange={(e) => handleChange(e)}


                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Price Level 2 with Tax
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        className="form-control"
                                        id="price_Level_2_With_Tax"
                                        value={data.price_Level_2_With_Tax}
                                        placeholder={data.price_Level_2_With_Tax}
                                    // onChange={(e) => handleChange(e)}


                                    />
                                </div>



                            </div>

                            <div className="d-flex flex-wrap">

                                <div className="mb-3 me-3">
                                    <label htmlFor="title" className="form-label">
                                        Price Level 3*
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price_Level_3"
                                        value={data.price_Level_3}
                                        onChange={(e) => handleChange(e)}


                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Price Level 3 with Tax
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        className="form-control"
                                        id="price_Level_3_With_Tax"
                                        placeholder={data.price_Level_3_With_Tax}
                                    // onChange={(e) => handleChange(e)}


                                    />
                                </div>



                            </div>


                            {allTax.length > 0 && <div className=" mb-3">
                                <label htmlFor="title" className="form-label">
                                    Tax*
                                </label>  <select className="   form-control" name="" id=""
                                    onChange={(e) => TaxRatechange(e)}
                                >
                                    <option value="" disabled>---</option>

                                    {allTax.map((t, i) =>
                                        <option key={i} value={`tax:${t.tax},name:${t.name}  ,taxId:${t._id}`}>{t.tax}% {t.name}</option>
                                    )}
                                </select>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
