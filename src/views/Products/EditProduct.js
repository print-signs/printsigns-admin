
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { isAutheticated } from 'src/auth'
// import { WebsiteURL } from '../WebsiteURL'

const EditProduct = () => {
    const id = useParams()?.id

    const token = isAutheticated()
    const navigate = useNavigate()
    const [data, setData] = useState({
        image: [],
        imageURL: [],
        name: '',
        description: '',

        price: '',


    })


    const [loading, setLoading] = useState(false)
    const [allTax, setAllTax] = useState([])

    const [imagesPreview, setImagesPreview] = useState([]);
    //get Productdata
    const getProduct = async () => {

        axios
            .get(`/api/product/getOne/${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res.data?.product?.image)
                // if (res.data?.product?.image) {
                //     res.data?.product?.image.map(item => {
                //     })

                // }

                // setImagesPreview(res.data?.product?.image)
                setData((prev) => ({
                    ...prev,
                    ...res.data?.product,
                    imageURL: res.data?.product?.image?.url,
                }))
            })
            .catch((err) => { })
    }
    // console.log(imagesPreview)
    useEffect(() => {
        getProduct()
    }, [])



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
                if (imagesPreview.length > 3) {
                    swal({
                        title: 'Warning',
                        text: 'maximum Four image Upload ',
                        icon: 'error',
                        button: 'Close',
                        dangerMode: true,
                    })
                    return
                }
                // only for file preview------------------------------------
                const files = Array.from(e.target.files);
                files.forEach((file) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setImagesPreview((old) => [...old, reader.result]);

                        }
                    };

                    reader.readAsDataURL(file)
                });
                // -----------------------------------------------------------------------------


                setData((prev) => ({
                    ...prev,


                    image: [...data.image, ...e.target.files],
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
        let PriceWithT = Number(data.price);
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
            price_With_Tax: PriceWithT,

            price_Level_2_With_Tax: price_Level_2_With_Tax,


            price_Level_3_With_Tax: price_Level_3_With_Tax,
            taxId: taxDetails.taxId

        }))
    }

    // console.log(data.image.length)
    const handleSubmit = () => {
        if (
            data.name.trim() === '' ||

            data.description.trim() === '' ||
            data.price === '' ||
            data.image === ''
            // data.price_With_Tax === '' ||
            // data.price_Level_2 === '' ||
            // data.price_Level_2_With_Tax === '' ||
            // data.price_Level_3 === '' ||
            // data.price_Level_3_With_Tax === '' ||
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
        formData.append('name', data.name)

        formData.append('description', data.description)
        formData.append('price', data.price)




        data.image.forEach((Singleimage) => {
            formData.append("image", Singleimage);

        });


        axios
            .put(`/api/product/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/formdata',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                swal({
                    title: 'Updated',
                    text: 'Product Updated successfully!',
                    icon: 'success',
                    button: 'ok',
                })
                setLoading(false)
                navigate('/products', { replace: true })
            })
            .catch((err) => {
                setLoading(false)
                const message = err.response?.data?.message ? err.response?.data?.message : 'Something went wrong!'
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
                            Edit Product
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
                                {loading ? 'Loading' : 'Edit'}
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
                            <div><strong className="fs-6 fst-italic">*Please Upload maximum four images</strong></div>


                            {imagesPreview.length > 0 && <div id="createProductFormImage" className="w-25 d-flex">

                                {imagesPreview.map((image, index) => (
                                    <img className=" w-50 p-1 " key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>}


                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6  col-sm-12 my-1">
                    <div className="card h-100">
                        <div className="card-body px-5">


                            <div className="mb-3 me-3">
                                <label htmlFor="title" className="form-label">
                                    Price (optional)
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={data.price}
                                    onChange={(e) => handleChange(e)}

                                />
                            </div>








                            {allTax.length > 0 && <div className=" mb-3">
                                <label htmlFor="title" className="form-label">
                                    Tax*
                                </label>  <select className="   form-control" name="" id=""
                                    onChange={(e) => TaxRatechange(e)}
                                >
                                    <option value="" disabled>-----</option>

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

export default EditProduct

