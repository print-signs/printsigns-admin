
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function banner() {
    const [banner, setBanner] = useState([])

    const token = isAutheticated();

    const getEvent = useCallback(async () => {
        let res = await axios.get(
            `/api/banner/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setBanner(res.data.banner)


    }, [token]);

    useEffect(() => {
        getEvent();
    }, [getEvent]);


    const handleDelete = async (id) => {
        let status = window.confirm("Do you want to delete");
        if (!status) return;

        let res = await axios.delete(`/api/banner/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)
        if (res.data.success == true) {
            swal("success!", "Banner Deleted Successfully!", "success");
            window.location.reload();
        }
    };


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
                                <Link to="/addbanner"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Banner</button></Link>
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
                                                    <th>Title</th>
                                                    <th>Image</th>
                                                    <th>Section</th>
                                                    <th>Sub Section</th>
                                                    <th>Status</th>
                                                    <th>Added On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {banner && banner.map((item, index) =>
                                                    <tr key={index}>
                                                        <td>{item?.title}</td>
                                                        <td>
                                                            <img src={`${item?.image.url}`} width="50" alt="" /></td>


                                                        <td>{item?.section}</td>
                                                        <th>{item?.subSection}</th>
                                                        <td>
                                                            <span
                                                                className={`badge rounded-pill bg-${new Date(`${item?.endDate}`) > new Date() ? "success" : "danger"
                                                                    } font-size-10`}
                                                            >
                                                                {new Date(`${item?.endDate}`) > new Date() ? "Live" : "Suspended"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {/* {item?.addedOn} */}
                                                            {new Date(`${item?.addedOn}`).toDateString()}<span> , {`${formatAMPM(item?.addedOn)}`}</span>

                                                        </td>


                                                        <td>
                                                            <Link to={`/banner/view/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className=" mx-2 mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    View
                                                                </button>
                                                            </Link>
                                                            <Link to={`/banner/edit/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className=" mx-2 mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className=" mt-1 btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                id="sa-params"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
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

export default banner;
