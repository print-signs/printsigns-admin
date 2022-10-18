import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
//import Footer from "../../Footer";
import { Link, useParams } from "react-router-dom";
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
import { cilLockLocked, cilUser } from '@coreui/icons'
const AddProduct = () => {
    const token = isAutheticated();
    let history = useHistory();
    const { id } = useParams();
    // console.log(id)
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        const res = await axios.get(`/api/category/getOne/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        setName(res.data.category.name)
    }, [id]);


    const handleSubmit = async () => {
        if (!(name && image)) {
            return swal('Error!', 'All fields are required', 'error')

        }
        const myForm = new FormData();

        myForm.set("name", name);


        myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        try {
            let res = await axios.put(
                `/api/category/update/${id}`, myForm,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        // Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log(res.data.data.name)
            if (res.data) {
                swal("success!", "Category Edited Successfully!", "success");
                setLoading(false);
                history.goBack();
            }
        } catch (error) {
            swal('Error!', "something went wrong", 'error')

            setLoading(false);
        }
    }
    const handleImage = (e) => {
        const files = e.target.files[0];
        // console.log(files)
        setImage(files);

    };
    // 
    const onCancel = () => {
        history.goBack()

    };

    return (
        <>
            <div className="bg-light w-100 min-vh-70 d-flex flex-row ">
                <CContainer className="w-100 ">
                    <CRow className="align-left w-140">
                        <CCol md={19} lg={27} xl={16}>
                            <CCard className="mr-4 mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h3 className="mb-4 justify-content-center">Edit {name} Category</h3>
                                        <div>
                                            <div>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilUser} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        placeholder="Name" />
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

export default AddProduct