import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const VideoTemplate = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    // You can also perform additional actions here, such as clearing the file input field.
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <div style={{ fontSize: "22px" }} className="fw-bold">
              Upload Video
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
                onClick={() => {
                  handeView(1);
                }}
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
                  handeView(3);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div
            className="card"
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="card-body px-5">
              <div className="mb-3">
                <label>Upload Video</label>
                <div>
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {selectedFile && (
                <div className="video-preview-container">
                  <div className="text-container">
                    {/* Add spacing text on the left */}
                    <p>This is some text with spacing</p>
                  </div>
                  <div className="video-container">
                    <span
                      className="d-flex justify-content-end"
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={handleDelete}
                    >
                      &times;
                    </span>
                    <video
                      controls
                      width="80%"
                      style={{ height: "auto", maxWidth: "100%" }}
                    >
                      <source src={selectedFile} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTemplate;
