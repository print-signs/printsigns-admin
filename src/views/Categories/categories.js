import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAutheticated } from "src/auth";
import {
  Button,
  Box,
  IconButton,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClipLoader } from "react-spinners";
import swal from "sweetalert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "0.5rem",
  boxShadow: 24,
  width: "500px",
};

const Categories = () => {
  const token = isAutheticated();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(true); // for loading state
  // const [isUpdate, setIsUpdate] = useState(false); // for edit state
  const [saveLoding, setSaveLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [olderCategoryName, setOlderCategoruName] = useState("");
  const [olderImage, setOlderImage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // setUpdating(false);
    setEdit(false);

    setCategoryName("");
    setCategoryId("");
    setOlderImage("");
    setCategoryImage("");
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/category/getCategories", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (response.status === 200) {
        setCategory(response?.data?.categories);
        setLoading(false);
      }
    } catch (error) {
      swal({
        title: error,
        text: " please login to access the resource ",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, [token]);

  const handleEditClick = (_id, categoryName, categoryImage) => {
    setOpen(true);
    setOlderImage(categoryImage);
    setCategoryName(categoryName);
    setCategoryId(_id);
    setOlderCategoruName(categoryName);
    setEdit(true);
    // setUpdating(false);
  };
  const categoryNamesArray = [];
  const setCategoryNamesArray = () => {
    category &&
      category.map((category) => {
        categoryNamesArray.push(category.categoryName.toLowerCase());
      });
  };
  setCategoryNamesArray();

  const handleUpdate = () => {
    const filteredArrayNames = categoryNamesArray.filter(
      (item) => item !== olderCategoryName.toLowerCase()
    );
    console.log(filteredArrayNames, "filter");
    const categoryExits = filteredArrayNames.includes(
      categoryName.toLowerCase()
    );
    if (categoryExits) {
      swal({
        title: "Warning",
        text: "Category already exists ",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
      return;
    }

    if (!categoryName || (!categoryImage && !olderImage)) {
      swal({
        title: "Warning",
        text: "Please fill all the  required  fields!",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
      return;
    }
    setUpdating(false);
    const formData = new FormData();
    formData.append("categoryName", categoryName);

    formData.append("categoryImage", categoryImage);

    formData.append("olderImage", JSON.stringify(olderImage));

    axios
      .patch(`/api/category/update/${categoryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // setUpdating(true);
        // setIsUpdate(false);
        handleClose();
        setCategoryId("");
        setCategoryName("");
        setCategoryImage("");
        setOlderImage("");
        setUpdating(true);
        setEdit(false);
        swal({
          title: "Congratulations!!",
          text: "The category was updated successfully!",
          icon: "success",
          button: "OK",
        });
        // getCategories(); // Refresh the category list after updating
      })
      .catch((err) => {
        swal({
          title: "Sorry, please try again",
          text: err,
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
        setUpdating(true);
      });
  };

  const handleDelete = (_id) => {
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
          .delete(`/api/category/delete/${_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Congratulations!!",
              text: "The category was deleted successfully!",
              icon: "success",
              button: "OK",
            });
            // getCategories(); // Refresh the category list after deleting
          })
          .catch((err) => {
            swal({
              title: "",
              text: "Something went wrong!",
              icon: "error",
              button: "Retry",
              dangerMode: true,
            });
          });
      }
    });
  };

  const handleSaveCategory = async () => {
    const categoryExits = categoryNamesArray.includes(
      categoryName.toLowerCase()
    );
    if (categoryExits) {
      swal({
        title: "Warning",
        text: "Category Already exits.",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
      return;
    }
    if (!categoryName || !categoryImage) {
      swal({
        title: "Warning",
        text: "Please fill all the  required  fields!",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
      return;
    }
    setSaveLoading(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryImage", categoryImage);

    axios
      .post("/api/category/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setOpen(false);
          setLoading(false);
          setSaveLoading(true);
          setCategoryName("");
          setCategoryImage("");
          setOlderImage("");
          swal({
            title: "Added",
            text: "New category added successfully!",
            icon: "success",
            button: "OK",
          });
          // getCategories(); // Refresh the category list after adding
        }
      })
      .catch((error) => {
        setSaveLoading(true);
        swal({
          title: error,
          text: "something went wrong",
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
      });
  };
  const getPageCount = () => {
    return Math.max(1, Math.ceil(category.length / itemPerPage));
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];

    // Check file types and append to selectedFiles
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(files.type)) {
      setCategoryImage(files);
    }
  };
  const handeldeleteImage = () => {
    setCategoryImage("");
  };
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
                  Categories
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
                    onClick={handleOpen}
                  // onClick={() => {
                  //   navigate("/testimonial/new", { replace: true });
                  // }}
                  >
                    Add New Category
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Box p={2} display={"flex"}>
                        <Typography
                          id="modal-modal-title"
                          variant="body"
                          component="h2"
                          flex={1}
                        >
                          Category Name
                        </Typography>
                        <IconButton onClick={() => handleClose()}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <hr />
                      <TextField
                        placeholder="category name"
                        value={categoryName}
                        fullWidth
                        inputProps={{
                          maxLength: 25,
                        }}
                        style={{
                          padding: "1rem",
                        }}
                        onChange={(e) =>
                          setCategoryName(
                            e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1)
                          )
                        }
                      />
                      {categoryName ? (
                        <>
                          <small className="charLeft mt-2 ml-3 fst-italic">
                            {25 - categoryName.length} characters left
                          </small>
                        </>
                      ) : (
                        <></>
                      )}

                      <Box
                        style={{
                          padding: "1rem",
                        }}
                      >
                        <label htmlFor="upload-Image">
                          <TextField
                            style={{
                              display: "none",
                              width: "350px",
                              height: "350px",
                              borderRadius: "10%",
                            }}
                            fullWidth
                            id="upload-Image"
                            type="file"
                            accept=".jpg , .png ,.jpeg"
                            label="file"
                            variant="outlined"
                            onChange={(e) => handleFileChange(e)}
                          />
                          <Box
                            style={{ borderRadius: "10%" }}
                            sx={{
                              margin: "1rem 0rem",
                              cursor: "pointer",
                              width: "140px",
                              height: "140px",
                              border: "2px solid grey",
                              // borderRadius: '50%',

                              "&:hover": {
                                background: "rgba(112,112,112,0.5)",
                              },
                            }}
                          >
                            <CloudUploadIcon
                              style={{
                                color: "grey",
                                margin: "auto",
                                fontSize: "5rem",
                              }}
                              fontSize="large"
                            />
                          </Box>
                        </label>
                        {categoryImage && (
                          <Box>
                            <img
                              src={URL.createObjectURL(categoryImage)}
                              alt="categoryImage"
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: "1rem",
                                marginLeft: "1rem",
                              }}
                            />
                            <DeleteSharpIcon
                              onClick={() => handeldeleteImage()}
                              fontSize="small"
                              sx={{
                                color: "white",
                                position: "absolute",
                                cursor: "pointer",
                                padding: "0.2rem",
                                background: "black",
                                borderRadius: "50%",
                              }}
                            />
                          </Box>
                        )}
                        {olderImage && (
                          <Box>
                            <img
                              src={olderImage?.secure_url}
                              alt="categoryImage"
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: "1rem",
                                marginLeft: "1rem",
                              }}
                            />
                            <DeleteSharpIcon
                              onClick={() => setOlderImage("")}
                              fontSize="small"
                              sx={{
                                color: "white",
                                position: "absolute",
                                cursor: "pointer",
                                padding: "0.2rem",
                                background: "black",
                                borderRadius: "50%",
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      {error && <p style={{ color: "red" }}>{error}</p>}
                      <p className="pt-1 pl-2 text-secondary">
                        Upload jpg, jpeg and png only*
                      </p>

                      <Box
                        p={2}
                        display={"flex"}
                        justifyContent={"right"}
                      // width={"500px"}
                      >
                        {!edit && (
                          <button
                            style={{
                              color: "white",
                              marginRight: "1rem",
                            }}
                            onClick={() => handleSaveCategory()}
                            type="button"
                            className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                          >
                            <ClipLoader loading={!saveLoding} size={18} />
                            {saveLoding && "Save"}
                          </button>
                        )}
                        {edit && (
                          <button
                            style={{
                              color: "white",
                              marginRight: "1rem",
                            }}
                            onClick={() => handleUpdate()}
                            type="button"
                            className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                          >
                            <ClipLoader loading={!updating} size={18} />
                            {updating && "update"}
                          </button>
                        )}
                        <button
                          style={{
                            color: "black",
                            marginRight: "1rem",
                            background: "grey",
                          }}
                          onClick={() => setOpen(false)}
                          type="button"
                          className="
                                      btn  btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                        >
                          Close
                        </button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            style={{ width: "10%" }}
                            onChange={(e) => setItemPerPage(e.target.value)}
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
                          <th> Image</th>

                          <th> Categories Name</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading && category.length === 0 && (
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
                        ) : (
                          category &&
                          category
                            .slice(
                              (`${page}` - 1) * itemPerPage,
                              `${page}` * itemPerPage
                            )
                            .map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <img
                                    className="me-2"
                                    src={item?.categoryImage?.secure_url}
                                    width="40"
                                    alt=""
                                  />
                                  <h5>{ } </h5>
                                </td>
                                <td>
                                  <h5>{item.categoryName} </h5>
                                </td>
                                <td className="text-start">
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
                                    onClick={() =>
                                      handleEditClick(
                                        item._id,
                                        item.categoryName,
                                        item.categoryImage
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    style={{
                                      color: "white",
                                      marginRight: "1rem",
                                      background: "red",
                                    }}
                                    type="button"
                                    className="
                                      btn  btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    mx-1
                                    mt-1
                                  "
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <Pagination
                      style={{ margin: "2rem" }}
                      variant="outlined"
                      size="large"
                      count={getPageCount()}
                      color="primary"
                      onChange={(event, value) => setPage(value)}
                    />
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

export default Categories;
