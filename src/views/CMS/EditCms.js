import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

import { isAutheticated } from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import swal from 'sweetalert';
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
const EditCms = () => {
    const { id } = useParams()
    const token = isAutheticated();
    // console.log(token, id)
    let history = useHistory();
    const [state, setState] = useState({
        About_Us: "",
        Terms_and_Conditions: "",
        Privacy_Policy: "",

        loading: false,

    });
    const { loading } = state;
    const changeState = (newState) =>
        setState((prevState) => ({ ...prevState, ...newState }));


    const handleChange = (e) => {
        changeState({ ...state, [e.target.name]: e.target.value })

    }
    const fetchRestriction = useCallback(async () => {
        const res = await axios.get(`/api/restriction/getOne/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log(res.data.CmpRes)
        setState(res.data.CmpRestriction)
        changeState({ loading: false });
        if (res.status === 200) changeState({ ...res.data });
    }, [token]);

    useEffect(() => {
        fetchRestriction();
    }, [fetchRestriction]);


    const handleSubmit = async () => {
        changeState({ loading: true });
        try {
            let res = await axios.put(
                `/api/restriction/update/${id}`,
                {
                    ...state,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //if (res.status === 200) window.location.reload();
            // console.log(res.data)
            // console.log(res.status == 200)
            if (res.data.success == true) {
                changeState({ loading: false });
                swal("Edit CMP-Condition successfully!");
                history.goBack()
            }
        } catch (error) {
            swal('Error!', error, 'error')

            changeState({ loading: false });
        }

    };
    const onCancel = () => {
        // window.location = "/comproducts";
        history.goBack()

    };

    return (
        <>
            <div className="shadow-sm w-75 p-3 mb-5 bg-body rounded form-floating justify-content-center">
                <form>
                    <h4>EDIT-CMS</h4>

                    <div className="mb-3 ">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">About Us*</label>
                        <textarea
                            className="form-control" id="exampleFormControlTextarea1" name="About_Us"
                            value={state.About_Us}
                            required
                            onChange={handleChange}
                            rows="3">

                        </textarea>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Terms and Conditions*</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name="Terms_and_Conditions"
                            value={state.Terms_and_Conditions}
                            required
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Privacy Policy*</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name="Privacy_Policy"
                            value={state.Privacy_Policy}
                            required
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                    <div>
                        <button type="button" className=" mt-1 btn btn-success" onClick={handleSubmit}>
                            <ClipLoader loading={state.loading} size={18} />
                            {!loading && "Save"}
                        </button>
                        <button type="button" className="mt-1 mx-2 btn btn-warning" onClick={onCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default EditCms