
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";
import Pagination from "./Pagination";
import RequirementOpt from "./RequirementOpt";

function Requirement() {
    const [requirement, setRequirement] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const token = isAutheticated();
    // console.log(token)
    const getRequirement = useCallback(async () => {
        let res = await axios.get(
            `/api/requirement/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setRequirement(res.data.Requirement)

    }, [token]);

    useEffect(() => {
        getRequirement();
    }, [getRequirement]);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = requirement.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);







    const handleApprove = async (id) => {
        let status = window.confirm("Do you want to Approve");
        if (!status) return;
        // console.log(email)
        try {
            let res = await axios.get(`/api/admin/requirement/approve/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(res.data)
            getRequirement()
            if (res.data.success == true) {
                swal("success!", "Requirement Approved !", "success");

            }
        } catch (error) {

            swal("Error:!", console.log(error), "error");
        }

    };




    return (
        <div className=" main-content">
            <div className="  my-3 page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-3">CMP-Requirements</h4>
                                <Link to="/requirement/add"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Requirements</button></Link>
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
                                                    <th>Area Of Interest</th>
                                                    <th>Added By</th>
                                                    <th>Added On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts && currentPosts.map((item, index) =>
                                                    <RequirementOpt key={index} item={item} handleApprove={handleApprove} />
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
            <Pagination postsPerPage={postsPerPage}
                totalPosts={requirement.length}
                paginate={paginate} />
        </div>
    );
}

export default Requirement;
