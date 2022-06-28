
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function feedback() {
    const [feedback, setFeedback] = useState([])


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const token = isAutheticated();

    const getRestriction = useCallback(async () => {
        let res = await axios.get(
            `/api/feedback/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data.feedback)
        setFeedback(res.data.feedback)


    }, [token]);

    useEffect(() => {
        getRestriction();
    }, [getRestriction]);


    // console.log(cmsRes)

    // Get current posts
    //pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = feedback.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
        <>
            <div className=" main-content">
                <div className="  my-3 page-content">
                    <div className="container-fluid">
                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-3">CMP-Feedback</h4>

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
                                                        <th>Description</th>
                                                        <th>Given At</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentPosts && currentPosts.map((item, index) =>
                                                        <tr>

                                                            <td>{item?.name}</td>
                                                            <td>{item?.description}</td>

                                                            <td>

                                                                {new Date(`${item?.createdAt}`).toDateString()}<span> , {`${formatAMPM(item?.createdAt)}`}</span>

                                                            </td>



                                                            <td>
                                                                <Link to={`/feedback/view/${item._id}`}>

                                                                    <button
                                                                        type="button"
                                                                        className="mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                                    >
                                                                        View
                                                                    </button>
                                                                </Link>


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
            <Pagination postsPerPage={postsPerPage}
                totalPosts={feedback.length}
                paginate={paginate} />
        </>
    );
}

export default feedback;
