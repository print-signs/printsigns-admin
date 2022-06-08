
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


    const { token } = isAutheticated();

    const view_business = useCallback(async () => {
        let res = await axios.get(
            `/api/directory/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data.directory.name)
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
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>email</th>
                                                        <th>phone</th>
                                                        <th>Building_Name</th>
                                                        <th>Street_Name</th>
                                                        <th>city</th>
                                                        <th>description</th>
                                                        <th>Status</th>
                                                        <th>Google Location</th>
                                                        <th>LinkedinUrl</th>
                                                        <th>FacebookUrl</th>
                                                        <th>intagramUrl</th>

                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    <tr>
                                                        <td>{bisuness?.name} </td>
                                                        <td>{bisuness?.category}</td>
                                                        <td>{bisuness?.email}</td>
                                                        <td>{bisuness?.phone}</td>
                                                        <td>{bisuness?.Building_Name}</td>
                                                        <td>{bisuness?.Street_Name}</td>
                                                        <td>{bisuness?.city}</td>
                                                        <td>{bisuness?.description}</td>

                                                        <td>
                                                            <span
                                                                className={`badge rounded-pill bg-${bisuness?.status ? "success" : "danger"
                                                                    } font-size-10`}
                                                            >
                                                                {bisuness?.status ? "Live" : "Suspended"}
                                                            </span>
                                                        </td>
                                                        <td>{bisuness?.Glocation}</td>
                                                        <td>{bisuness?.LinkedinUrl}</td>
                                                        <td>{bisuness?.FacebookUrl}</td>
                                                        <td>{bisuness?.InstagramUrl}</td>
                                                        <td>

                                                        </td>
                                                    </tr>


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