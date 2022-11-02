
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";
import Pagination from "./Pagination";

function cms() {
    const [cmsRes, setCmsRes] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(15);
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

        setCmsRes(res.data.CmpRestriction)


    }, [token]);

    useEffect(() => {
        getRestriction();
    }, [getRestriction]);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = cmsRes.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleDelete = async (id) => {
        let status = window.confirm("Do you want to delete");
        if (!status) return;

        let res = await axios.delete(`/api/restriction/cms/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res)
        if (res.data.success == true) {
            swal("success!", "Cms Deleted Successfully!", "success");
            window.location.reload();
            // if (res.status === 200) window.location.reload();
        }
        else {
            swal("error!", "failled!", "error");

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
                                <h4 className="mb-3">CMP-CMS</h4>
                                {/* <Link to="/cms/new"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add New Page</button></Link> */}

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
                                                    {/* <th>Page Data</th> */}

                                                    {/* <th>image</th> */}
                                                    <th>Added On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts && currentPosts.map((item, index) =>
                                                    <tr key={index}>


                                                        <td>{item.title}</td>
                                                        {/* <td>{item?.page_data}</td> */}
                                                        {/* {item.image ? <td>
                                                            <img src={`${item?.image.url}`} width="50" alt="" /></td> :
                                                            <><p></p></>
                                                        } */}

                                                        <td>
                                                            {/* {item?.addedOn} */}
                                                            {new Date(`${item?.createdAt}`).toDateString()}<span> , {`${formatAMPM(item?.createdAt)}`}</span>

                                                        </td>

                                                        <td>
                                                            <Link to={`/cms/view/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className="mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    View
                                                                </button>
                                                            </Link>
                                                            <Link to={`/cms/edit/${item._id}`}>

                                                                <button
                                                                    type="button"
                                                                    className="mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(`${item._id}`)}
                                                                className="  btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
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


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- container-fluid --> */}
            </div>
            <Pagination postsPerPage={postsPerPage}
                totalPosts={cmsRes.length}
                paginate={paginate} />
        </div>
    );
}

export default cms;
