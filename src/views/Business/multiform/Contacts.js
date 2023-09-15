import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { isAutheticated } from "src/auth";
import toast from "react-hot-toast";
// import { WebsiteURL } from '../WebsiteURL'

const Contacts = (props) => {
  const token = isAutheticated();

  const navigate = useNavigate();

  const { data, setData } = props.data;

  const { loading, setLoading } = props.loading;
  // const [data, setData] = useState({
  //     image: '',
  //     imageURL: '',
  //     name: '',
  //     email: '',

  //     short_url: '',
  //     contact_Number: '',
  //     contact_Person_Name: '',

  // })

  const [validForm, setValidForm] = useState(false);

  const [errors, setErrors] = useState({
    emailError: "",
    phoneError: "",
  });
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validPhoneRegex = RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );

  const validateForm = () => {
    let valid = true;
    Object.values(errors).forEach((val) => {
      if (val.length > 0) {
        valid = false;
        return false;
      }
    });
    Object.values(data.email).forEach((val) => {
      if (val.length <= 0) {
        valid = false;
        return false;
      }
    });
    return valid;
  };

  //cheking email and password
  useEffect(() => {
    if (validateForm()) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    if (e.target.id === "userName") {
      if (e.target.value.length < 0) return;

      setData((prev) => ({
        ...prev,
        short_url: e.target.value.toLowerCase().replace(/\s+/g, "-"),
      }));
    }

    if (e.target.id === "contact_Number") {
      setErrors({
        ...errors,
        phoneError: validPhoneRegex.test(e.target.value)
          ? ""
          : "Number is not valid!",
      });
    }
    if (e.target.id === "email") {
      setErrors({
        ...errors,
        emailError: validEmailRegex.test(e.target.value)
          ? ""
          : "Email is not valid!",
      });
    }

    if (e.target.id === "image") {
      if (
        e.target.files[0]?.type === "image/jpeg" ||
        e.target.files[0]?.type === "image/png" ||
        e.target.files[0]?.type === "image/jpg"
      ) {
        setData((prev) => ({
          ...prev,
          imageURL: URL.createObjectURL(e.target.files[0]),
          image: e.target.files[0],
        }));
        return;
      } else {
        swal({
          title: "Warning",
          text: "Upload jpg, jpeg, png only.",
          icon: "error",
          button: "Close",
          dangerMode: true,
        });
        setData((prev) => ({
          ...prev,
          imageURL: "",
          image: "",
        }));
        e.target.value = null;
        return;
      }
    }
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
              Basic Information
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
                onClick={() => props.handleView(1)}
                // disabled={loading}
              >
                Prev
              </Button>

              <Button
                variant="contained"
                color="secondary"
                style={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  if (
                    data.business_name === "" ||
                    data.email === "" ||
                    data.contact_Number === ""
                  ) {
                    toast.error("Enter All Details");
                  } else {
                    props.handleView(4);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  value={data.userName}
                  maxLength={50}
                  onChange={(e) => handleChange(e)}
                />
                {data.userName.length > 0 && (
                  <p className="pt-1 pl-2 text-secondary">
                    Remaining characters : {50 - data.userName.length}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={data.email}
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
                {errors.emailError && (
                  <p className="text-center py-2 text-danger">
                    {errors.emailError}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Contact Number*
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact_Number"
                  value={data.contact_Number}
                  onChange={(e) => handleChange(e)}
                />
                {errors.phoneError && (
                  <p className="text-center py-2 text-danger">
                    {errors.phoneError}
                  </p>
                )}
              </div>

              {/*<div className="mb-3">
                <label htmlFor="title" className="form-label">
                  URL*
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon3">
                    {data.WebsiteURL}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="short_url"
                    aria-describedby="basic-addon3"
                    disabled
                    value={data.short_url}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                </div>*/}

              {/* <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Franchisee Banner (optional)
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) => handleChange(e)}
                                />
                                <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
                            </div>
                            <div className="mb-3" style={{ height: '200px', maxWdth: '100%' }}>
                                <img
                                    src={data.imageURL}
                                    alt="Uploaded Image will be shown here"
                                    style={{ maxHeight: '200px', maxWidth: '100%' }}
                                />
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
