import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { isAutheticated } from "src/auth";

const SelectBusiness = (props) => {
  const token = isAutheticated();
  const navigate = useNavigate();
  console.log(props.handleView);

  const { data, setData } = props.data;
  const { loading, setLoading } = props.loading;
  // const categories = props?.categories || []

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const [loading, setLoading] = useState(false)

  const [BusinessData, setBusinessData] = useState([]);
  const getCategories = () => {
    axios
      .get(`/api/business`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBusinessData(res.data.data);
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

  const handleSubmit = () => {};

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
              Select User Type
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Link to="/users">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "capitalize",
                    marginRight: "5px",
                  }}
                >
                  Back
                </Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                  // marginRight: '5px',
                }}
                onClick={() => props.handleView(3)}
                // disabled={loading}
                // disabled={data.business === ''}
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
                  Provider *
                </label>
                <select
                  onChange={(e) => handleChange(e)}
                  value={data.business}
                  className="form-control"
                  id="business"
                  disabled={BusinessData.length < 1}
                >
                  <option value="1">---select---</option>
                  {BusinessData.length > 0 &&
                    BusinessData.map((item, index) => (
                      <option key={index} value={item?.business}>
                        {item?.business}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBusiness;
