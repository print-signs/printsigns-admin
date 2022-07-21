import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { API } from "../../data";
import { isAutheticated } from "../../auth";

const RegisterUser = ({ item, handleDelete, formatAMPM }) => {
    const [totalRegisterUser, setTotalRegisterUser] = useState([])
    const token = isAutheticated();
    const getRegisterUser = useCallback(async () => {
        let res = await axios.get(
            `/api/event/admin/registerUser/getAll/${item._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data)
        setTotalRegisterUser(res.data.totalUserRegister)


    }, [token]);

    useEffect(() => {
        getRegisterUser();
    }, [getRegisterUser, item]);
    return (
        <>
            <tr>
                <td>{item?.title}</td>
                <td>
                    <img src={`${item?.image.url}`} width="50" alt="" /></td>
                <td>{new Date(`${item?.date}`).toDateString()}</td>
                <td>{item?.time}</td>
                <td>{item?.location}</td>
                <td>
                    {/* {item?.addedOn} */}
                    {new Date(`${item?.addedOn}`).toDateString()}<span> , {`${formatAMPM(item?.addedOn)}`}</span>

                </td>
                <td>
                    <Link to={`/event/registerUsers/view/${item._id}`}>

                        <button
                            type="button"
                            className=" mx-1 mt-1 btn btn-warning btn-sm  waves-effect waves-light btn-table ml-2"
                        >
                            {totalRegisterUser}
                        </button>

                    </Link>
                </td>


                <td>

                    <Link to={`/event/view/${item._id}`}>

                        <button
                            type="button"
                            className=" mx-1 mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                        >
                            View
                        </button>

                    </Link>
                    <Link to={`/event/edit/${item._id}`}>

                        <button
                            type="button"
                            className=" mx-1 mt-1 btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                        >
                            Edit
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={() => handleDelete(`${item._id}`)}
                        className="mx-1 mt-1 btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                        id="sa-params"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default RegisterUser