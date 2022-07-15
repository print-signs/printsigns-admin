import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { isAutheticated } from "../../auth";


const RequirementOpt = ({ item, handleApprove }) => {
    const [user, setUser] = useState()
    const [approve, setApprove] = useState(false)
    const token = isAutheticated();
    useEffect(async () => {
        let resp = await axios.get(
            `/api/v1/admin/user/${item.addedBy}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(resp.data)
        setUser(resp.data.user)

        ///approved
        const getData = async () => {
            try {
                const response = await axios.get(`/api/requirement/getOne/${item._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                // console.log(response.data)
                if (response.data.Requirement.approved === true) {
                    setApprove(true)
                } else {
                    setApprove(false)
                }
            } catch (e) {
                console.log(e)
                setApprove(false)
            }
        }
        getData()
    }, [item]);



    const handleDelete = async (id) => {
        let status = window.confirm("Do you want to delete");
        if (!status) return;

        let res = await axios.delete(`/api/requirement/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res)
        if (res.data.success == true) {
            swal("success!", "Requirement Deleted Successfully!", "success");
            window.location.reload();
        }
    };
    //change time formate
    function formatAMPM(date) {
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    return (
        <>
            <tr>
                <td>{item?.title}</td>
                <td>
                    <img src={`${item.image[0]?.url}`} width="50" alt="" />
                </td>
                <td>{item?.areaOfInterest}</td>
                <td>{user?.name}</td>
                <td>
                    {/* {item?.addedOn} */}
                    {new Date(`${item?.createdAt}`).toDateString()}<span> , {`${formatAMPM(item?.createdAt)}`}</span>

                </td>


                <td>
                    <button
                        disabled={approve}
                        type="button"
                        onClick={() => handleApprove(`${item._id}`)}
                        className={`mt-1 btn btn-${approve ? "success" : "warning"} btn-sm  waves-effect waves-light btn-table ml-2`}
                        id="sa-params"
                    >
                        {!approve ? "Approve" : "Approved"}
                    </button>
                    <Link to={`/requirement/view/${item._id}`}>

                        <button
                            type="button"
                            className=" mx-1 mt-1 btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                        >
                            View
                        </button>
                    </Link>
                    <Link to={`/requirement/edit/${item._id}`}>

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

export default RequirementOpt