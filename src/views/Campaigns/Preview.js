import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { isAutheticated } from "src/auth";

const Preview = ({ props }) => {
  const token = isAutheticated();
  const { data, handleView, setData } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    // const campaignData = {
    //   campaignType: data.campaignType,
    //   campaignName: data.campaignName,
    //   language: data.language,
    //   videoTemplate: data.video,
    //   recipients: data.recipients,
    // };

    const formattedRecipients = data.recipients.map((recipient) => ({
      name: recipient.name,
      contact: recipient.contact.email || recipient.contact.phoneNumber,
    }));
    // console.log(data.campaignType);

    const formData = new FormData();
    formData.append("campaignType", data.campaignType);
    formData.append("campaignName", data.campaignName);
    formData.append("language", data.language);
    formData.append("videoTemplate", data.video);
    // formData.set("recipients",JSON.stringify(formattedRecipients));
    // console.log("campaignData", campaignData);
    // console.log("formData", formData);

    axios
      .post(`/api/campaign/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        // console.log(res);
        swal({
          title: "Added",
          text: res?.data?.message
            ? res?.data?.message
            : "Campaign added successfully!",
          icon: "success",
          button: "Return",
        });
        setLoading(false);
        // handleView(5);
      })
      .catch((err) => {
        setLoading(false);
        const message = err.response?.data?.message || "Something went wrong!";
        // console.log(message);
        swal({
          title: "Warning",
          text: message,
          icon: "error",
          button: "Retry",
          dangerMode: true,
        });
      });
  };

  // console.log(data);
  return (
    <React.Fragment>
      <div className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
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
                handleView(5);
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
                <th scope="col">Video</th>
                <td>
                  <video
                    className="rounded"
                    autoPlay={true}
                    height={300}
                    width={250}
                    src={data?.video ? URL.createObjectURL(data?.video) : null}
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
      <div className="page-title-right d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          style={{
            fontWeight: "bold",
            marginBottom: "1rem",
            textTransform: "capitalize",
          }}
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Add Now"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Preview;
