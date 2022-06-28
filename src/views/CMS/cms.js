
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function cms() {
    const [cmsRes, setCmsRes] = useState([])

    const token = isAutheticated();

    const getRestriction = useCallback(async () => {
        let res = await axios.get(
            `/api/restriction/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data.CmpRestriction[0])
        setCmsRes(res.data.CmpRestriction[0])


    }, [token]);

    useEffect(() => {
        getRestriction();
    }, [getRestriction]);


    // console.log(cmsRes)

    return (
        <div className=" main-content">
            <div className="  my-3 page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-3">CMP-CMS</h4>
                                {/* <Link to="/addEvent"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Event</button></Link> */}
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
                                                <tr>

                                                    <th>About Us</th>
                                                    <th>Terms and Conditions</th>
                                                    <th>Privacy Policy</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>

                                                    <td>{cmsRes?.About_Us}</td>
                                                    <td>{cmsRes?.Terms_and_Conditions}</td>
                                                    <td>{cmsRes?.Privacy_Policy}</td>



                                                    <td>
                                                        <Link to={`/cms/view/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className="mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                View
                                                            </button>
                                                        </Link>
                                                        <Link to={`/cms/edit/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className="mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        {/* <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className="  btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                id="sa-params"
                                                            >
                                                                Delete
                                                            </button> */}
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    {/* second table */}

                                    {/* <div className="table-responsive table-shoot mt-4">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">
                                                <tr>

                                                    <th>Terms and Conditions</th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>

                                                    <td>{cmsRes?.Terms_and_Conditions}</td>


                                                    <td>
                                                        <Link to={`/cms/view/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className="mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                View
                                                            </button>
                                                        </Link>
                                                        <Link to={`/cms/edit/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className="mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        {/* <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className="  btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                id="sa-params"
                                                            >
                                                                Delete
                                                            </button> */}
                                    {/* </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div> */}




                                    {/* end second table */}

                                    {/* third table */}
                                    {/* <div className="table-responsive table-shoot mt-4">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">
                                                <tr>

                                                    <th>Privacy Policy</th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>

                                                    <td>{cmsRes?.Privacy_Policy}</td>


                                                    <td>
                                                        <Link to={`/cms/view/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className="mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                View
                                                            </button>
                                                        </Link>
                                                        <Link to={`/cms/edit/${cmsRes._id}`}>

                                                            <button
                                                                type="button"
                                                                className=" mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        {/* <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className="  btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                id="sa-params"
                                                            >
                                                                Delete
                                                            </button> */}
                                    {/* </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div> */}


                                    {/* end third table */}
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

export default cms;
