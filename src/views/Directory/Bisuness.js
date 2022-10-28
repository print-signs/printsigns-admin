import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
// import { API } from "../../data";
import { isAutheticated } from "../../auth";
import Pagination from "./Pagination";

const Bisuness = () => {
  const [bisuness, setBisuness] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);


  const token = isAutheticated();

  const getProducts = useCallback(async () => {
    let res = await axios.get(
      `/api/directory/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data.directory)
    setBisuness(res.data.directory)
    // changeState({
    //     ...res.data,
    //     pages: Math.ceil(res.data.totalProducts / limit),
    // });
  }, [token]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Get current posts
  //pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bisuness.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) return;

    let res = await axios.delete(`/api/directory/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res)

    if (res.data.success == true) {
      swal("success!", "Directory Deleted Successfully!", "success");
      window.location.reload();

    }
  };

  const toggleStatus = async (id) => {
    let status = window.confirm("Do you want to change status");
    if (!status) {
      return;
    }
    let res = await axios.get(`/api/directory/admin/setStatus/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res)
    if (res.status === 200) window.location.reload();
  };

  return (
    <>
      <div className=" main-content">
        <div className="  my-3 page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-3">Bisuness-Directory</h4>
                  <Link to="/add_bisuness"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Bisuness</button></Link>

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
                            <th>Category</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPosts.map((item, index) =>

                            <tr key={index}>
                              <td>{item?.name} </td>
                              <td>{item?.category}</td>
                              <td>{item?.city}</td>
                              <td>
                                <span
                                  className={`badge rounded-pill bg-${item.status === "true" ? "success" : "danger"
                                    } font-size-10`}
                                >
                                  {item.status === "true" ? "Live" : "Suspended"}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`btn btn-${item.status === "true" ? "danger" : "success"
                                    }  btn-sm  waves-effect waves-light btn-table ml-1`}
                                  onClick={() => toggleStatus(item._id)}
                                >
                                  {item.status === "true" ? "Suspend" : "Activate"}
                                </button>
                                <Link to={`/view_bisuness/${item._id}`}>

                                  <button
                                    type="button"
                                    className=" mx-1 mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-1"
                                  >
                                    View
                                  </button>
                                </Link>

                                <Link to={`/bisuness/edit/${item._id}`}>

                                  <button
                                    type="button"
                                    className=" mx-1 mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-1"
                                  >
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item._id)}
                                  className="mx-1 mt-1 btn btn-danger btn-sm  waves-effect waves-light btn-table ml-1"
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

                    {/* <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing{" "}
                        {!totalProducts
                          ? totalProducts
                          : page * limit - (limit - 1)}{" "}
                        to{" "}
                        {totalProducts > limit
                          ? limit * page > totalProducts
                            ? totalProducts
                            : limit * page
                          : totalProducts}{" "}
                        of {totalProducts} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item previous ${page < 2 ? "disabled" : ""
                              }`}
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabIndex={page - 1}
                              onClick={() => changeState({ page: page - 1 })}
                              className="page-link"
                            >
                              Previous
                            </button>
                          </li>

                          {getTotalPages.map((pageNo) => {
                            return (
                              <li
                                className={`paginate_button page-item ${pageNo === page ? "active" : ""
                                  }`}
                              >
                                <button
                                  key={`page_no_${pageNo}`}
                                  value={pageNo}
                                  id={pageNo}
                                  aria-controls="datatable"
                                  data-dt-idx="1"
                                  tabIndex="0"
                                  className="page-link "
                                  onClick={() => changeState({ page: pageNo })}
                                >
                                  {pageNo}
                                </button>
                              </li>
                            );
                          })}

                          <li
                            className={`paginate_button page-item next ${page === getTotalPages.length ? "disabled" : ""
                              }`}
                          >
                            <button
                              onClick={() => changeState({ page: page + 1 })}
                              tabIndex={page + 1}
                              className="page-link"
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}

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
        totalPosts={bisuness.length}
        paginate={paginate} />
    </>
  )
}

export default Bisuness