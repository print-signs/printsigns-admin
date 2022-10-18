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
import { cilPencil, cilSettings, cilLockLocked, cilUser, cilNoteAdd } from '@coreui/icons'
const AddFaqs = () => {
    const token = isAutheticated();
    let history = useHistory();
    // const [image, setImage] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        if (!(topic && description)) {
            return swal('Error!', 'All fields are required', 'error')

        }
        const myForm = new FormData();

        myForm.set("topic", topic);
        myForm.set("description", description);
        // myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        try {
            let res = await axios.post(
                `/api/faqs/create/`, myForm,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data)
            if (res.data) {
                swal("success!", "FAQs Added Successfully!", "success");
                setLoading(false);
                history.goBack();
            }
        } catch (error) {
            swal('Error!', error, 'error')

            setLoading(false);
        }



    };
    // const handleImage = (e) => {
    //     const files = e.target.files[0];
    //     // console.log(files)
    //     setImage(files);

    // };
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
                                        <h3 className="mb-4 justify-content-center">Add FAQs</h3>
                                        <div>
                                            <div>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilPencil} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        maxlength='50'
                                                        required
                                                        onChange={(e) => setTopic(e.target.value)}
                                                        value={topic}
                                                        placeholder="Topic ( maximum 50 character )" />
                                                </CInputGroup>
                                                {topic ? <><span className="charLeft mb-3 fst-italic">
                                                    {50 - topic.length} characters left
                                                </span></> : <></>

                                                }

                                                <CInputGroup className="mb-3">

                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Description*</label>
                                                    <textarea
                                                        className="h-50 w-100"
                                                        maxlength='500'
                                                        required
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={description}
                                                        rows="5"
                                                        placeholder="Description ( maximum 500 character )">ewf3g</textarea>
                                                </CInputGroup>
                                                {description ? <><span className="charLeft fst-italic mb-3">
                                                    {500 - description.length} characters left
                                                </span></> : <></>

                                                }
                                                {/* <CInputGroup className="mb-3">

                                                    

                                                    <CFormInput
                                                        type="file"
                                                        placeholder="image"
                                                        accept="image/*"
                                                        required
                                                        onChange={handleImage}


                                                    />
                                                </CInputGroup> */}
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

export default AddFaqs