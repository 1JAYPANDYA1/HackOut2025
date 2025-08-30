import React, { useState } from "react";

import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, updateDetail, updateDocument } from "../store/slices/companySlice";
import { companyDetailsFields, companyDocumentFields } from "../config/CompanyForm";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const steps = ["Company Details", "Company Documents"];

export default function CompanyForm() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { details, documents } = useSelector((state) => state.company);

  const handleChange = (field, value, isFile = false) => {
    if (activeStep === 0) {
      dispatch(updateDetail({ field, value }));
    } else {
      dispatch(updateDocument({ field, value }));
    }
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // 1️⃣ Append company details
      for (const key in details) {
        formData.append(key, details[key]);
      }

      // 2️⃣ Append company logo if present
      if (details.companyLogo) {
        formData.append("companyLogo", details.companyLogo);
      }

      // 3️⃣ Append all document files
      for (const field of companyDocumentFields) {
        const file = documents[field.name];
        if (file) {
          formData.append(field.name, file);
        }
      }

      // 4️⃣ Send all data in one request
      const res = await axios.post("http://localhost:3000/create-company", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Company created successfully!", res.data);
      alert("Company created successfully!");
    } catch (err) {
      console.error("Error submitting company:", err);
      alert("Failed to create company.");
    }
  };



  return (
    <Paper elevation={3} sx={{ width: { xs: "90%", sm: "600px" }, margin: "20px auto", p: 3, borderRadius: 3 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 3 }}>
        {/* Step 0: Company Details */}
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            {companyDetailsFields.map((field) => (
              <Box key={field.name}>
                {field.type === "file" && field.name === "companyLogo" ? (
                  <Box
                    sx={{
                      border: "2px dashed #aaa",
                      borderRadius: "1rem",
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "15vh",
                      maxHeight: 150,
                    }}
                  >
                    {details.companyLogo ? (
                      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Avatar
                          src={URL.createObjectURL(details.companyLogo)}
                          alt="Logo Preview"
                          sx={{ width: 80, height: 80, mb: 1 }}
                        />
                        <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{details.companyLogo.name}</Typography>
                        <IconButton
                          color="error"
                          onClick={() => handleChange("companyLogo", null, true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <UploadFileIcon sx={{ fontSize: 40, color: "#555" }} />
                        <Typography variant="body2" sx={{ mt: 1, fontSize: "0.85rem" }}>
                          Upload Company Logo
                        </Typography>
                      </>
                    )}
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        opacity: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onChange={(e) =>
                        handleChange("companyLogo", e.target.files?.[0] || null, true)
                      }
                    />
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type}
                    value={details[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Step 1: Company Documents */}
        {activeStep === 1 && (
          <Box display="flex" flexDirection="column" gap={2}>
            {companyDocumentFields.map((field) => (
              <Box
                key={field.name}
                sx={{
                  border: "2px dashed #aaa",
                  borderRadius: "1rem",
                  p: 2,
                  textAlign: "center",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "15vh",
                  maxHeight: 150,
                  cursor: "pointer",
                }}
              >
                {documents[field.name] ? (
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <UploadFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      {documents[field.name].name}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleChange(field.name, null, true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <UploadFileIcon sx={{ fontSize: 40, color: "#555" }} />
                    <Typography variant="body2" sx={{ mt: 1, fontSize: "0.85rem", color: "text.secondary" }}>
                      {field.label} - Click or Drag & Drop
                    </Typography>
                  </>
                )}
                <input
                  type="file"
                  name={companyDocumentFields.label}
                  accept="image/*,.pdf"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onChange={(e) =>
                    handleChange(field.name, e.target.files?.[0] || null, true)
                  }
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
}
