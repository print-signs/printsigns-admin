import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { CFormInput, CFormLabel, CCol, CRow } from "@coreui/react";

const ContactDetails = ({ props }) => {
  const { data, setData, handleView } = props;
  const [dataEntryMethod, setDataEntryMethod] = useState("manual");
  const [csvData, setCsvData] = useState([]);
  // const [recipients, setRecipients] = useState([{ name: "", phoneNumber: "" }]);
  // console.log("data", data);
  const addRecord = () => {
    setData((prevData) => ({
      ...prevData,
      recipients: [
        ...prevData.recipients,
        { name: "", phoneNumber: "", email: "" },
      ],
    }));
  };

  const handleSpreadSheet = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split("\n");
        const extractedData = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].split(",");
          if (row.length >= 2) {
            const name = row[0].trim();
            const email = row[1].trim();
            if (name && email) {
              extractedData.push({ name, email });
            }
          }
        }
        setCsvData(extractedData);
        // console.log(csvData);
        setData((prevData) => ({
          ...prevData,
          recipients: extractedData,
          spreadSheet: file.name,
        }));
      };
      reader.readAsText(file);
    }
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

  const recipientEmailChange = (e, index) => {
    const updatedRecipients = [...data.recipients];
    updatedRecipients[index] = {
      ...updatedRecipients[index],
      email: e.target.value,
    };
    setData((prevData) => ({
      ...prevData,
      recipients: updatedRecipients,
    }));
  };

  const handleSubmit = () => {
    if (
      data?.recipients.every(
        (recipient) =>
          recipient.name !== "" &&
          (data?.campaignType !== "email"
            ? recipient.phoneNumber !== ""
            : recipient.email !== "")
      )
    ) {
      handleView(3);
    } else {
      toast.error("Fill all contact details");
    }
  };

  return (
    <div className="container">
      <div>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <div>
                <label>
                  Data Entry Method:
                  <select
                    value={dataEntryMethod}
                    onChange={(e) => setDataEntryMethod(e.target.value)}
                  >
                    <option value="manual">Manually</option>
                    <option value="spreadsheet">Using Spreadsheet</option>
                  </select>
                </label>
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
                  onClick={handleSubmit}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {dataEntryMethod === "manual" && (
          <div className="row">
            <div className="col-md-12 my-1">
              <div className="card h-100">
                <div className="card-body px-5">
                  {data?.recipients.map((recipient, index) => {
                    return (
                      <div className="row mb-3 border p-3 rounded">
                        <div className="col-md-6 d-flex align-items-center">
                          <label htmlFor="title" className="form-label me-2">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={`name-${index}`}
                            value={recipient?.name}
                            onChange={(e) => recipientNameChange(e, index)}
                            maxLength="50"
                          />
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                          <label htmlFor="title" className="form-label me-2">
                            {data?.campaignType === "rcs" ||
                            data?.campaignType === "whatsapp"
                              ? "Phone Number"
                              : "Email"}
                          </label>
                          <input
                            type={
                              data?.campaignType === "rcs" ||
                              data?.campaignType === "whatsapp"
                                ? "number"
                                : "email"
                            }
                            className="form-control"
                            id={`recipients-phone-number-${index}`}
                            maxLength="50"
                            name={`toPhoneNumber-${index}`}
                            value={
                              data?.campaignType === "rcs" ||
                              data?.campaignType === "whatsapp"
                                ? recipient?.phoneNumber
                                : recipient?.email
                            }
                            onChange={(e) =>
                              data?.campaignType === "rcs" ||
                              data?.campaignType === "whatsapp"
                                ? recipientNumberChange(e, index)
                                : recipientEmailChange(e, index)
                            }
                          />
                        </div>
                        {index !== 0 && (
                          <div className="col-12">
                            <button
                              onClick={() => {
                                deleteRecipient(index);
                              }}
                              className="btn btn-danger btn-sm rounded-5 fw-bold mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="col-md-12">
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
        )}

        {dataEntryMethod === "spreadsheet" && (
          <div className="row">
            <div className="col-md-12 my-1">
              {/* Spreadsheet data entry form */}
              <div className="card h-100">
                <div className="card-body px-5">
                  <div className="row mb-3 border p-3 rounded">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Upload Spreadsheet
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="spreadsheet"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={(e) => handleSpreadSheet(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
