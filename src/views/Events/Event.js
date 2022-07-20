
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RegisterUser from "./RegisterUser";
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function Event() {
    const [event, setEvent] = useState([])

    const token = isAutheticated();

    const getEvent = useCallback(async () => {
        let res = await axios.get(
            `/api/event/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setEvent(res.data.Event)


    }, [token]);

    useEffect(() => {
        getEvent();
    }, [getEvent]);


    const handleDelete = async (id) => {
        let status = window.confirm("Do you want to delete");
        if (!status) return;

        let res = await axios.delete(`/api/event/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)
        if (res.data.success == true) {
            swal("success!", "Event Deleted Successfully!", "success");
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
                                <h4 className="mb-3">CMP-Event</h4>
                                <Link to="/addEvent"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Event</button></Link>
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
                                                    <th>Location</th>
                                                    <th>Added On</th>
                                                    <th>Attended By</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {event && event.map((item, index) =>
                                                    <RegisterUser item={item} handleDelete={handleDelete} formatAMPM={formatAMPM} />
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

export default Event;
