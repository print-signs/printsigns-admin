import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

const Bisuness = () => {
  const [bisuness, setBisuness] = useState([])



  const { token } = isAutheticated();

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
    let status = window.confirm("Do you want to delete");
    if (!status) {
      return;
    }
    let res = await axios.get(`/api/product/setStatus/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
                  {/* <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <Link to="/dashboard">Dating App</Link>
                                            </li>
                                            <li className="breadcrumb-item">Commerce - Products</li>
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
                      {/* <div className="col-sm-12 col-md-6">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show{" "}
                          <select
                            onChange={(e) =>
                              changeState({ limit: e.target.value, page: 1 })
                            }
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                    </div> */}
                      {/* <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <a href="/comproducts/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Product
                          </button>
                        </a>
                      </div>
                    </div> */}
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
                          {bisuness.map((item) =>

                            <tr>
                              <td>{item?.name} </td>
                              <td>{item?.category}</td>
                              <td>{item?.city}</td>
                              <td>
                                <span
                                  className={`badge rounded-pill bg-${status ? "success" : "danger"
                                    } font-size-10`}
                                >
                                  {status ? "Live" : "Suspended"}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`btn btn-${status ? "danger" : "success"
                                    }  btn-sm  waves-effect waves-light btn-table ml-1`}
                                  onClick={() => toggleStatus('_id')}
                                >
                                  {status ? "Suspend" : "Activate"}
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
    </>
  )
}

export default Bisuness