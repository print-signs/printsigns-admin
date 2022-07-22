
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function Faqs() {
    const [faqs, setFeqs] = useState([])

    const token = isAutheticated();

    const getfaqs = useCallback(async () => {
        let res = await axios.get(
            `/api/faqs/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setFeqs(res.data.Faqs)


    }, [token]);

    useEffect(() => {
        getfaqs();
    }, [getfaqs]);


    const handleDelete = async (id) => {
        let status = window.confirm("Do you want to delete");
        if (!status) return;

        let res = await axios.delete(`/api/faqs/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res)
        if (res.data.success == true) {
            swal("success!", "FAQs Deleted Successfully!", "success");
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
                                <h4 className="mb-3">CMP-FAQs</h4>
                                <Link to="/FAQs/add/"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add New FAQ</button></Link>
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
                                                    <th>Topic</th>
                                                    {/* <th>Image</th> */}
                                                    <th>Added On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {faqs && faqs.map((item, index) =>
                                                    <tr>
                                                        <td>{item?.topic}</td>
                                                        {/* <td>
                                                            <img src={`${item?.image.url}`} width="50" alt="" /></td> */}
                                                        <td>
                                                            {/* {item?.addedOn} */}
                                                            {new Date(`${item?.createdAt}`).toDateString()}<span> , {`${formatAMPM(item?.createdAt)}`}</span>

                                                        </td>


                                                        <td>
                                                            <Link to={`/FAQs/view/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className=" mx-1 mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    View
                                                                </button>
                                                            </Link>
                                                            <Link to={`/FAQs/edit/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className=" mx-1 mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className="mx-1 mt-1 btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
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

export default Faqs;
