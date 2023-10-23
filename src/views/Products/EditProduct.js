import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { isAutheticated } from "src/auth";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import { WebsiteURL } from '../WebsiteURL'

const EditProduct = () => {
  const id = useParams()?.id;

  const token = isAutheticated();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allTax, setAllTax] = useState([]);
  const [categories, setCatgories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [newUpdatedImages, setNewUpdatedImages] = useState([]);

  //get Productdata
  const getProduct = async () => {
    axios
      .get(`/api/product/getOne/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res?.data?.product.name);
        setDescription(res.data.product.description);
        setProductImages(res.data.product.image);
        setPrice(res.data.product.price);
        setCategoryName(res.data.product.category);
      })
      .catch((err) => {
        swal({
          title: error,
          text: " Can not fetch the product  ",
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
      });
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/category/getCategories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCatgories(response?.data?.categories);
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
    getProduct();
    getCategories();
  }, []);

  useEffect(() => {
    const getAllTax = async () => {
      const res = await axios.get(`/api/tax/view_tax`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setAllTax(res.data);
      }
    };
    getAllTax();
  }, [token]);

  const handleSubmit = () => {
    if (
      name == "" ||
      description == "" ||
      price == "" ||
      (productImages.length == 0 && newUpdatedImages.length == 0)
      // data.price_With_Tax === '' ||
      // data.price_Level_2 === '' ||
      // data.price_Level_2_With_Tax === '' ||
      // data.price_Level_3 === '' ||
      // data.price_Level_3_With_Tax === '' ||
      // data.imageURL.trim() === ''
    ) {
      swal({
        title: "Warning",
        text: "Fill all mandatory fields",
        icon: "error",
        button: "Close",
        dangerMode: true,
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);

    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", categoryName);

    newUpdatedImages.length > 0 &&
      newUpdatedImages.forEach((Singleimage) => {
        formData.append("newImages", Singleimage);
      });

    formData.append("image", JSON.stringify(productImages));

    axios
      .patch(`/api/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        swal({
          title: "Updated",
          text: "Product Updated successfully!",
          icon: "success",
          button: "ok",
        });
        setLoading(false);
        navigate("/products", { replace: true });
      })
      .catch((err) => {
        setLoading(false);

        const message = err.response?.data?.message
          ? err.response?.data?.message
          : "Something went wrong!";
        swal({
          title: "Warning",
          text: message,
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
      });
  };
  const handleFileChange = (e) => {
    const files = e.target.files;

    // Check the total number of selected files
    if (newUpdatedImages.length + files.length > 4 - productImages.length) {
      setError("You can only upload up to 4 images.");
      return;
    }

    // Check file types and append to selectedFiles
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const selected = [];

    for (let i = 0; i < files.length; i++) {
      if (
        newUpdatedImages.length + selected.length >=
        4 - productImages.length
      ) {
        break; // Don't allow more than 4 images
      }

      if (allowedTypes.includes(files[i].type)) {
        selected.push(files[i]);
      }
    }

    if (selected.length === 0) {
      setError("Please upload only PNG, JPEG, or JPG files.");
    } else {
      setError("");
      setNewUpdatedImages([...newUpdatedImages, ...selected]);
    }
  };

  const handelDelete = async (public_id) => {
    const ary = public_id.split("/");

    const res = await axios.delete(
      `/api/product/deleteImage/jatinMor/product/${ary[2]}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      const filtered = productImages.filter(
        (item) => item.public_id !== public_id
      );
      setProductImages(filtered);
    }
  };
  const handellocalDelete = (image) => {
    const filtered = productImages.filter((item) => item !== image);
    setProductImages(filtered);
  };
  return (
    <div className="container">
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
              Edit Product
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                  marginRight: "5px",
                }}
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? "Loading" : "Edit"}
              </Button>
              <Link to="/products">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "capitalize",
                  }}
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6  col-sm-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Product Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  maxLength={25}
                  onChange={(e) => setName(e.target.value)}
                />
                {name ? (
                  <>
                    <small className="charLeft mt-4 fst-italic">
                      {25 - name.length} characters left
                    </small>
                  </>
                ) : (
                  <></>
                )}{" "}
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Description*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  maxLength="100"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {description ? (
                  <>
                    <small className="charLeft mt-4 fst-italic">
                      {100 - description.length} characters left
                    </small>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <Box>
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
                    multiple
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
              </Box>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <strong className="fs-6 fst-italic">
                  *You cannot upload more than 4 images
                </strong>
              </div>

              <Box style={{ display: "flex" }}>
                {productImages &&
                  productImages.map((image, i) => (
                    <Box marginRight={"2rem"}>
                      <img
                        src={image.url}
                        alt="profileImage"
                        style={{
                          width: 70,
                          height: 70,

                          marginBottom: "1rem",
                        }}
                      />
                      {productImages.length + newUpdatedImages.length > 1 && (
                        <DeleteSharpIcon
                          onClick={() => handelDelete(image.public_id)}
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
                      )}
                      {/* </IconButton> */}
                    </Box>
                  ))}
                {newUpdatedImages &&
                  newUpdatedImages.map((image, i) => (
                    <Box marginRight={"2rem"}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="profileImage"
                        style={{
                          width: 70,
                          height: 70,

                          marginBottom: "1rem",
                        }}
                      />
                      {productImages.length + newUpdatedImages.length > 1 && (
                        <DeleteSharpIcon
                          onClick={() => handellocalDelete(image)}
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
                      )}
                      {/* </IconButton> */}
                    </Box>
                  ))}
              </Box>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6  col-sm-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3 me-3">
                <label htmlFor="title" className="form-label">
                  Price (optional)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="categorySelect">Select a Category:</label>
                {/* <select
                  id="category"
                  style={{ width: "100%" }}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <option value={""}>None</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select> */}
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <MenuItem
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "left",
                        padding: "0.5rem",
                      }}
                      value={""}
                    >
                      None
                    </MenuItem>
                    {categories.map((category, i) => (
                      <MenuItem
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "left",
                          textAlign: "left",
                          padding: "0.5rem",
                        }}
                        key={i}
                        value={category.categoryName}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {allTax.length > 0 && (
                <div className=" mb-3">
                  <label htmlFor="title" className="form-label">
                    Tax*
                  </label>{" "}
                  <select
                    className="   form-control"
                    name=""
                    id=""
                    onChange={(e) => TaxRatechange(e)}
                  >
                    <option value="" disabled>
                      -----
                    </option>

                    {allTax.map((t, i) => (
                      <option
                        key={i}
                        value={`tax:${t.tax},name:${t.name}  ,taxId:${t._id}`}
                      >
                        {t.tax}% {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
