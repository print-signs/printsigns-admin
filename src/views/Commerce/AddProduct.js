import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
//import Footer from "../../Footer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const AddProduct = () => {
    const { token } = isAutheticated();
    let history = useHistory();
    const [state, setstate] = useState({
        title: "",
        description: "",
        status: "",
        tax: "",
        price: "",
        taxes: [],
        loading: false,
    });

    const { title, description, status, tax, price, taxes, loading } = state;

    const changeState = (newState) =>
        setstate((prevState) => ({ ...prevState, ...newState }));

    const fetchTax = useCallback(async () => {
        let res = await axios.get(`${API}/api/tax/view_tax`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) changeState({ taxes: res.data });
    }, [token]);

    useEffect(() => {
        fetchTax();
    }, [fetchTax]);

    const handleSubmit = async () => {
        if (!(title || description || tax || price)) {
            alert("Please fill required field ");
            return;
        }
        changeState({ loading: true });

        let res = await axios.post(
            `${API}/api/product`,
            {
                title,
                description,
                status,
                tax: taxes.find((taxObj) => taxObj.name === tax)?._id,
                price,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.status === 200) {
            swal("success!", "Product Added Successfully!", "success");
            history.goBack();
        }

        changeState({ loading: false });
    };

    // 
    const onCancel = () => {
        // window.location = "/comproducts";
        history.goBack()

    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        changeState({ [name]: value });
    };
    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Add New Product</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <Link to="/dashboard">Dating App</Link>
                                            </li>
                                            <li className="breadcrumb-item active">Commerce</li>
                                            <li className="breadcrumb-item active">Add New Product</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}

                        {/* <!-- Save options Begins--> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group text-right">
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="btn btn-success btn-login waves-effect waves-light mr-3"
                                    >
                                        <ClipLoader loading={loading} size={18} />
                                        {!loading && "Save"}
                                    </button>
                                    <button
                                        onClick={onCancel}
                                        type="button"
                                        className="btn btn-warning btn-cancel waves-effect waves-light mr-3"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Save options Ends-->             */}

                        {/* <!-- Row 1 Begins -->                */}
                        <div className="row">
                            {/* <!--Left Column Begins--> */}
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label
                                                                    for="basicpill-phoneno-input"
                                                                    className="label-100"
                                                                >
                                                                    Title*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    value={title}
                                                                    className="form-control input-field"
                                                                    onChange={handleChange}
                                                                    placeholder="Title"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group mb-30 width-100 row">
                                                                <label className="col-md-4 control-label">
                                                                    Description
                                                                </label>
                                                                <div className="col-md-13">
                                                                    <textarea
                                                                        value={description}
                                                                        onChange={handleChange}
                                                                        name="description"
                                                                        className="form-control input-field"
                                                                        rows="5"
                                                                        placeholder="Add description"
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Left Column Ends --> */}

                            {/* <!--Right Column Begins --> */}
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label
                                                                    for="basicpill-phoneno-input"
                                                                    className="label-100"
                                                                >
                                                                    Select Tax*
                                                                </label>
                                                                <select
                                                                    name="tax"
                                                                    value={tax}
                                                                    onChange={({ target: { value } }) =>
                                                                        changeState({ tax: value })
                                                                    }
                                                                    className="form-control  input-field"
                                                                >
                                                                    <option value="">--select--</option>
                                                                    {taxes?.map(({ name, tax }) => (
                                                                        <option value={name}>
                                                                            {name}&nbsp;{tax}%
                                                                            bvb
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label
                                                                    for="basicpill-phoneno-input"
                                                                    className="label-100"
                                                                >
                                                                    Status*
                                                                </label>
                                                                <select
                                                                    name="status"
                                                                    value={status}
                                                                    onChange={handleChange}
                                                                    className="form-control  input-field"
                                                                >
                                                                    <option value="">--select--</option>
                                                                    <option value={true}>Active</option>
                                                                    <option value={false}>Inactive</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--Right Column Ends --> */}
                        </div>
                        <div className="row">
                            {/* <!--Left Column Begins--> */}
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="form-group">
                                                                <label
                                                                    for="basicpill-phoneno-input"
                                                                    className="label-100"
                                                                >
                                                                    Price*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="price"
                                                                    onChange={handleChange}
                                                                    className="form-control input-field"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Left Column Ends --> */}
                        </div>
                    </div>
                    {/* <!-- container-fluid --> */}
                </div>
                {/* <!-- End Page-content --> */}
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default AddProduct