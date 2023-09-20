import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import toast from "react-hot-toast";
const ContactDetails = ({ props }) => {
  const { data, setData, handleView } = props;
  // const [recipients, setRecipients] = useState([{ name: "", phoneNumber: "" }]);

  const addRecord = () => {
    setData((prevData) => ({
      ...prevData,
      recipients: [...prevData.recipients, { name: "", phoneNumber: "" }],
    }));
  };

  const deleteRecipient = (index) => {
    const updatedRecipients = [...data.recipients];
    updatedRecipients.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      recipients: updatedRecipients,
    }));
  };

  const recipientNameChange = (e, index) => {
    const updatedRecipients = [...data.recipients];
    updatedRecipients[index] = {
      ...updatedRecipients[index],
      name: e.target.value,
    };
    setData((prevData) => ({
      ...prevData,
      recipients: updatedRecipients,
    }));
  };

  const recipientNumberChange = (e, index) => {
    const updatedRecipients = [...data.recipients];
    updatedRecipients[index] = {
      ...updatedRecipients[index],
      phoneNumber: e.target.value,
    };
    setData((prevData) => ({
      ...prevData,
      recipients: updatedRecipients,
    }));
  };

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
              Contact Details
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
                onClick={() => handleView(1)}
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
                  if (
                    data?.recipients.every(
                      (recipient) =>
                        recipient.name !== "" && recipient.phoneNumber !== ""
                    )
                  ) {
                    handleView(3);
                  } else {
                    toast.error("Fill all contact details");
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              {data?.recipients.map((recipient, index) => {
                return (
                  <div className="mb-3 border p-3 rounded">
                    <label
                      htmlFor="title"
                      className="form-label d-flex justify-content-between"
                    >
                      <p>Name</p>

                      {index === 0 ? null : (
                        <button
                          onClick={() => {
                            deleteRecipient(index);
                          }}
                          className="btn btn-danger btn-smn rounded-5  fw-bold"
                        >
                          delete
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={`name-${index}`}
                      value={recipient?.name}
                      onChange={(e) => recipientNameChange(e, index)}
                      maxLength="50"
                    />

                    <label htmlFor="title" className="form-label mt-2">
                      {data?.campaignType === "rcs" ||
                      data?.campaignType === "whatsapp" ? (
                        <p>Phone Number</p>
                      ) : (
                        <p>Email</p>
                      )}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="recipients-phone-number"
                      maxLength="50"
                      name={`toPhoneNumber-${index}`}
                      value={recipient?.phoneNumber}
                      onChange={(e) => recipientNumberChange(e, index)}
                    />
                  </div>
                );
              })}
              <button
                onClick={() => {
                  addRecord();
                }}
                className="btn btn-secondary"
              >
                Add another record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
