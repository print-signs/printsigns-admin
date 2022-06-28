
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

function ViewFeedback() {
    const [user, setUser] = useState([])


    const [feedback, setFeedback] = useState([])
    const { id } = useParams();
    // console.log(id)
    const token = isAutheticated();

    const getFeedback = useCallback(async () => {
        let res = await axios.get(
            `/api/feedback/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setFeedback(res.data.feedback)

        let resp = await axios.get(
            `/api/v1/admin/user/${feedback.user}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setUser(resp.data.user)


    }, [token, feedback.user]);

    useEffect(() => {
        getFeedback();
    }, [getFeedback]);





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
                                <h4 className="mb-3">CMP-Customer feedback</h4>
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

                                                <tr><th>User_Id</th><td>{user?._id}</td></tr>
                                                <tr><th>Name</th><td>{feedback?.name}</td></tr>
                                                <tr><th>email</th><td>{user?.email}</td>
                                                </tr>
                                                <tr><th>Image</th> <td>
                                                    <img src={`${user.avatar?.url}`} width="50" alt="" />
                                                </td></tr>
                                                <tr><th>Description</th><td>{feedback?.description}</td></tr>

                                                <tr><th>Pnone No.</th><td>{user?.phone}</td></tr>
                                                <tr><th>Feedback Given At</th> <td>
                                                    {new Date(`${feedback?.createdAt}`).toDateString()}<span> , {`${formatAMPM(feedback?.createdAt)}`}</span>
                                                </td></tr>


                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>


                                    {/* <!-- end table-responsive --> */}
                                </div>
                            </div >
                        </div >
                    </div >
                </div >
                {/* <!-- container-fluid --> */}
            </div >
        </div >
    );
}

export default ViewFeedback;
