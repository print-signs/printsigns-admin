
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
import { cilPencil, cilSettings, cilLockLocked, cilUser, cilBell, cilLocationPin, cilAudioDescription, cilCalendar, cilWatch, cilAlarm } from '@coreui/icons'
const AddEvent = () => {
    const token = isAutheticated();
    let history = useHistory();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');

    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!(title && description && image && location && time && date)) {
            alert("Please fill All required field ");
            return;
        }
        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("description", description);
        myForm.set("location", location);
        myForm.set("date", date)
        myForm.set("time", time)
        myForm.set("image", image);
        setLoading({ loading: true });
        // console.log(image)
        try {
            let res = await axios.post(
                `/api/event/create`, myForm,
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
                setLoading(false);
                history.goBack();
            }
        } catch (error) {
            alert("Something went Wrong")
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
                                        <h3 className="mb-4 justify-content-center">Add Event</h3>
                                        <div>
                                            <div>
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilPencil} />
                                                    </CInputGroupText>
                                                    <CFormInput maxlength="50" mtype="text"
                                                        required
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        value={title}
                                                        placeholder="Title (maximum 50 characters)" />

                                                </CInputGroup>
                                                {title ? <><span className="charLeft mt-4 fst-italic">
                                                    {50 - title.length} characters left
                                                </span></> : <></>

                                                }

                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilAudioDescription} />
                                                    </CInputGroupText>
                                                    <CFormInput type="text"
                                                        maxlength="250"
                                                        required
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={description}
                                                        placeholder="Description (maximum 250 characters)" />
                                                </CInputGroup>
                                                {description ? <><span className="charLeft mt-4 fst-italic">
                                                    {250 - description.length} characters left
                                                </span></> : <></>

                                                }
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupText>
                                                        {/* Date* */}
                                                        <CIcon icon={cilCalendar} />
                                                    </CInputGroupText>
                                                    {/* <DatePicker selected={startDate} /> */}

                                                    <CFormInput type="date"
                                                        required
                                                        onChange={(e) => setDate(e.target.value)}
                                                        value={date}
                                                        placeholder="Event Date" />
                                                </CInputGroup>
                                                <CInputGroup className="mb-3">

                                                    <CInputGroupText>
                                                        {/* Time* */}
                                                        <CIcon icon={cilAlarm} />
                                                    </CInputGroupText>
                                                    <CFormInput type="time"
                                                        startDate
                                                        required
                                                        onChange={(e) => setTime(e.target.value)}
                                                        value={time}
                                                        placeholder="Event Time" />
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

export default AddEvent