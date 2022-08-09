
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
// import { API } from "../../data";
import { isAutheticated } from "../../auth";
import { useParams } from "react-router-dom";
const View_Bisuness = () => {
    const { id } = useParams();
    // console.log(id)
    const [bisuness, setBisuness] = useState([])


    // const { products, page, limit, totalProducts, pages } = state;


    const token = isAutheticated();

    const view_business = useCallback(async () => {
        let res = await axios.get(
            `/api/directory/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(res.data.directory)
        setBisuness(res.data.directory)
        // changeState({
        //     ...res.data,
        //     pages: Math.ceil(res.data.totalProducts / limit),
        // });
        // limit, page, 
    }, [token]);

    useEffect(() => {
        view_business();
    }, [view_business]);


    return (
        <>
            <div className=" main-content">
                <div className="  my-3 page-content">
                    <div className="container-fluid">
                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-3">View Bisuness</h4>
                                    {/* <Link to="/add_bisuness"><button type="button" className="btn btn-info float-end mb-3 ml-4"> View Bisuness</button></Link> */}

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


                                                    <tr><th>Name</th><td>{bisuness?.name} </td></tr>
                                                    <tr><th>Bisuness image</th><td>
                                                        <img src={`${bisuness.image?.url}`} width="50" alt="" />
                                                    </td></tr>
                                                    <tr><th>Category</th><td>{bisuness?.category}</td></tr>
                                                    <tr><th>email</th> <td>{bisuness?.email}</td></tr>
                                                    <tr><th>phone</th> <td>{bisuness?.phone}</td></tr>
                                                    <tr><th>Building_Name</th><td>{bisuness?.Building_Name}</td></tr>
                                                    <tr><th>Street_Name</th><td>{bisuness?.Street_Name}</td></tr>
                                                    <tr><th>city</th> <td>{bisuness?.city}</td></tr>
                                                    <tr><th>description</th> <td>{bisuness?.description}</td></tr>
                                                    <tr><th>Status</th><td>
                                                        <span
                                                            className={`badge rounded-pill bg-${bisuness?.status ? "success" : "danger"
                                                                } font-size-10`}
                                                        >
                                                            {bisuness?.status ? "Live" : "Suspended"}
                                                        </span>
                                                    </td></tr>
                                                    <tr><th>Google Location</th><td>{bisuness?.Glocation}</td></tr>
                                                    <tr><th>LinkedinUrl</th>                                                        <td>{bisuness?.LinkedinUrl}</td></tr>
                                                    <tr> <th>FacebookUrl</th><td>{bisuness?.FacebookUrl}</td></tr>
                                                    <tr><th>intagramUrl</th> <td>{bisuness?.InstagramUrl}</td></tr>


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
        </>
    )
}

export default View_Bisuness