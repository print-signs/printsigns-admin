import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
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

const AddProduct = () => {
  const token = isAutheticated();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allTax, setAllTax] = useState([]);
  const [categories, setCategoies] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  // const [allimage, setAllImage] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = e.target.files;

    // Check the total number of selected files
    if (productImages.length + files.length > 4) {
      setError("You can only upload up to 4 images.");
      return;
    }

    // Check file types and append to selectedFiles
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const selected = [];

    for (let i = 0; i < files.length; i++) {
      if (productImages.length + selected.length >= 4) {
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
      setProductImages([...productImages, ...selected]);
    }
  };

  const handelDelete = (image) => {
    const filtered = productImages.filter((item) => item !== image);
    setProductImages(filtered);
  };
  // get All categories
  const getCategories = async () => {
    try {
      const response = await axios.get("/api/category/getCategories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategoies(response?.data?.categories);
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
  // Get all tax
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
  useEffect(() => {
    getAllTax();
    getCategories();
  }, [token]);

  // const handleChange = (e) => {
  //   if (e.target.id === "image") {
  //     if (
  //       e.target.files[0]?.type === "image/jpeg" ||
  //       e.target.files[0]?.type === "image/png" ||
  //       e.target.files[0]?.type === "image/jpg"
  //     ) {
  //       if (imagesPreview.length > 3) {
  //         swal({
  //           title: "Warning",
  //           text: "maximum Four image Upload ",
  //           icon: "error",
  //           button: "Close",
  //           dangerMode: true,
  //         });
  //         return;
  //       }
  //       // only for file preview------------------------------------
  //       const files = Array.from(e.target.files);
  //       files.forEach((file) => {
  //         const reader = new FileReader();

  //         reader.onload = () => {
  //           if (reader.readyState === 2) {
  //             setImagesPreview((old) => [...old, reader.result]);
  //           }
  //         };

  //         reader.readAsDataURL(file);
  //       });
  //       // -----------------------------------------------------------------------------

  //       setData((prev) => ({
  //         ...prev,

  //         image: [...data.image, ...e.target.files],
  //       }));
  //       return;
  //     } else {
  //       swal({
  //         title: "Warning",
  //         text: "Upload jpg, jpeg, png only.",
  //         icon: "error",
  //         button: "Close",
  //         dangerMode: true,
  //       });
  //       setData((prev) => ({
  //         ...prev,
  //         imageURL: "",
  //         image: "",
  //       }));
  //       e.target.value = null;
  //       return;
  //     }
  //   }
  //   setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  // const TaxRatechange = async (e) => {
  //   let taxDetails = {
  //     name: e.target.value.slice(12, 16),
  //     rate: Number(e.target.value.slice(4, 6)),

  //     taxId: e.target.value.slice(24),
  //   };

  //   let trRate = taxDetails.rate / 100;
  //   let PriceWithT = Number(data.price);
  //   PriceWithT += +(PriceWithT * trRate).toFixed();

  //   //price_Level_2_With_Tax
  //   let price_Level_2_With_Tax = Number(data.price_Level_2);
  //   price_Level_2_With_Tax += +(price_Level_2_With_Tax * trRate).toFixed();
  //   //
  //   //price_Level_3_With_Tax
  //   let price_Level_3_With_Tax = Number(data.price_Level_3);
  //   price_Level_3_With_Tax += +(price_Level_3_With_Tax * trRate).toFixed();
  //   setData((prev) => ({
  //     ...prev,
  //     price_With_Tax: PriceWithT,

  //     price_Level_2_With_Tax: price_Level_2_With_Tax,

  //     price_Level_3_With_Tax: price_Level_3_With_Tax,
  //     taxId: taxDetails.taxId,
  //   }));
  // };

  // console.log(data.image.length)
  const handleSubmit = () => {
    if (
      name == "" ||
      description == "" ||
      productImages.length == 0 ||
      price == ""
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

    productImages.forEach((Singleimage) => {
      // console.log(Singleimage)
      formData.append("image", Singleimage);
    });

    axios
      .post(`/api/product/create/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        swal({
          title: "Added",
          text: "Product added successfully!",
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
  // console.log(data);
  console.log(productImages);
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
              Add Product
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
                {loading ? "Loading" : "Save"}
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

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Product Image*
                </label>
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
                <p className="pt-1 pl-2 text-secondary">
                  Upload jpg, jpeg and png only*
                </p>
                <Box style={{ display: "flex" }}>
                  {productImages &&
                    productImages.map((image, i) => (
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
                        {/* <IconButton
                          onClick={() => handelDelete(image)}
                          sx={{
                            position: "absolute",
                            fontSize: "small",
                            "&:hover": {
                              background: "black",
                            },
                            background: "black",
                          }}
                        > */}
                        <DeleteSharpIcon
                          onClick={() => handelDelete(image)}
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
                        {/* </IconButton> */}
                      </Box>
                    ))}
                </Box>
              </div>
              <div>
                <strong className="fs-6 fst-italic">
                  *You cannot upload more than 4 images !!
                </strong>
              </div>

              <div id="createProductFormImage" className="w-25 d-flex">
                {imagesPreview.map((image, index) => (
                  <img
                    className=" w-50 p-1 "
                    key={index}
                    src={image}
                    alt="Product Preview"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6  col-sm-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3 me-3">
                <label htmlFor="title" className="form-label">
                  Price*
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

export default AddProduct;
