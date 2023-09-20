import React, { useState, useEffect } from "react";
// import { Button } from '@mui/material'
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
// import SelectPurpose from "../Business/multiform/SelectPurpose.js";
// import SelectBusiness from "../Business/multiform/SelectBusiness.js";
// import Contacts from "../Business/multiform/Contacts.js";
// import BAddress from "../Business/multiform/BAddress.js";
import Button from "@material-ui/core/Button";

import { isAutheticated } from "src/auth";
// import DoctorInfo from "../Business/multiform/DoctorInfo.js";
import BasicDetaiils from "./BasicDetaiils.js";
import ContactDetails from "./ContactDetails.js";
import Preview from "./Preview.js";

const AddCampaign = () => {
  const token = isAutheticated();
  const [productId, setProductId] = useState("");
  const [viewState, setViewState] = useState(1);
  // const [WebsiteURL, setWebsiteURL] = useState('https://bolo.ai.in/')

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    WebsiteURL: "https://bolo.ai.in/",
    campaignName: "",
    language: "",
    campaignType: "",
    video: null,
    recipients: [{ name: "", phoneNumber: "" }],
  });

  // console.log(data)

  const handleView = (n) => {
    if (viewState === n) return;
    setViewState(n);
  };
  //   const handleSubmit = () => {

  //     if (
  //       data.address_Line_1.trim() === "" ||
  //       data.address_Line_2.trim() === "" ||
  //       data.userType === "" ||
  //       data.language === "" ||
  //       data.country === "" ||
  //       data.state === "" ||
  //       data.city === "" ||
  //       data.pincode.trim() === "" ||
  //       //Contacts
  //       // data.image === '' ||
  //       // data.imageURL.trim() === '' ||
  //       (data.userName.trim() === ""
  //       // &&
  //       //   (data.contact_Person_Name.trim() === "" ||
  //       //     data.specialization === "")
  //       ) ||
  //       data.email.trim() === "" ||
  //       // data.short_url.trim() === "" ||
  //       data.contact_Number === ""
  //       // || data.contact_Person_Name.trim() === ""
  //     ) {
  //       swal({
  //         title: "Warning",
  //         text: "Fill all mandatory fields",
  //         icon: "error",
  //         button: "Close",
  //         dangerMode: true,
  //       });
  //       return;
  //     }
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.set("address_Line_1", data.address_Line_1);
  //     formData.set("address_Line_2", data.address_Line_2);

  //     formData.set("purpose", data.purpose);
  //     formData.set("userType", data.userType);
  //     // formData.set("language", data.language);

  //     formData.set("country", data.country);
  //     formData.set("city", data.city);
  //     formData.set("state", data.state);

  //     formData.set("pincode", data.pincode);
  //     //contacts
  //     formData.set("userName", data.userName);
  //     formData.set("email", data.email);

  //     formData.set("contact_Number", data.contact_Number);
  //     formData.set("contact_Person_Name", data.contact_Person_Name);

  //     formData.set("specialization", data.specialization);

  //     formData.set("url", data.WebsiteURL);
  //     formData.set("short_url", data.short_url);

  //     axios
  //       .post(`/api/businesses/add`, formData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/formdata",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       })
  //       .then((res) => {
  //         swal({
  //           title: "Added",
  //           text: res?.data?.message
  //             ? res?.data?.message
  //             : "Business added successfully!",
  //           icon: "success",
  //           button: "Return",
  //         });
  //         setLoading(false);
  //         navigate("/users", { replace: true });
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         const message = err.response?.data?.message || "Something went wrong!";
  //         swal({
  //           title: "Warning",
  //           text: message,
  //           icon: "error",
  //           button: "Retry",
  //           dangerMode: true,
  //         });
  //       });
  //   };

  console.log(data);

  return (
    <CContainer>
      <CRow className="mt-3">
        <CCol md={12}>
          <div
            className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
          >
            <div style={{ fontSize: "22px" }} className="fw-bold">
              Add Campaign
            </div>
            <div className="page-title-right">
              <div className="page-title-right">
                {/* <Button
                  variant="contained"
                  color="primary"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={
                    data.address_Line_1.trim() === "" ||
                    data.address_Line_2.trim() === "" ||
                    data.userType === "" ||
                    data.language === "" ||
                    data.country === "" ||
                    data.state === "" ||
                    data.city === "" ||
                    data.pincode.trim() === "" ||
                    data.userName.trim() === "" ||
                    //  &&
                    //   (data.contact_Person_Name.trim() === "" ||
                    //     data.specialization === "")
                    data.email.trim() === "" ||
                    // data.short_url.trim() === "" ||
                    data.contact_Number === ""
                    //  ||
                    // data.contact_Person_Name.trim() === ""
                  }
                >
                  {loading ? "Loading" : "Add Now"}
                </Button> */}
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={9} className="mt-1">
          <CCardGroup>
            <CCard className="p-4 mb-3">
              <CCardBody>
                {viewState === 1 && (
                  <BasicDetaiils
                    props={{ data, setData, handleView }}
                    setData={setData}
                    handleView={handleView}
                  />
                )}

                {viewState === 2 && (
                  <ContactDetails props={{ data, setData, handleView }} />
                )}

                {viewState === 3 && (
                  <Preview props={{ data, setData, handleView }} />
                )}
                {viewState === 4 && (
                  <BAddress
                    data={{ data, setData }}
                    handleView={handleView}
                    // productId={productId}
                    // data={{ images, setImages }}
                    loading={{ loading, setLoading }}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol md={3} className="mt-1">
          <CCardGroup>
            <CCard>
              <CCardBody>
                <div className="d-grid gap-2">
                  <button
                    className={
                      viewState === 1
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(1)}
                  >
                    Basic Details
                  </button>
                  {/*<button
                    className={
                      viewState === 2
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(2)}
                  >
                    Select Purpose
                  </button>*/}
                  <button
                    className={
                      viewState === 2
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(3)}
                  >
                    Contact Details
                  </button>
                  <button
                    className={
                      viewState === 3
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(5)}
                  >
                    Preview
                  </button>
                  <button
                    className={
                      viewState === 4
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(5)}
                  >
                    Videos
                  </button>
                  <button
                    className={
                      viewState === 5
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(5)}
                  >
                    Test & Launch
                  </button>
                  <button
                    className={
                      viewState === 6
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(5)}
                  >
                    Status
                  </button>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddCampaign;
