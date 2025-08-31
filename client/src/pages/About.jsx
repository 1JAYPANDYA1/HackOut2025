import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const steps = [
  {
    title: "Company Application",
    description:
      "Companies submit applications for green hydrogen plant approval.",
  },
  {
    title: "Validation Process",
    description:
      "System validates site suitability based on proximity to renewable energy sources (solar and wind farms) and demand centres (industries and residences).",
  },
  {
    title: "Approval & Mapping",
    description:
      "Validated companies are approved and marked on an interactive map for enhanced visibility and strategic planning.",
  },
  {
    title: "Blockchain Verification",
    description:
      "For existing producers, IoT and Oracle integrate production data onto a blockchain for trusted validation.",
  },
  {
    title: "Subsidy Disbursement",
    description:
      "Smart contracts automatically transfer subsidies to the company's digital wallet upon meeting conditions, ensuring transparency and auditability.",
  },
];

export default function About() {
  return (  
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
        Green Hydrogen Approval & Subsidy System: Workflow
      </Typography>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                position: "relative",
                backgroundColor: "#1e1e2f",
                color: "#fff",
                "&:hover": { transform: "scale(1.03)", transition: "0.3s" },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#1976d2",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: -25,
                  left: 20,
                  boxShadow: 3,
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: "#fff" }} />
              </Box>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                {index + 1}. {step.title}
              </Typography>
              <Typography variant="body1">{step.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body1"
        align="center"
        sx={{ mt: 6, color: "#ccc", maxWidth: 800, mx: "auto" }}
      >
        This streamlined process facilitates transparent, efficient, and
        fraud-resistant subsidy disbursement, crucial for scaling green
        hydrogen initiatives across India.
      </Typography>
    </Container>
  );
}
