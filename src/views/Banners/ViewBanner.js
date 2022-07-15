



import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

function ViewBanner() {
    const [banner, setBanner] = useState([])
    const { id } = useParams();
    // console.log(id)
    const { token } = isAutheticated();

    const getBanner = useCallback(async () => {
        let res = await axios.get(
            `/api/banner/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setBanner(res.data.banner)


    }, [token]);

    useEffect(() => {
        getBanner();
    }, [getBanner]);





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
                                <h4 className="mb-3">CMP-BANNER</h4>
                                <Link to="/addbanner"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add New Banner</button></Link>
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

                                                <tr><th>Id</th><td>{banner?._id}</td></tr>
                                                <tr><th>Title</th><td>{banner?.title}</td></tr>
                                                <tr> <th>Sub Title</th><td>{banner?.subTitle}</td></tr>

                                                <tr> <th>Image</th> <td>
                                                    <img src={`${banner.image?.url}`} width="50" alt="" />
                                                </td></tr>
                                                <tr><th>Section</th><td>{banner?.section}</td></tr>
                                                <tr> <th>Sub Section</th><td>{banner?.subSection}</td></tr>
                                                <tr><th>Start Date</th> <td>
                                                    {new Date(`${banner?.startDate}`).toDateString()}
                                                </td></tr>
                                                <tr><th>End Date</th><td>
                                                    {new Date(`${banner?.endDate}`).toDateString()}</td></tr>
                                                <tr><th>Added On</th><td>
                                                    {new Date(`${banner?.addedOn}`).toDateString()}<span> , {`${formatAMPM(banner?.addedOn)}`}</span>
                                                </td></tr>
                                                <tr> <th>Updated At</th><td>
                                                    {new Date(`${banner?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(banner?.updatedAt)}`}</span>
                                                </td></tr>

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

export default ViewBanner;
