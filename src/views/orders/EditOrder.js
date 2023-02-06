





import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { isAutheticated } from 'src/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart } from 'src/redux/Actions/cartAction'
import toast from 'react-hot-toast'
import { cibBlackberry } from '@coreui/icons'
import Button from '@material-ui/core/Button'
// import PrintOrderDetails from './PrintOrderDetails.js'

function EditOrder() {
    const { status, id } = useParams()

    const { cartItems, subTotal, tax, shipping, total } = useSelector(
        (state) => state.cart
    );
    // const { cart, shippingInfo } = useSelector(
    //     (state) => state
    // );
    const AllStates = useSelector(
        (state) => state
    );
    console.log(AllStates.shipingInfo.franchisees)
    const getValue = useRef()
    const getFranchiseeID = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const printOrderRef = useRef()
    const token = isAutheticated()
    const [productData, setProductData] = useState([])
    const [allFranchisee, setAllFranchisee] = useState([])


    const [productDetails, setProductDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [orderStatus, setOrderStatus] = useState('')
    const [data, setData] = useState({
        product_Name: '',
        address: '',
        quantity: '',
        contact_Number: '',
        total_Price: '',
    })

    useEffect(() => {
        function getProductDetails() {
            setLoading(true)
            axios
                .get(`/api/product/getAll/`, {
                    headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setLoading(false)
                    // console.log(res.data.product)
                    setProductData(res.data.product)
                })
                .catch((err) => {
                    setLoading(false)
                    // getBack()
                })
        }
        function getFranchiseeDetails() {
            setLoading(true)
            axios
                .get(`/api/temple`, {
                    headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setLoading(false)
                    // console.log(res.data.product)
                    setAllFranchisee(res.data.data)
                })
                .catch((err) => {
                    setLoading(false)
                    // getBack()
                })
        }
        getProductDetails()
        getFranchiseeDetails()
    }, [])

    const handleChange = (e) => {
        if (e.target.type === 'text') {
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        } else {
            setOrderStatus(e.target.value)
        }
    }
    const handleQuantityChange = (e) => {

        setData((prev) => ({
            ...prev,
            quantity: e.target.value,
            total_Price: (productDetails?.base_Price * e.target.value)
        }))

    }
    // ------------------------product handle------------------------------//
    const handleGetSingleProduct = async (e) => {


        axios
            .get(`/api/product/getOne/${getValue.current.value}`, {
                headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setLoading(false)
                let options = {
                    name: res?.data?.product?.name,
                    price: res?.data?.product?.base_Price,
                    id: res?.data?.product?._id,
                    quantity: 1,
                    image: res?.data?.product?.image?.url
                }
                dispatch({ type: "addToCart", payload: options });

                dispatch({ type: "calculatePrice" });
                localStorage.setItem("cartItems", JSON.stringify(AllStates.cart));

                toast.success("Product Added");

            })
            .catch((err) => {
                setLoading(false)

            })
    }


    const handleRemove = (id) => {
        dispatch({
            type: "deleteFromCart",
            payload: id,
        });
        dispatch({ type: "calculatePrice" });
        localStorage.setItem("cartItems", JSON.stringify(AllStates.cart));
        toast.success("Item Removed");

    };
    //increase qty
    const increaseQuantity = (id) => {
        dispatch({
            type: "addToCart",
            payload: { id },
        });
        dispatch({ type: "calculatePrice" });
        localStorage.setItem("cartItems", JSON.stringify(AllStates.cart));

    }


    const decreaseQuantity = (id) => {
        dispatch({
            type: "decrement",
            payload: id,
        });

        dispatch({ type: "calculatePrice" });
        localStorage.setItem("cartItems", JSON.stringify(AllStates.cart));

    };
    // ------------------------product handle End------------------------------//

    // ------------------------Frenchisee handle------------------------------//

    const handleGetSingleFrenchisee = async () => {

        axios
            .get(`/api/Temple/arrayspopulate/${getFranchiseeID.current.value}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoading(false)
                console.log(res.data.data)
                let options = {
                    id: res?.data?.data?._id,
                    name: res?.data?.data?.name,


                    contact_Number: res?.data?.data?.contact_Number,
                    contact_Person_Name: res?.data?.data?.contact_Person_Name,
                    address: (res?.data?.data?.address_line_1 + ' ' + res?.data?.data?.address_line_2),
                    city: res?.data?.data?.city?.city_name,
                    state: res?.data?.data?.city?.state?.state_name,
                    banner: res?.data?.data?.banner?.url,
                    Franchisee_Url: res?.data?.data?.url
                }

                dispatch({ type: "addShippingInfo", payload: options });

                localStorage.setItem("shippingInfo", JSON.stringify(AllStates.shipingInfo));

                toast.success("Franchisee Added");

            })
            .catch((err) => {
                setLoading(false)

            })
    }
    const FranchiseeRemove = (id) => {
        dispatch({
            type: "deleteFromshippingInfo",
            payload: id,
        });
        localStorage.setItem("shippingInfo", JSON.stringify(AllStates.shipingInfo));
        toast.success("Franchisee Removed");

    };
    // ------------------------Frenchisee handle  End------------------------------//
    console.log(AllStates.shipingInfo.franchisees.length)
    console.log(cartItems)
    function handleSubmit() {
        if (
            AllStates.shipingInfo.franchisees.length < 1) {
            swal({
                title: 'Warning',
                text: 'Please select Franchisee ',
                icon: 'error',
                button: 'Close',
                dangerMode: true,
            })
            return
        }
        else if (cartItems.length < 1) {
            swal({
                title: 'Warning',
                text: 'Please select atleast one product',
                icon: 'error',
                button: 'Close',
                dangerMode: true,
            })
            return
        } else if (
            shipping === '' ||

            tax === '' ||
            total === ''

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
        // const formData = new FormData()
        // formData.set('orderItems', cartItems)


        // formData.set('shippingInfo', AllStates.shipingInfo.franchisees)
        // formData.set('shipping_charge', shipping)
        // formData.set('tax_amount', tax)
        // formData.set('total_amount', total)



        setLoading(true)
        axios
            .post(
                `/api/order/create`,
                {
                    orderItems: cartItems,
                    shippingInfo: AllStates.shipingInfo.franchisees,
                    shipping_charge: shipping,
                    tax_amount: tax,
                    total_amount: total


                },

                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                console.log(res)
                swal({
                    title: 'Created',
                    text: 'Order Created!',
                    icon: 'success',
                    button: 'ok',
                })
                setLoading(false)
                navigate('/orders/new')
            })
            .catch((err) => {
                setLoading(false)
                swal({
                    title: 'Warning',
                    text: 'Something went wrong!',
                    icon: 'error',
                    button: 'Retry',
                    dangerMode: true,
                })
            })
    }


    function getBack() {
        navigate(`/orders/${status}`, { replace: true })
    }

    return (
        <>
            {' '}
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
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
                                        Edit Order
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
                                            {loading ? 'Loading' : ' Edit Order'}
                                        </Button>
                                        <Link to="/orders/new">
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
                            <div className="col-lg-7 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mt-1">
                                            <label className="fw-bold">Select Product:</label>
                                            <div className="d-flex">
                                                <select
                                                    className="form-control me-2"
                                                    // onChange={handleGetSingleProduct}
                                                    // value={productData?._id}
                                                    ref={getValue}

                                                >
                                                    <option value="" >-----</option>
                                                    {productData && productData.map((item, index) =>
                                                        <option key={index} value={item?._id}>{item?.name}</option>
                                                    )}

                                                </select>
                                                <button className='btn-sm btn-primary' onClick={(e) => handleGetSingleProduct(e)}>Add</button>

                                            </div>

                                        </div>

                                        <div className="mt-2">
                                            <label className="fw-bold">Product :</label>

                                            {
                                                cartItems && cartItems.map((productDetails, i) =>
                                                    <div className="my-2">
                                                        <div className="row" style={{ fontSize: '14px' }}>
                                                            <div className="col-sm-4">
                                                                <img
                                                                    src={productDetails?.image}
                                                                    alt={productDetails?.name}
                                                                    style={{
                                                                        width: '100%',
                                                                        objectFit: 'contain',
                                                                        maxHeight: '150px',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-sm-8">
                                                                <h6 className="m-0 ms-2">{productDetails?.name}</h6>
                                                                <div className="row">
                                                                    <div className="col-sm-6">


                                                                        <div
                                                                            className='d-flex justify-content-center mt-3 me-3 '
                                                                            style={{

                                                                                width: "6rem",


                                                                            }}>
                                                                            <button className='btn btn-sm btn-primary ' onClick={() => decreaseQuantity(productDetails?.id)} >-</button>
                                                                            <span className='px-2 mt-1' style={{}}>{productDetails?.quantity}</span>
                                                                            <button className='btn btn-sm btn-primary' onClick={() => increaseQuantity(productDetails?.id)}>+</button>

                                                                        </div>
                                                                        <button className='btn btn-danger btn-sm ms-2 mt-3' onClick={() => handleRemove(productDetails?.id)} >Delete</button>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <h6 className="m-0 mt-3">
                                                                            <stong> Price:</stong> ₹{productDetails?.price}
                                                                        </h6>
                                                                        {' '}


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />

                                                    </div>
                                                )
                                            }
                                            {subTotal && <h5 className="m-0 contents-center mt-3">
                                                <span> Total Order Value:</span> ₹{subTotal}
                                            </h5>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mt-1">
                                            <label className="fw-bold">Franchisee :</label>
                                            <div className="d-flex">
                                                <select
                                                    className="form-control me-2"
                                                    onChange={handleChange}
                                                    value={orderStatus}
                                                    ref={getFranchiseeID}
                                                >
                                                    <option value="" disabled></option>
                                                    {allFranchisee && allFranchisee.map((item, index) =>
                                                        <option key={index} value={item?._id}>{item?.name}</option>
                                                    )}
                                                </select>
                                                <button className='btn-sm btn-primary' onClick={(e) => handleGetSingleFrenchisee(e)} >Add</button>
                                            </div>


                                        </div>


                                        {
                                            AllStates.shipingInfo.franchisees && AllStates.shipingInfo.franchisees.map((franchiDetails, i) =>
                                                <div className="my-2">
                                                    <div className="row" style={{ fontSize: '14px' }}>
                                                        <div className="col-sm-4">
                                                            <img
                                                                src={franchiDetails?.banner}
                                                                alt={franchiDetails?.name}
                                                                width='100%'
                                                            // style={{
                                                            //     width: '100%',
                                                            //     objectFit: 'contain',
                                                            //     maxHeight: '100px',
                                                            // }}
                                                            />
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <h6 className="m-0 ms-2">{franchiDetails?.name}</h6>
                                                            <parent className="m-0 ms-2 mt-3">
                                                                Address. : {franchiDetails?.address}
                                                            </parent>
                                                            <p className="m-0 ms-2 mt-1">
                                                                Contact No. : {franchiDetails?.contact_Number}
                                                            </p>
                                                            <p className="m-0 ms-2 mt-1">
                                                                contact Person Name. : {franchiDetails?.contact_Person_Name}
                                                            </p>




                                                            <button className='btn btn-danger btn-sm ms-2 mt-2' onClick={() => FranchiseeRemove(franchiDetails?.id)} >Delete</button>


                                                        </div>
                                                    </div>
                                                    <hr />

                                                </div>
                                            )
                                        }
                                        {/* <div className="mt-1">
                                            <label className="fw-bold">Address :</label>
                                        </div>
                                        <div className="mt-1">
                                            <label className="fw-bold">Contact Number :</label>
                                        </div> */}
                                        {/* <div className="mt-3">
                                            <label>
                                                <span className="fw-bold">Order ID: {productData?.order_id}</span>
                                            </label>
                                        </div> */}

                                        {/* <div className="mt-3">
                                            {productData?.order_id && (
                                                <div className="d-flex">
                                                    <p className="fw-bold me-3">Order ID QR Code:</p>
                                                    <QRCode
                                                        value={JSON.stringify({ order_id: productData?.order_id })}
                                                        size={256}
                                                        style={{ height: '150px', width: '150px' }}
                                                    />
                                                </div>
                                            )}
                                        </div> */}
                                        {/* {productData.status === 'processing' && (
                                            <>
                                                <div className="mt-3">
                                                    <label className="fw-bold">Courier Name* :</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="courier_name"
                                                        value={data.courier_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="fw-bold">Tracking ID* :</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="tracking_id"
                                                        value={data.tracking_id}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </>
                                        )} */}
                                        {/* <div className="mt-3">
                                            <label>
                                                <span className="fw-bold">Amount Paid : </span>Rs.{productData?.total_amount}
                                            </label>
                                        </div> */}








                                        {/* {productData?.address && (
                                            <>
                                                <div className="mt-1">
                                                    <label>
                                                        <span className="fw-bold">Address : </span>
                                                        {`${productData.address?.full_name}, ${productData.address?.flat_house_no_apartment
                                                            }, ${productData.address?.area_street_sector_village}, ${productData.address?.landmark && productData.address?.landmark + ', '
                                                            }${productData.address?.address_line &&
                                                            productData.address?.address_line + ', '
                                                            }${productData.address?.city}, ${productData.address?.state}, ${productData.address?.pincode
                                                            }`}
                                                    </label>
                                                </div>
                                                <div className="mt-1">
                                                    <label>
                                                        {' '}
                                                        <span className="fw-bold">Contact Number : </span>
                                                        {productData.address?.mobile_number}
                                                    </label>
                                                </div>
                                            </>
                                        )} */}






                                        {/* {productData?.courier_name && (
                                            <div className="mt-1">
                                                <label>
                                                    <span className="fw-bold">Courier Name : </span>
                                                    {productData?.courier_name}
                                                </label>
                                            </div>
                                        )}
                                        {productData?.tracking_id && (
                                            <div className="mt-1">
                                                <label>
                                                    <span className="fw-bold">Tracking ID : </span>
                                                    {productData?.tracking_id}
                                                </label>
                                            </div>
                                        )} */}








                                        {/* <div className="mt-1">
                    <label>
                      <span className="fw-bold">Order Placed On : </span>
                      {new Date(productData?.placed_on).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </label>
                  </div> */}
                                        <div className="mt-1">
                                            <label>
                                                <span className="fw-bold">Razorpay Order ID : </span>
                                                {productData?.razorpay_order_id}
                                            </label>
                                        </div>{' '}
                                        <div className="mt-1">
                                            <label>
                                                <span className="fw-bold">Razorpay Payment ID : </span>
                                                {productData?.razorpay_payment_id}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card my-1">
                                    <div className="card-body">
                                        <label className="fw-bold">Status Timeline :</label>
                                        <table
                                            className="table table-info table-sm m-0"
                                            style={{
                                                borderRadius: '8px',
                                                borderCollapse: 'collapse',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <tbody>
                                                <tr className="text-center">
                                                    <th scope="row">Order Placed On</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.new
                                                            ? new Date(productData?.status_timeline?.new).toLocaleString('en-IN', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: 'numeric',
                                                                hour12: true,
                                                            })
                                                            : new Date(productData?.placed_on).toLocaleString('en-IN', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: 'numeric',
                                                                hour12: true,
                                                            })}
                                                    </td>
                                                </tr>
                                                <tr className="text-center">
                                                    <th scope="row">Processing Started</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.processing
                                                            ? new Date(productData?.status_timeline?.processing).toLocaleString(
                                                                'en-IN',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                },
                                                            )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                                <tr className="text-center">
                                                    <th scope="row">Dispatched On</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.dispatched
                                                            ? new Date(productData?.status_timeline?.dispatched).toLocaleString(
                                                                'en-IN',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                },
                                                            )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                                <tr className="text-center">
                                                    <th scope="row">Delivered On</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.delivered
                                                            ? new Date(productData?.status_timeline?.delivered).toLocaleString(
                                                                'en-IN',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                },
                                                            )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                                <tr className="text-center">
                                                    <th scope="row">Cancelled On</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.cancelled
                                                            ? new Date(productData?.status_timeline?.cancelled).toLocaleString(
                                                                'en-IN',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                },
                                                            )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                                <tr className="text-center">
                                                    <th scope="row">Returned On</th>
                                                    <td> : </td>
                                                    <td>
                                                        {productData?.status_timeline?.returned
                                                            ? new Date(productData?.status_timeline?.returned).toLocaleString(
                                                                'en-IN',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                },
                                                            )
                                                            : '-'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                {/* <PrintOrderDetails productData={productData} ref={printOrderRef} /> */}
            </div>
        </>
    )
}

export default EditOrder
