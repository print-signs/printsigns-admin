

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, useParams } from "react-router-dom";
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
import { cilPencil, cilSettings, cilLockLocked, cilUser, cilBell, cilLocationPin, cilAudioDescription, cilObjectGroup } from '@coreui/icons'
const EditRequirement = () => {
    const token = isAutheticated();
    const { id } = useParams()
    let history = useHistory();
    const [areaOfInterest, setAreaOfInterest] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [imagesPreview, setImagesPreview] = useState([]);
    const [allimage, setAllImage] = useState([]);
    const [loading, setLoading] = useState(false);

    //fetch one requirement
    useEffect(async () => {
        const res = await axios.get(`/api/requirement/getOne/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res.data)
        setTitle(res.data.Requirement.title)
        setDescription(res.data.Requirement.description)
        setAreaOfInterest(res.data.Requirement.areaOfInterest)


    }, [id]);


    const handleImage = (e) => {

        setAllImage([...allimage, ...e.target.files]);

        // only for file preview------------------------------------
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);

                }
            };

            reader.readAsDataURL(file)
        });
        // -----------------------------------------------------------------------------
    };


    const handleSubmit = async () => {
        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("description", description);
        myForm.set("areaOfInterest", areaOfInterest);
        allimage.forEach((Singleimage) => {
            myForm.append("image", Singleimage);

        });
        if (!(title && description && areaOfInterest && allimage[0])) {
            alert("please fill all fields")
            return
        }
        setLoading(true);
        try {
            let res = await axios.put(
                `/api/requirement/update/${id}`, myForm,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success === true) {
                swal("success!", "Requirements Updated Successfully!", "success");
                history.goBack();
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            alert(error)

        }

    };

    const onCancel = () => {
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
                                        <h3 className="fst-italic mb-4 justify-content-center ">Edit Requirements</h3>
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
                                                        <CIcon icon={cilObjectGroup} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setAreaOfInterest(e.target.value)}
                                                        value={areaOfInterest}
                                                        placeholder="Area Of Interest" />
                                                </CInputGroup>

                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilAudioDescription} />
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
                                                        required
                                                        placeholder="image"
                                                        accept="image/*"
                                                        name="image"

                                                        multiple
                                                        onChange={handleImage}


                                                    />
                                                </CInputGroup>
                                                <div><strong className="fs-6 fst-italic">*Please Upload maximum four images</strong></div>

                                                <div id="createProductFormImage" className="w-25 d-flex">
                                                    {imagesPreview.map((image, index) => (
                                                        <img className=" w-50 p-1 " key={index} src={image} alt="Product Preview" />
                                                    ))}
                                                </div>
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

export default EditRequirement