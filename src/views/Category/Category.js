import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

function Products() {
  const [category, setCategory] = useState([])
  const [state, setState] = useState({
    products: [],
    page: 1,
    limit: 10,
    totalProducts: 0,
    pages: 1,
  });

  window.scrollTo({ behavior: "smooth", top: "0px" });

  const { products, page, limit, totalProducts, pages } = state;

  const changeState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const token = isAutheticated();

  const getProducts = useCallback(async () => {
    let res = await axios.get(
      `/api/category/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data.category)
    setCategory(res.data.category)
    // console.log(category[0].addedOn)
    changeState({
      ...res.data,
      pages: Math.ceil(res.data.totalProducts / limit),
    });
  }, [limit, page, token]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // const getTotalPages = useMemo(() => {
  //   const length = pages > 1 ? pages : totalProducts ? 1 : 0;
  //   return Array.from({ length }, (_, i) => i + 1);
  // }, [pages, totalProducts]);

  // console.log(getTotalPages);

  const handleDelete = async (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) return;

    let res = await axios.delete(`/api/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res)
    if (res.data.success == true) {
      swal("success!", "Category Deleted Successfully!", "success");
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
                <h4 className="mb-3">CMP-Category</h4>
                <Link to="/addCategory"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add Category</button></Link>
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
                          <th>Name</th>
                          <th>Category Image</th>
                          <th>Category Banner</th>
                          <th>Added On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category && category.map((item, index) =>
                          <tr key={index}>
                            <td>{item?.name}</td>
                            <td>
                              <img src={`${item?.image.url}`} width="50" alt="" />
                            </td>
                            <td>

                              {item.category_banner && <img src={`${item?.category_banner.url}`} width="50" alt="" />}
                            </td>
                            <td>
                              {/* {item?.addedOn} */}
                              {new Date(`${item?.addedOn}`).toDateString()}<span> , {`${formatAMPM(item?.addedOn)}`}</span>

                            </td>


                            <td>
                              <Link to={`/category/edit/${item._id}`}>

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

export default Products;
