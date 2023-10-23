import { Typography } from "@material-ui/core";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactrichTextEditor from "./reactrichTextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { isAutheticated } from "src/auth";
import { useNavigate, useNavigation } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];
export default function EditTermsConditions() {
  const [title, setTitle] = useState("Terms and conditions");
  const [content, setContent] = useState("");
  const [added, setAdded] = useState(false);
  const [olderContent, setOlderContent] = useState("");
  const navigation = useNavigate();

  const token = isAutheticated();
  const handleContentChange = (content, delta, source, editor) => {
    setContent(editor.getHTML());
  };
  const getTermsAndConditions = async () => {
    const response = await axios.get("/api/content/terms-and-conditions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      // console.log(response);
      setContent(response?.data?.termsAndCondition[0]?.termsAndContionContent);
      setOlderContent(
        response?.data?.termsAndCondition[0]?.termsAndContionContent
      );
    }
  };

  const addTermsandConditions = async () => {
    const response = await axios.post(
      "/api/content/terms-and-conditions",
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 201) {
      swal({
        title: "Congratulations!!",
        text: "Terms and condition  added successfully!",
        icon: "success",
        button: "OK",
      });
    }
  };
  const handleCancelClick = () => {
    setContent(olderContent);
  };
  const updateContent = async () => {
    const response = await axios.patch(
      "/api/content/terms-and-condition-update",
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      swal({
        title: "Congratulations!!",
        text: "Terms and condition  updated successfully!",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        title: "Sorry, please try again",
        text: "Something went wrong!",
        icon: "error",
        button: "Retry",
        dangerMode: true,
      });
    }
  };
  const handleSaveClick = async () => {
    if (olderContent === undefined) {
      await addTermsandConditions();
      setAdded(true);
    } else {
      await updateContent();
      setAdded(false);
    }

    // Reload terms and conditions
    await getTermsAndConditions();
  };
  useEffect(() => {
    // addTermsandConditions();
    getTermsAndConditions();
  }, [added]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          style={{
            fontWeight: "bold",
            marginBottom: "1rem",
            textTransform: "capitalize",
            marginRight: "5px",
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancelClick}
          style={{
            fontWeight: "bold",
            marginBottom: "1rem",
            textTransform: "capitalize",
            marginRight: "5px",
          }}
        >
          Cancel
        </Button>
      </div>

      <Box style={{ background: "#FFFFFF", color: "black", padding: "1rem" }}>
        {/* <TextField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        /> */}
        <Typography
          style={{ margin: "0.5rem 0rem", fontWeight: "bold" }}
          variant="h6"
        >
          {" "}
          Terms and policy:{" "}
        </Typography>
        <Typography style={{ margin: "0.5rem 0rem" }}>Body</Typography>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={{ toolbar: TOOLBAR_OPTIONS }}
        />
      </Box>
    </div>
  );
}
