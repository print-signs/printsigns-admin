
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import swal from 'sweetalert';
// import { API } from "../../data";
import { Link, useParams } from "react-router-dom";
import { isAutheticated } from "../../auth";

function ViewNews() {
    const [news, setNews] = useState([])
    const { id } = useParams();
    console.log(id)
    const { token } = isAutheticated();

    const getNews = useCallback(async () => {
        let res = await axios.get(
            `/api/news/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data.news)
        setNews(res.data.news)


    }, [token]);

    useEffect(() => {
        getNews();
    }, [getNews]);





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
                                <h4 className="mb-3">CMP-News</h4>
                                <Link to="/addNews"><button type="button" className="btn btn-info float-end mb-3 ml-4"> + Add News</button></Link>
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
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Title</th>

                                                    <th>Image</th>
                                                    <th>Description</th>
                                                    <th>Added On</th>
                                                    <th>Updated At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {news &&
                                                    <tr>
                                                        <td>{news?._id}</td>
                                                        <td>{news?.title}</td>
                                                        <td>
                                                            <img src={`${news.image?.url}`} width="50" alt="" />
                                                        </td>

                                                        <td>{news?.description}</td>
                                                        <td>
                                                            {new Date(`${news?.addedOn}`).toDateString()}<span> , {`${formatAMPM(news?.addedOn)}`}</span>
                                                        </td>
                                                        <td>
                                                            {new Date(`${news?.updatedAt}`).toDateString()}<span> , {`${formatAMPM(news?.updatedAt)}`}</span>
                                                        </td>


                                                    </tr>
                                                }
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

export default ViewNews;
