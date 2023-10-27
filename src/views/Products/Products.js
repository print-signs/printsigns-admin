import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAutheticated } from "src/auth";
import swal from "sweetalert";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from "fuse.js";
import { Typography } from "@material-ui/core";
const Products = () => {
  const token = isAutheticated();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [queryData, setQueryData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(productsData);

  const handleShowEntries = (e) => {
    setCurrentPage(1);
    setItemPerPage(e.target.value);
  };

  const getProductsData = async () => {
    axios
      .get(`/api/product/getAll/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProductsData(res.data?.product);
        setLoading(false);
      })
      .catch((error) => {
        swal({
          title: error,
          text: "please login to access the resource or refresh the page  ",
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductsData();
  }, [success]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      setShowData(productsData.slice(indexOfFirstPost, indexOfLastPost));
    };
    loadData();
  }, [currentPage, itemPerPage, productsData]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "error",
      buttons: {
        Yes: { text: "Yes", value: true },
        Cancel: { text: "Cancel", value: "cancel" },
      },
    }).then((value) => {
      if (value === true) {
        axios
          .delete(`/api/product/delete/${id}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Deleted",
              text: "Product Deleted successfully!",
              icon: "success",
              button: "ok",
            });
            setSuccess((prev) => !prev);
          })
          .catch((err) => {
            swal({
              title: "Warning",
              text: "Something went wrong!",
              icon: "error",
              button: "Retry",
              dangerMode: true,
            });
          });
      }
    });
  };
  const [filterCategory, setFilterCategory] = useState("");

  const handleSearchClick = (query) => {
    const option = {
      isCaseSensitive: true,
      includeScore: false,
      shouldSort: true,
      includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 1,
      location: 0,
      threshold: 0.6,
      distance: 100,
      useExtendedSearch: true,
      ignoreLocation: false,
      ignoreFieldNorm: false,
      fieldNormWeight: 1,
      keys: ["name"],
    };

    const fuse = new Fuse(productsData, option);
    const result = fuse.search(query);

    const searchedResult = result.map((result) => result.item);

    setQueryData(searchedResult);
  };
  useEffect(() => {
    if (query !== "") {
      setFilterCategory("");
    }
    setTimeout(() => handleSearchClick(query), 100);
  }, [query]);
  useEffect(() => {
    setTimeout(() => {
      if (filterCategory !== "") {
        const filteredProducts = productsData.filter(
          (product) => product.category === filterCategory
        );
        setFilterData(filteredProducts);
      } else {
        // If no category is selected, show all products
        setShowData(productsData);
        // setFilterData(filteredProducts);
      }
    }, 100);
  }, [filterCategory, productsData]);
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <div style={{ fontSize: "22px" }} className="fw-bold">
                  Products
                </div>

                <div className="page-title-right">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      navigate("/product/add", { replace: true });
                    }}
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0 mb-10 ">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            style={{ width: "10%" }}
                            name=""
                            onChange={(e) => handleShowEntries(e)}
                            className="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              margin: "1rem 1rem 1rem 0rem",
                            }}
                          >
                            <Typography
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                marginRight: "1rem",
                              }}
                            >
                              Search by product name :
                            </Typography>
                            <TextField
                              style={{
                                background: "#ECECEC",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "8px",
                                flex: "1",
                                border: " 1px solid #EEF2F6",
                                marginRight: "2rem",
                              }}
                              placeholder="Search here..."
                              variant="standard"
                              color="white"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <IconButton
                                    sx={{
                                      background: "blue",
                                      color: "white",
                                      marginTop: "0.1rem",
                                    }}
                                    onClick={() => handleSearchClick(query)}
                                  >
                                    <SearchIcon fontSize="small" />
                                  </IconButton>
                                ),
                                disableUnderline: true,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              margin: "1rem 0rem",
                            }}
                          >
                            <Typography
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                marginRight: "1rem",
                              }}
                            >
                              Filter by Category name :
                            </Typography>

                            <FormControl style={{ flex: "1" }}>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                value={filterCategory}
                                onChange={(e) =>
                                  setFilterCategory(e.target.value)
                                }
                              >
                                {showData.map((product, i) => (
                                  <MenuItem
                                    key={i}
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "left",
                                      textAlign: "left",
                                      padding: "0.5rem",
                                    }}
                                    value={product.category}
                                  >
                                    {product.category}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive table-shoot mt-3">
                    <table
                      className="table table-centered table-nowrap"
                      style={{ border: "1px solid" }}
                    >
                      <thead
                        className="thead-info"
                        style={{ background: "rgb(140, 213, 213)" }}
                      >
                        <tr>
                          <th className="text-start">Image</th>
                          <th className="text-start">Product Name</th>
                          <th className="text-start">Category Name</th>

                          <th className="text-start">Price</th>
                          <th className="text-start">Added On</th>
                          <th className="text-start">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading && showData.length === 0 && (
                          <tr className="text-center">
                            <td colSpan="6">
                              <h5>No Data Available</h5>
                            </td>
                          </tr>
                        )}
                        {loading ? (
                          <tr>
                            <td className="text-center" colSpan="6">
                              Loading...
                            </td>
                          </tr>
                        ) : query === "" && filterCategory == "" ? (
                          showData.map((product, i) => {
                            return (
                              <tr key={i}>
                                <th>
                                  {product.image &&
                                    product.image.map((i, j) => (
                                      <img
                                        key={j}
                                        className="me-2"
                                        src={`${i?.url}`}
                                        width="40"
                                        alt=""
                                      />
                                    ))}
                                </th>
                                <td className="text-start">{product.name}</td>
                                <td className="text-start">
                                  {product.category !== ""
                                    ? product.category
                                    : "Category Not selected "}
                                </td>
                                <th className="text-start">${product.price}</th>
                                <td className="text-start">
                                  {new Date(product.createdAt).toLocaleString(
                                    "en-IN",
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </td>
                                <td className="text-start">
                                  <Link to={`/product/view/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                                    >
                                      View
                                    </button>
                                  </Link>
                                  <Link to={`/product/edit/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                  "
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  <Link
                                    to={"#"}
                                    style={{
                                      marginRight: "1rem",
                                    }}
                                  >
                                    <button
                                      style={{ color: "white" }}
                                      type="button"
                                      className="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                    
                                  "
                                      onClick={() => {
                                        handleDelete(product._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : query !== "" ? (
                          queryData.map((product, i) => {
                            return (
                              <tr key={i}>
                                <th>
                                  {product.image &&
                                    product.image.map((i, j) => (
                                      <img
                                        key={j}
                                        className="me-2"
                                        src={`${i?.url}`}
                                        width="40"
                                        alt=""
                                      />
                                    ))}
                                </th>
                                <td className="text-start">{product.name}</td>
                                <td className="text-start">
                                  {product.category !== ""
                                    ? product.category
                                    : "Category Not selected "}
                                </td>
                                <th className="text-start">₹{product.price}</th>
                                <td className="text-start">
                                  {new Date(product.createdAt).toLocaleString(
                                    "en-IN",
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </td>
                                <td className="text-start">
                                  <Link to={`/product/view/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                                    >
                                      View
                                    </button>
                                  </Link>
                                  <Link to={`/product/edit/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                  "
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  <Link
                                    to={"#"}
                                    style={{
                                      marginRight: "1rem",
                                    }}
                                  >
                                    <button
                                      style={{ color: "white" }}
                                      type="button"
                                      className="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                    
                                  "
                                      onClick={() => {
                                        handleDelete(product._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          query == "" &&
                          filterData.map((product, i) => {
                            return (
                              <tr key={i}>
                                <th>
                                  {product.image &&
                                    product.image.map((i, j) => (
                                      <img
                                        key={j}
                                        className="me-2"
                                        src={`${i?.url}`}
                                        width="40"
                                        alt=""
                                      />
                                    ))}
                                </th>
                                <td className="text-start">{product.name}</td>
                                <td className="text-start">
                                  {product.category}
                                </td>
                                <th className="text-start">₹{product.price}</th>
                                <td className="text-start">
                                  {new Date(product.createdAt).toLocaleString(
                                    "en-IN",
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </td>
                                <td className="text-start">
                                  <Link to={`/product/view/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                                    >
                                      View
                                    </button>
                                  </Link>
                                  <Link to={`/product/edit/${product._id}`}>
                                    <button
                                      style={{
                                        color: "white",
                                        marginRight: "1rem",
                                      }}
                                      type="button"
                                      className="
                                      btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                  "
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  <Link
                                    to={"#"}
                                    style={{
                                      marginRight: "1rem",
                                    }}
                                  >
                                    <button
                                      style={{ color: "white" }}
                                      type="button"
                                      className="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mt-1
                                    mx-1
                                    
                                  "
                                      onClick={() => {
                                        handleDelete(product._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * itemPerPage,
                          productsData.length
                        )}{" "}
                        of {productsData.length} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="d-flex">
                        <ul className="pagination ms-auto">
                          <li
                            className={
                              currentPage === 1
                                ? "paginate_button page-item previous disabled"
                                : "paginate_button page-item previous"
                            }
                          >
                            <span
                              className="page-link"
                              style={{ cursor: "pointer" }}
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </span>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <span
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                              >
                                {currentPage - 1}
                              </span>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <span
                              className="page-link"
                              style={{ cursor: "pointer" }}
                            >
                              {currentPage}
                            </span>
                          </li>

                          {!(
                            (currentPage + 1) * itemPerPage - itemPerPage >
                            productsData.length - 1
                          ) && (
                            <li className="paginate_button page-item ">
                              <span
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setCurrentPage((prev) => prev + 1);
                                }}
                              >
                                {currentPage + 1}
                              </span>
                            </li>
                          )}

                          <li
                            className={
                              !(
                                (currentPage + 1) * itemPerPage - itemPerPage >
                                productsData.length - 1
                              )
                                ? "paginate_button page-item next"
                                : "paginate_button page-item next disabled"
                            }
                          >
                            <span
                              className="page-link"
                              style={{ cursor: "pointer" }}
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                              Next
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
