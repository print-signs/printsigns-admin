import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const Video = ({ props }) => {
  const { data, setData, handleView } = props;

  const handleVideoUpload = (e, index) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      videos: prev.videos.map((video, i) =>
        i === index ? { ...video, title: URL.createObjectURL(file) } : video
      ),
    }));
  };

  const addRecord = () => {
    setData((prev) => ({
      ...prev,
      videos: [...prev.videos, null],
    }));
  };

  const deleteRecord = (index) => {
    if (index >= 2) {
      // Only allow deletion for videos starting from the third one
      setData((prev) => ({
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index),
      }));
    }
  };

  console.log(data);
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
              Videos
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
                onClick={() => props.handleView(4)}
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
                  if (data?.videos === null) {
                    toast.error("Fill all details");
                  } else {
                    handleView(6);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-sm-12 col-md-12 col-lg-12 my-1">
          <div className="card h-100">
            <div className="card-body px-5">
              {data?.videos.map((video, index) => (
                <div className="mb-3" key={index}>
                  <label
                    htmlFor={`videoTitle${index + 1}`}
                    className="form-label"
                  >
                    Upload Video
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id={`videoTitle${index + 1}`}
                    onChange={(e) => handleVideoUpload(e, index)}
                  />
                  {index >= 2 && ( // Render delete button for videos starting from the third one
                    <div className="col-12">
                      <button
                        onClick={() => {
                          deleteRecord(index);
                        }}
                        className="btn btn-danger btn-sm rounded-5 fw-bold mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="col-md-12">
                <button onClick={addRecord} className="btn btn-secondary">
                  Add another record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <button onClick={addRecord} className="btn btn-primary">
          Merge Videos
        </button>
      </div>
    </div>
  );
};

export default Video;
