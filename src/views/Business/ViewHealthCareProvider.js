import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { isAutheticated } from "src/auth";

const ViewHealthCareProvider = () => {
  const [HealthCareData, setHealthCareData] = useState();
  const token = isAutheticated();

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getHealthCareProvider = () => {
    setLoading(true);
    axios
      .get(`/api/businesses/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(async (res) => {
        console.log(res.data);
        setHealthCareData(res.data.businesses);
        setLoading(false);
      })
      .catch((err) => {
        swal("Error", "Could not get data", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    getHealthCareProvider();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
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
            HealthCare Provider Details
          </div>

          <div className="page-title-right">
            <Button
              variant="contained"
              color="primary"
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                textTransform: "capitalize",
              }}
              onClick={() => {
                navigate("/healthcare/providers", { replace: true });
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {!loading && !HealthCareData && <div>No data found</div>}
      {!loading && HealthCareData && (
        <div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="col">HealthCare Provider ID</th>
                <td>{HealthCareData?._id}</td>
              </tr>
              <tr>
                <th scope="col">Provider Type</th>
                <td>{HealthCareData?.business}</td>
              </tr>

              {HealthCareData?.business_name ? (
                <tr>
                  {" "}
                  <th scope="col">HealthCare Name</th>
                  <td>{HealthCareData?.business_name}</td>
                </tr>
              ) : (
                <tr>
                  <th scope="col">Specialization</th>
                  <td>{HealthCareData?.specialization}</td>
                </tr>
              )}

              <tr>
                <th scope="col">Contact Person Name</th>
                <td>{HealthCareData?.contact_Person_Name}</td>
              </tr>
              <tr>
                <th scope="col"> Phone</th>
                <td>{HealthCareData?.contact_Number}</td>
              </tr>
              <tr>
                <th scope="col">Email</th>
                <td>{HealthCareData?.email}</td>
              </tr>
              <tr>
                <th scope="col">Url</th>
                <td>
                  {HealthCareData?.url ? (
                    HealthCareData?.url
                  ) : (
                    <span className="text-danger">Not Set</span>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="col">Address</th>
                <td>
                  {HealthCareData?.address_Line_1} <br />
                  {HealthCareData?.address_Line_2}
                  <br />
                  {HealthCareData?.city}, {HealthCareData?.state} <br />
                  {HealthCareData?.country} <br />
                  {HealthCareData?.pincode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewHealthCareProvider;
