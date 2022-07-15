
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

function ViewRequirement() {
    const [requirement, setRequirement] = useState([])
    const [allImage, setAllImage] = useState([])
    const { id } = useParams();
    // console.log(id)
    const token = isAutheticated();

    const getUserDetails = useCallback(async () => {


        let resp = await axios.get(
            `/api/requirement/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(resp.data.Requirement.image)
        setRequirement(resp.data.Requirement)
        setAllImage(resp.data.Requirement.image)


    }, [token]);

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);


    // allImage.map(item => {
    //     console.log(item.url)
    // })


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
                                <h4 className="mb-3">CMP-User Details</h4>
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
                                                    <th>User_Id</th>

                                                    <td>{requirement?._id}</td>
                                                </tr>


                                                <tr><th>Title</th>
                                                    <td>{requirement?.title}</td></tr>

                                                <tr><th>Area Of Interest</th>
                                                    <td>{requirement?.areaOfInterest}</td></tr>

                                                {/* <tr><th>Image</th>

                                                    <td className="d-flex">
                                                    
                                                        <img src={`${requirement.image[0]?.url}`} width="50" alt="" />
                                                    </td>

                                                </tr> */}


                                                {/* <th>Description</th> */}


                                                <tr><th>Description</th>
                                                    <td>{requirement?.description}</td></tr>

                                                <tr><th>Added On</th>

                                                    <td>
                                                        {new Date(`${requirement?.createdAt}`).toDateString()}<span> , {`${formatAMPM(requirement?.createdAt)}`}</span>
                                                    </td></tr>
                                                <tr><th> Updated At</th>
                                                    <td>
                                                        {new Date(`${requirement?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(requirement?.updatedAt)}`}</span>
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

export default ViewRequirement;

