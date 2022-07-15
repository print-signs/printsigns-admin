import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

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
import { cilPencil, cilSettings, cilLockLocked, cilUser } from '@coreui/icons'
const AddNews = () => {
    const { token } = isAutheticated();
    let history = useHistory();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        if (!(title && description && image)) {
            alert("Please fill All required field ");
            return;
        }
        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("description", description);
        myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        try {
            let res = await axios.post(
                `/api/news/create`, myForm,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data)
            if (res.data) {
                swal("success!", "News Added Successfully!", "success");
                setLoading(false);
                history.goBack();
            }
        } catch (error) {
            alert(error)
            setLoading(false);
        }



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
                                        <h3 className="mb-4 justify-content-center">Add News</h3>
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
                                                        <CIcon icon={cilSettings} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={description}
                                                        placeholder="Description" />
                                                </CInputGroup>

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

export default AddNews