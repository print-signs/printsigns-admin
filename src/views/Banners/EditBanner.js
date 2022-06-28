

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { useParams } from "react-router-dom";

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilNotes, cilCalendar } from '@coreui/icons'
const EditBanner = () => {
    const { id } = useParams();
    const { token } = isAutheticated();
    let history = useHistory();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [section, setSection] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const [loading, setLoading] = useState(false);
    //fetch one Offer
    useEffect(async () => {
        const res = await axios.get(`/api/banner/getOne/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });
        // console.log(res.data.banner)
        // console.log(res.data.banner.startDate)
        setTitle(res.data.banner.title)
        setSubTitle(res.data.banner.subTitle)
        setSection(res.data.banner.section)
        setStartDate(new Date(res.data.banner.startDate).toLocaleDateString())
        setEndDate(new Date(res.data.banner.endDate).toLocaleDateString())

    }, [id]);

    const handleSubmit = async () => {
        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("subTitle", subTitle);
        myForm.set("section", section);
        myForm.set("startDate", startDate);
        myForm.set("endDate", endDate);
        myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        let res = await axios.put(
            `/api/banner/update/${id}`, myForm,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        if (res.data) {
            swal("success!", "Banner Updated Successfully!", "success");
            history.goBack();
        }

        setLoading(false);
    };
    const handleImage = (e) => {
        const files = e.target.files[0];
        // console.log(files)
        setImage(files);

    };
    // 
    const onCancel = () => {
        // window.location = "/comproducts";
        history.goBack()

    };

    return (
        <>
            <div className="bg-light min-vh-70 d-flex flex-row ">
                <CContainer>
                    <CRow className="align-left w-140">
                        <CCol md={19} lg={27} xl={16}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h3 className="mb-4 justify-content-center">Edit Banner</h3>
                                        <div>
                                            <div>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilPencil} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        value={title}
                                                        placeholder="Title" />
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilPencil} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setSubTitle(e.target.value)}
                                                        value={subTitle}
                                                        placeholder="sub title" />
                                                </CInputGroup>

                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilNotes} />

                                                    </CInputGroupText>

                                                    <select
                                                        name="section"
                                                        value={section}
                                                        onChange={(e) => setSection(e.target.value)}
                                                        className="form-control  input-field"
                                                    >

                                                        <option value="1">--select--</option>
                                                        <option value="home">home</option>
                                                        <option value="news">news</option>
                                                        <option value="events">events</option>
                                                        <option value="offers">offers</option>
                                                        <option value="category">category</option>
                                                        <option value="directory">directory</option>
                                                        {/* <option value="6">--select--</option> */}

                                                    </select>
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        Start Date*
                                                        <CIcon icon={cilCalendar} />
                                                    </CInputGroupText>
                                                    {/* <DatePicker selected={startDate} /> */}

                                                    <CFormInput type="date"
                                                        required
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        value={startDate}
                                                        placeholder="Start Date" />
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">

                                                    <CInputGroupText>
                                                        End Date*
                                                        <CIcon icon={cilCalendar} />
                                                    </CInputGroupText>
                                                    <CFormInput type="date"
                                                        startDate
                                                        required
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        value={endDate}
                                                        placeholder="EndDate" />
                                                </CInputGroup>
                                                {/* <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilLocationPin} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        value={location}
                                                        placeholder="Location" />
                                                </CInputGroup> */}

                                                <CInputGroup className="mb-3">

                                                    {/* <CIcon icon={cilLockLocked} /> */}

                                                    <CFormInput
                                                        type="file"
                                                        placeholder="image"
                                                        accept="image/*"
                                                        required
                                                        onChange={handleImage}


                                                    />
                                                </CInputGroup>
                                            </div>

                                            <div className=" d-flex">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    className="btn btn-success btn-login waves-effect waves-light"
                                                >
                                                    <ClipLoader loading={loading} size={18} />
                                                    {!loading && "Save"}
                                                </button>
                                                <button
                                                    onClick={onCancel}
                                                    type="button"
                                                    className=" ml-2 btn btn-warning btn-cancel waves-effect waves-light"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>

        </>
    )
}

export default EditBanner