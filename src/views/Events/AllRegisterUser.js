

import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

const AllRegisterUser = () => {
    const { id } = useParams();
    const token = isAutheticated();
    const [registerUser, setRegisterUser] = useState([])
    const getRegisterUser = useCallback(async () => {
        let res = await axios.get(
            `/api/event/admin/registerUser/getAll/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setRegisterUser(res.data.user)


    }, [token]);

    useEffect(() => {
        getRegisterUser();
    }, [getRegisterUser]);
    // console.log(registerUser)
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
        <><div className=" main-content">
            <div className="  my-3 page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-3">CMP-Event Register Users</h4>

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
                                                    <th>Name</th>
                                                    <th> Profile Image</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>register At</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {registerUser && registerUser.map((item, index) =>
                                                    <tr>
                                                        <td>{item.userId?.name}</td>
                                                        <td>
                                                            <img src={`${item.userId.avatar?.url}`} width="50" alt="" /></td>
                                                        <td>{item.userId?.email}</td>
                                                        <td>{item.userId?.phone}</td>
                                                        <td>
                                                            {/* {item?.addedOn} */}
                                                            {new Date(`${item.userId?.createdAt}`).toDateString()}<span> , {`${formatAMPM(item.userId?.createdAt)}`}</span>

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
        </div></>
    );
}

export default AllRegisterUser;
