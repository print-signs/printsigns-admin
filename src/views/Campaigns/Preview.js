import React from "react";
import Button from "@material-ui/core/Button";
const Preview = ({ props }) => {
  const { data, handleView, setData } = props;
  console.log(data);
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
            Campaign Details
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
              color="secondary"
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                textTransform: "capitalize",
              }}
              onClick={() => {
                handleView(4);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {data && (
        <div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="col">Campaign Name</th>
                <td>{data?.campaignName}</td>
              </tr>
              <tr>
                <th scope="col">Language</th>
                <td>{data?.language}</td>
              </tr>

              <tr>
                <th scope="col">Campaign Type</th>
                <td>{data?.campaignType}</td>
              </tr>
              <tr>
                <th scope="col"> Video</th>
                <td>
                  <video
                    className="rounded"
                    autoPlay={true}
                    height={300}
                    width={250}
                    src={data?.video}
                  ></video>
                </td>
              </tr>
              <tr>
                <th scope="col">Recipients</th>
                <td>{data?.recipients?.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Preview;
