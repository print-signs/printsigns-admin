
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

function ViewOffer() {
    const [offer, setOffer] = useState([])
    const { id } = useParams();
    console.log(id)
    const token = isAutheticated();

    const getOffer = useCallback(async () => {
        let res = await axios.get(
            `/api/offer/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setOffer(res.data.offer)


    }, [token]);

    useEffect(() => {
        getOffer();
    }, [getOffer]);





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
        <div className=" main-content">
            <div className="  my-3 page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-3">CMP-Offers</h4>
                                <Link to="/addOffer"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add New Offer</button></Link>
                                {/* <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">CMD-App</Link>
                    </li>
                    <li className="breadcrumb-item">CMD-Category</li>
                  </ol>
                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row ml-0 mr-0  mb-10">

                                    </div>
                                    <div className="table-responsive table-shoot">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">

                                                <tr> <th>Id</th>
                                                    <td>{offer?._id}</td>
                                                </tr>
                                                <tr><th>Title</th>
                                                    <td>{offer?.title}</td>
                                                </tr>

                                                <tr><th>Image</th>
                                                    <td>
                                                        <img src={`${offer.image?.url}`} width="50" alt="" />
                                                    </td>
                                                </tr>
                                                <tr><th>Bisuness Name</th>
                                                    <td> {offer?.bisunessName}</td>
                                                </tr>
                                                <tr><th>Description</th>
                                                    <td>{offer?.description}</td>
                                                </tr>
                                                <tr><th>Location</th>
                                                    <td>{offer?.location}</td>
                                                </tr>
                                                <tr><th>Added On</th>
                                                    <td>
                                                        {new Date(`${offer?.addedOn}`).toDateString()}<span> , {`${formatAMPM(offer?.addedOn)}`}</span>
                                                    </td>
                                                </tr>
                                                <tr><th>Updated At</th>
                                                    <td>
                                                        {new Date(`${offer?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(offer?.updatedAt)}`}</span>
                                                    </td>
                                                </tr>

                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>


                                    {/* <!-- end table-responsive --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- container-fluid --> */}
            </div>
        </div>
    );
}

export default ViewOffer;
