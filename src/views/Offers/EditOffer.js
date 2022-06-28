
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../data";
import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { Link, useParams } from "react-router-dom";
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
import { cilPencil, cilSettings, cilLockLocked, cilUser, cilBell, cilLocationPin, cilAudioDescription } from '@coreui/icons'
const EditOffer = () => {
    const { id } = useParams();
    const token = isAutheticated();
    // console.log(token)
    let history = useHistory();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [bisunessName, setBisunessName] = useState([]);
    const [sendBisunessName, setSendBisunessName] = useState('');

    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(false);


    //fetch one Offer
    useEffect(async () => {
        const res = await axios.get(`/api/offer/getOne/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res.data)
        setTitle(res.data.offer.title)
        setDescription(res.data.offer.description)
        setLocation(res.data.offer.location)
        setSendBisunessName(res.data.offer.bisunessName)

    }, [id]);
    const fetchBusuness = useCallback(async () => {
        const res = await axios.get(`/api/directory/getAll`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });

        // console.log(res.data.directory);
        setBisunessName(res.data.directory)

    }, [token]);

    useEffect(async () => {
        fetchBusuness();

    }, [fetchBusuness]);



    const handleSubmit = async () => {
        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("description", description);
        myForm.set("bisunessName", sendBisunessName);
        myForm.set("location", location);
        myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        let res = await axios.put(
            `/api/offer/update/${id}`, myForm,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        if (res.data) {
            swal("success!", "Event Added Successfully!", "success");
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
    // console.log(bisunessName)
    return (
        <>
            <div className="bg-light min-vh-70 d-flex flex-row ">
                <CContainer>
                    <CRow className="align-left w-140">
                        <CCol md={19} lg={27} xl={16}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h3 className="mb-4 justify-content-center">Edit Offer</h3>
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
                                                        <CIcon icon={cilAudioDescription} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={description}
                                                        placeholder="Description" />
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilBell} />
                                                    </CInputGroupText>

                                                    <select
                                                        name="bisunessName"
                                                        value={sendBisunessName}
                                                        // onChange={handleChange}
                                                        // //onChange={(e) => setBisunessName(e.target.value)}
                                                        onChange={(e) => setSendBisunessName(e.target.value)}
                                                        className="form-control  input-field"
                                                    >

                                                        <option value="1">--select--</option>
                                                        {bisunessName.map(item =>
                                                            <option>{item?.name}</option>

                                                        )}
                                                    </select>
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilLocationPin} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        required
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        value={location}
                                                        placeholder="Location" />
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

export default EditOffer