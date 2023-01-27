

import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';

import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "src/auth";

function ViewProduct() {
    const [product, setProduct] = useState([])
    const { id } = useParams();
    const token = isAutheticated();

    const getProduct = useCallback(async () => {
        let res = await axios.get(
            `/api/product/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data.product)
        setProduct(res.data.product)


    }, [token]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);





    //change time formate
    function formatAMPM(date) {
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    return (
        <div className=" main-content">
            <div className="  my-3 page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-3">Product</h4>
                                <Link to="/product/add"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Product</button></Link>
                                {/* <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">CMD-App</Link>
                    </li>
                    <li className="breadcrumb-item">CMD-Category</li>
                  </ol>
                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row ml-0 mr-0  mb-10">

                                    </div>
                                    <div className="table-responsive table-shoot">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">

                                                <tr><th>Id</th> <td>{product?._id}</td></tr>
                                                <tr><th>Name</th>                                                        <td>{product?.name}</td></tr>

                                                <tr><th>image</th><td>
                                                    <img src={`${product.image?.url}`} width="50" alt="" />
                                                </td></tr>
                                                <tr><th>Description</th><td>{product?.description}</td></tr>
                                                <tr><th>Base Price</th><td>{product?.base_Price}</td></tr>
                                                <tr><th>Price Level 2</th><td>{product?.price_Level_2}</td></tr>

                                                <tr><th>Price Level 3</th><td>{product?.price_Level_3}</td></tr>

                                                {/* <tr><th>Product Time</th><td>{product?.time}</td></tr>
                                                <tr><th>Location</th><td>{product?.location}</td></tr> */}
                                                <tr><th>Created On</th><td>
                                                    {new Date(`${product?.createdAt}`).toDateString()}<span> , {`${formatAMPM(product?.createdAt)}`}</span>
                                                </td></tr>
                                                <tr><th>Updated At</th>
                                                    <td>
                                                        {new Date(`${product?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(product?.updatedAt)}`}</span>
                                                    </td>
                                                </tr>

                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>


                                    {/* <!-- end table-responsive --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- container-fluid --> */}
            </div>
        </div>
    );
}

export default ViewProduct;
