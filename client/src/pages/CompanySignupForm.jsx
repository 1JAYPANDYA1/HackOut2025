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
import { updateDetail, updateDocument } from "../store/slices/companySlice";
import { companyDetailsFields, companyDocumentFields } from "../config/CompanyForm";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleSubmit = () => {
    const payload = { ...details, documents };
    console.log("Final Submit Payload:", payload);
    // TODO: send payload to backend
  };

  return (
    <Paper elevation={3} sx={{ width: "600px", margin: "40px auto", p: 4, borderRadius: 3 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            {companyDetailsFields.map((field) => (
              <Box key={field.name}>
                {field.type === "file" && field.name === "logo" ? (
                  <Box
                    sx={{
                      border: "2px dashed #aaa",
                      borderRadius: "12px",
                      p: 3,
                      textAlign: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {details.logo ? (
                      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Avatar
                          src={URL.createObjectURL(details.logo)}
                          alt="Logo Preview"
                          sx={{ width: 100, height: 100, mb: 1 }}
                        />
                        <Typography variant="body2">{details.logo.name}</Typography>
                        <IconButton
                          color="error"
                          onClick={() => handleChange("logo", null, true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <UploadFileIcon sx={{ fontSize: 50, color: "#555" }} />
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          Upload Company Logo
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
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
                            handleChange("logo", e.target.files?.[0] || null, true)
                          }
                        />
                      </>
                    )}
                  </Box>
                ) : field.type !== "file" ? (
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type}
                    value={details[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                ) : null}
              </Box>
            ))}
          </Box>
        )}

       {activeStep === 1 && (
  <Box display="flex" flexDirection="column" gap={3}>
    {companyDocumentFields.map((field) => (
      <Box
        key={field.name}
        sx={{
          border: "2px dashed #aaa",
          borderRadius: "12px",
          p: 2,
          textAlign: "center",
          position: "relative",
        }}
      >
        {documents[field.name] ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <UploadFileIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="body2">{documents[field.name].name}</Typography>
            <IconButton
              color="error"
              onClick={() => handleChange(field.name, null, true)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {field.label}
            </Typography>
            <UploadFileIcon sx={{ fontSize: 50, color: "#555" }} />
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Click or Drag & Drop to upload
            </Typography>
            <input
              type="file"
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
          </>
        )}
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
