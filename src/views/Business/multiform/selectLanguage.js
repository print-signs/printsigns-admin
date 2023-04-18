import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { isAutheticated } from "src/auth";

const selectLanguage = (props) => {
  const token = isAutheticated();
  const navigate = useNavigate();

  const { data, setData } = props.data;

  const { loading, setLoading } = props.loading;
  // const categories = props?.categories || []

  const handleChange = (e) => {
    if (data.language.length < 3) {
      setData((prev) => ({
        ...prev,
        language: [...data.language, e.target.value],
      }));
    } else {
      swal({
        title: "Warning",
        text: "please select Up to 3 languages!",
        icon: "warning",
        button: "ok",
        dangerMode: true,
      });
    }
  };

  // const [loading, setLoading] = useState(false)

  const [LanguagesData, setLanguagesData] = useState([]);

  const getCategories = () => {
    axios
      .get(`/api/language`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLanguagesData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div
            className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
          >
            <div style={{ fontSize: "22px" }} className="fw-bold">
              Select Language
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Button
                variant="contained"
                color="secondary"
                style={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                  marginRight: "5px",
                }}
                onClick={() => props.handleView(3)}
              >
                Prev
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                  //  marginRight: '5px',
                }}
                onClick={() => props.handleView(5)}
                // disabled={loading}
                // disabled={data.language.length < 0 && data.language.length > 3}
              >
                Next
                {/* {loading ? 'Loading' : 'Next'} */}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  please select Up to 3 languages
                </label>
                {LanguagesData.length > 0 &&
                  LanguagesData.map((item, index) => (
                    // <option key={index} value={item?.language} >{item?.language}</option>
                    <div className="d-flex">
                      <input
                        className="me-2"
                        type="checkbox"
                        name={item?.language}
                        id={data.language}
                        value={item?.language}
                        onChange={(e) => handleChange(e)}
                      />
                      {/* {checked = { data.language.map(item => item === item?.language) }} */}
                      <label htmlFor="title" className="form-label">
                        {item?.language}
                      </label>
                    </div>
                  ))}
                {/* <select
                                    onChange={(e) => handleChange(e)}
                                    value={data.language}
                                    className="form-control"
                                    id="language"
                                    disabled={LanguagesData.length < 1}
                                >
                                    <option value="1">---select---</option>
                                    {LanguagesData.length > 0 && LanguagesData.map((item, index) =>
                                        <option key={index} value={item?.language} >{item?.language}</option>

                                    )}
                                </select> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default selectLanguage;
